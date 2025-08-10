export interface IQueryOperators {
    in?: <T>(values: T[]) => any;
    like?: (value: string) => any;
    eq?: <T>(value: T) => any;
}
