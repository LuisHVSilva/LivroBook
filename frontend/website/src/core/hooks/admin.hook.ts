import {useQuery} from "@tanstack/react-query";

import type {
    GetAllEntitiesNamesDTO,
    GetAllEntityDataResponseDTO,
    GetAllModelAttributesResponseDTO, GetEntityByIdResponseDTO
} from "../api/types/admin.type.ts";
import {adminApiService} from "../api/services/admin.api.service.ts";

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