import { ResultType } from "@coreShared/types/result.type";

/**
 * IValidator interface defines a contract for validation services.
 * It requires an implementation of the validate method that takes an entity of type T
 * and returns a ResultType indicating success or failure.
 *
 * @template T - The type of the entity to be validated.
 */
export interface IValidator<T> {
    /**
     * Validates the provided entity.
     * @param entity - The entity of type T to be validated.
     * @returns A Promise that resolves to a ResultType indicating the validation result.
     */
    validate(entity: T): Promise<ResultType<true>>;
}
