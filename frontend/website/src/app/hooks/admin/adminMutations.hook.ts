import {useMutation, useQueryClient} from "@tanstack/react-query";
import React from "react";
import {
    useGetAllEntityAttributes,
    useGetEntityById,
    useLoadReferenceData,
    useEntityInfos
} from "./adminQueries.hook.ts";
import {useReloadEntityData} from "./adminUtils.hook.ts";
import type {EntityDtoInfos, EntityProperty} from "../../../core/models/types/admin.type.ts";
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
    const {data: referenceData} = useLoadReferenceData(entityName);
    const {data: entityProps} = useGetAllEntityAttributes(entityName);
    const {reloadEntityData} = useReloadEntityData();

    const dbProps: EntityProperty[] | null = entityProps ? Object.values(entityProps) : null;

    const handleAlter = async (formData: FormData): Promise<void> => {
        if (!entityData) {
            return;
        }

        try {
            const formValues = Object.fromEntries(formData.entries()) as Record<string, string>;
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

    return {entityData, referenceData, dbProps, handleAlter};
}

export function useAdminEntityAdd(
    entityName: string,
    setSuccess?: React.Dispatch<React.SetStateAction<boolean | null>>,
    setError?: React.Dispatch<React.SetStateAction<string | null>>,
) {
    const {data: formBaseData} = useEntityInfos(entityName, true);
    const {data: referenceData} = useLoadReferenceData(entityName, true);
    const {reloadEntityData} = useReloadEntityData();

    const handleInclude = async (formData: FormData): Promise<void> => {
        if(!formBaseData) {
            return;
        }

        try {
            const formValues = Object.fromEntries(formData.entries()) as Record<string, string>;
            let hasError: boolean = false;
            const fieldsError: string[] = [];

            const combined: { [x: string]: string }[] = formBaseData.map((item: EntityDtoInfos): { [x: string]: string } => {
                const [key, fieldMeta] = Object.entries(item)[0];
                const value: string = formValues[key];
                const isValueEmpty: boolean = value === undefined || value === null || value === "";
                const label: string = fieldMeta.label ? fieldMeta.label : key

                if (fieldMeta.mandatory && isValueEmpty){
                    hasError = true;
                    fieldsError.push(label.toUpperCase())
                }

                return {
                    [key]: value
                };
            });

            if(hasError) {
                setError?.(t(errorMessage.nullFieldError.required, {field: fieldsError.slice(0).join(", ")}));
                return;
            }
            await adminApiService.addEntity(entityName,  Object.assign({}, ...combined));
            await reloadEntityData(entityName);
            setSuccess?.(true);
        } catch (e) {
            formUtil.getError(e, errorMessage.appError.api.patch.generic, setError);
        }
    };

    return {formBaseData, referenceData, handleInclude};
}