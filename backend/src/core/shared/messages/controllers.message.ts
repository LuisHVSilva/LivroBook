export const ControllersMessage = {
    success: {
        delete: {
            ok: "Todos os registros foram deletados.",
            multiStatus: "Operação parcial."
        },
    },
    clientError: {
        update: {
            badRequest: "Nenhum registro atualizado.",
        },
        delete: {
            notFound: "Nenhum registro encontrado para ser deletado."
        },
        generic: {
            badRequest: "Nenhuma operação realizada",
            notFound: "Nenhum registro encontrado",
        },
    },
    info: {
        generic: {
            okNotChanged: "Nenhum registro alterado.",
        },
    }
} as const;
