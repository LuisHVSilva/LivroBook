export type PhoneEntity = {
    id?: number;
    number: string;
    phoneCode: {
        dddCode: number;
        ddiCode: number;
    },
    phoneType: string;
    status: string;
}