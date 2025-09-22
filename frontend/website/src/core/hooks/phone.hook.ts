import { useQuery } from "@tanstack/react-query";
import {phoneApiService} from "../api/services/phone.api.service.ts";
import type {FindCitiesRawDTO} from "../api/types/location.types.ts";


// Phone Types
export function usePhoneTypes() {
    return useQuery({
        queryKey: ["phoneTypes"],
        queryFn: () => phoneApiService.getPhoneTypes(),
    });
}

// Phone Codes
export function usePhoneCodes(stateId: number | null) {
    return useQuery({
        queryKey: ["phoneCode"],
        queryFn: () =>
            phoneApiService.getPhoneCodes({ dddCode: stateId?.toString() } as Partial<FindCitiesRawDTO>),
        enabled: !!stateId,
    });
}

export function usePhoneDDD(ddiCode: number | null) {
    return useQuery({
        queryKey: ["ddiCode", ddiCode],
        queryFn: () =>
            phoneApiService.getPhoneCodes({ dddCode: ddiCode?.toString() } as Partial<FindCitiesRawDTO>),
        enabled: !!ddiCode,
    });
}