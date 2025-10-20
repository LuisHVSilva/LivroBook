import {useQueryClient} from "@tanstack/react-query";

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