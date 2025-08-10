export type PhoneTypeDTO = {
    id?: number;
    description?: string;
    statusId?: number;
};

export type FindFilterPhoneTypeDTO = {
    id?: number[];
    description?: string[];
    statusId?: number[];
}