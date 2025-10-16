import {useQuery, useQueryClient} from "@tanstack/react-query";

import type {
    EntityProperty,
    GetAllEntitiesNamesDTO,
    GetAllEntityDataResponseDTO,
    GetAllModelAttributesResponseDTO, GetEntityByIdResponseDTO
} from "../api/types/admin.type.ts";
import {adminApiService} from "../api/services/admin/admin.api.service.ts";
import {useState} from "react";
import {formUtil} from "../utils/form.util.ts";
import {errorMessage} from "../constants/messages/error.message.ts";
import {t} from "../constants/messages/translations.ts";

export function useAllEntitiesNames() {
    return useQuery<GetAllEntitiesNamesDTO, Error>({
        queryKey: ["entitiesNames"],
        queryFn: (): Promise<GetAllEntitiesNamesDTO> => adminApiService.getAllEntitiesNames(),
        staleTime: 1000 * 60,
        retry: 1,
    });
}

export function useGetAllEntityAttributes(entityName: string) {
    return useQuery<GetAllModelAttributesResponseDTO, Error>({
        queryKey: ["entityProperties", entityName],
        queryFn: (): Promise<GetAllModelAttributesResponseDTO> => adminApiService.getAllEntityAttributes(entityName),
        staleTime: 1000 * 60,
        retry: 2,
    })
}

export function useFindAllEntityData(entityName: string, page: number = 1) {
    return useQuery<GetAllEntityDataResponseDTO, Error>({
        queryKey: ["entityDatas", entityName, page],
        queryFn: () => adminApiService.findAllEntityData(entityName, page),
        staleTime: 1000 * 60,
        retry: 2,
    });
}

export function useGetEntityById(entityName: string, id: number) {
    return useQuery<GetEntityByIdResponseDTO, Error>({
        queryKey: ["entityData", entityName, id],
        queryFn: (): Promise<GetEntityByIdResponseDTO> => adminApiService.getEntityById(entityName, id),
        staleTime: 1000 * 60,
        retry: 2,
    });
}

export function usePreAlterEntity(entityName: string) {
    return useQuery<Record<string, unknown>, Error>({
        queryKey: ["preAlterEntityData", entityName],
        queryFn: (): Promise<Record<string, unknown>> => adminApiService.preAlterEntity(entityName),
        staleTime: 1000 * 60,
        retry: 2,
    });
}

export function useReloadEntityData() {
    const queryClient = useQueryClient();

    const reloadEntityData = async (entityName: string) => {
        if (!entityName) return;

        await Promise.all([
            queryClient.refetchQueries({queryKey: ["entityDatas", entityName]}),
            queryClient.refetchQueries({queryKey: ["entityProperties", entityName]}),
            queryClient.refetchQueries({queryKey: ["entityData", entityName]}),
            queryClient.refetchQueries({queryKey: ["preAlterEntityData", entityName]}),
        ]);
    };

    return {reloadEntityData};
}

export function useAdminEntityEdit(entityName: string, entityId: number) {
    const {data: entityData} = useGetEntityById(entityName, entityId);
    const {data: preAlterEntityData} = usePreAlterEntity(entityName);
    const {data: entityProps} = useGetAllEntityAttributes(entityName);
    const {reloadEntityData} = useReloadEntityData();

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean | null>(null);

    const dbProps: EntityProperty[] | null = entityProps ? Object.values(entityProps) : null;

    const handleAlter = async (formData: FormData): Promise<void> => {
        try {
            const formValues = Object.fromEntries(formData.entries()) as Record<string, string>;
            const originalValues = entityData as Record<string, string | number | boolean | null>;

            const id: string = formValues.id;

            const changedFields: Record<string, string> = Object.entries(formValues)
                .filter(([key, value]) => {
                    if (key === "id") return false;
                    const originalValue = String(originalValues[key] ?? "");
                    return value !== originalValue;
                })
                .reduce((acc, [key, value]) => {
                    acc[key] = value;
                    return acc;
                }, {} as Record<string, string>);

            if (Object.keys(changedFields).length === 0) {
                setError("Nenhuma alteração detectada.");
                return;
            }

            const payload = { id, ...changedFields };

            const isEntityChanged = await adminApiService.alterEntity(entityName, payload);

            if (!isEntityChanged) {
                setError(t(errorMessage.appError.api.patch.nothingUpdated));
                return;
            }

            setSuccess(true);
            await reloadEntityData(entityName);
        } catch (e) {
            formUtil.getError(e, errorMessage.appError.api.patch.generic, setError);
        }
    };


    return {entityData, preAlterEntityData, dbProps, handleAlter, error, success};
}

// const updated: boolean = await adminApiService.alterEntity(entityName, changedFields);