import { useQuery } from "@tanstack/react-query";
import {documentApiService} from "../api/services/document.api.service.ts";


// Document Types
export function useDocumentTypes() {
    return useQuery({
        queryKey: ["documentTypes"],
        queryFn: () => documentApiService.getDocumentType(),
    });
}
