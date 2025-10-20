import {useMutation, useQueryClient} from "@tanstack/react-query";
import React from "react";
import {useGetAllEntityAttributes, useGetEntityById, useLoadReferenceData} from "./adminQueries.hook.ts";
import {useReloadEntityData} from "./adminUtils.hook.ts";
import type {EntityProperty} from "../../../core/models/types/admin.type.ts";
import {t} from "../../../core/models/messages/translations.ts";
import {errorMessage} from "../../../core/models/messages/error.message.ts";
import {formUtil} from "../../../core/utils/form/form.util.ts";
import {adminApiService} from "../../../core/entities/admin/admin.api.service.ts";

export function useDeleteEntity(
    setSuccess?: React.Dispatch<React.SetStateAction<boolean | null>>,
    setError?: React.Dispatch<React.SetStateAction<string | null>>
) {
    const queryClient = useQueryClient();

    return useMutation<boolean, Error, { entityName: string; id: string | number }>({
        mutationFn: ({entityName, id}) => adminApiService.deleteEntity(entityName, id),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({queryKey: ["entity", variables.entityName]});
            setSuccess?.(true);
            setError?.(null);
        },

        onError: (err) => {
            setError?.(err.message || "Erro ao excluir registro");
            setSuccess?.(false);
        },
    });
}


export function useAdminEntityEdit(
    entityName: string,
    entityId: number,
    setSuccess?: React.Dispatch<React.SetStateAction<boolean | null>>,
    setError?: React.Dispatch<React.SetStateAction<string | null>>,
) {
    const {data: entityData} = useGetEntityById(entityName, entityId);
    const {data: preAlterEntityData} = useLoadReferenceData(entityName);
    const {data: entityProps} = useGetAllEntityAttributes(entityName);
    const {reloadEntityData} = useReloadEntityData();

    const dbProps: EntityProperty[] | null = entityProps ? Object.values(entityProps) : null;

    const handleAlter = async (formData: FormData): Promise<void> => {
        try {
            const formValues = Object.fromEntries(formData.entries()) as Record<string, string>;
            if (!entityData) {
                return;
            }
            const originalValues = Object.fromEntries(
                Object.entries(entityData).map(([key, value]) => [key, value.value])
            ) as Record<string, string | number | boolean | null>;

            const id: string = formValues.id;

            const changedFields: Record<string, string> = Object.entries(formValues)
                .filter(([key, value]) => {
                    if (key === "id") return false;

                    const originalValue = String(originalValues[key] ?? "");
                    const isChanged = value !== originalValue;

                    const isEmpty = value === "" || value === null || value === undefined;

                    return isChanged && !isEmpty;
                })
                .reduce((acc, [key, value]) => {
                    acc[key] = value;
                    return acc;
                }, {} as Record<string, string>);

            if (Object.keys(changedFields).length === 0) {
                setError?.("Nenhuma alteração detectada.");
                return;
            }

            const payload = {id, ...changedFields};

            const isEntityChanged = await adminApiService.alterEntity(entityName, payload);

            if (!isEntityChanged) {
                setError?.(t(errorMessage.appError.api.patch.nothingUpdated));
                return;
            }

            await reloadEntityData(entityName);
            setSuccess?.(true);
        } catch (e) {
            formUtil.getError(e, errorMessage.appError.api.patch.generic, setError);
        }
    };

    return {entityData, preAlterEntityData, dbProps, handleAlter};
}