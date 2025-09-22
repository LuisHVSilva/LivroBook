import { useQuery } from "@tanstack/react-query";
import {locationApiService} from "../api/services/location.api.service.ts";
import type {FindCitiesRawDTO, FindStatesRawDTO} from "../api/types/location.types.ts";


// Países
export function useCountries() {
    return useQuery({
        queryKey: ["countries"],
        queryFn: () => locationApiService.getCountries(),
    });
}

// Estados (depende de countryId)
export function useStates(countryId: number | null) {
    return useQuery({
        queryKey: ["states", countryId],
        queryFn: () =>
            locationApiService.getStates({ countryId: countryId?.toString() } as Partial<FindStatesRawDTO>),
        enabled: !!countryId, // só busca se tiver countryId
    });
}

// Cidades (depende de stateId)
export function useCities(stateId: number | null) {
    return useQuery({
        queryKey: ["cities", stateId],
        queryFn: () =>
            locationApiService.getCities({ stateId: stateId?.toString() } as Partial<FindCitiesRawDTO>),
        enabled: !!stateId,
    });
}
