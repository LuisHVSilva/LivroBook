import {useQuery} from "@tanstack/react-query";
import type {
    FindAllType, FindByIdAdmin,
    GetAllEntitiesNamesDTO,
    GetAllModelAttributesResponseDTO
} from "../../../core/models/types/admin.type.ts";
import {adminApiService} from "../../../core/entities/admin/admin.api.service.ts";

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
    return useQuery<FindAllType<any>, Error>({
        queryKey: ["entityDatas", entityName, page],
        queryFn: () => adminApiService.findAllEntityData(entityName, page),
        staleTime: 1000 * 60,
        retry: 2,
    });
}

export function useGetEntityById(entityName: string, id: number) {
    return useQuery<FindByIdAdmin<any> | null, Error>({
        queryKey: ["entityData", entityName, id],
        queryFn: (): Promise<FindByIdAdmin<any> | null> => adminApiService.getEntityById(entityName, id),
        staleTime: 1000 * 60,
        retry: 2,
    });
}

export function useLoadReferenceData(entityName: string) {
    return useQuery<Record<string, unknown>, Error>({
        queryKey: ["preAlterEntityData", entityName],
        queryFn: (): Promise<Record<string, unknown>> => adminApiService.loadReferenceData(entityName),
        staleTime: 1000 * 60,
        retry: 2,
    });
}
