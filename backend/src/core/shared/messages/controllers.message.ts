export const ControllersMessage = {
    success: {
        delete: {
            ok: "Todos os registros foram deletados.",
            multiStatus: "Operação parcial."
        },
    },
    clientError: {
        delete: {
            badRequest: "Registros já deletados.",
            notFound: "Nenhum registro encontrado para ser deletado."
        },
        generic: {
            badRequest: "Nenhuma operação realizada",
            notFound: "Nenhum registro encontrado",
        },
    }
} as const;
