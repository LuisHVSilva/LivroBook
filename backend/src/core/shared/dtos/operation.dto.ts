export type DeleteRequestDTO = {
    id: string;
}

export type DeleteResponseDTO = {
    report: {
        deleted: number[];
        alreadyInactive: number[];
        notFound: number[];
    };
};

export type FindByIdRequestDTO = {
    id: string;
}