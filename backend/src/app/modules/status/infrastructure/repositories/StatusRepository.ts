import "reflect-metadata";
import {inject} from 'tsyringe';
import {Sequelize} from "sequelize-typescript";
import {Transaction} from 'sequelize';
import {IStatusRepository} from "../../application/ports/IStatusRepository";
import {Status} from "../../domain/status"
import {StatusModel} from "../models/StatusModel";
import {StateEnum} from "@coreShared/enums/StateEnum";
import {StringUtils} from "@coreShared/utils/StringUtils";
import {Messages} from "@coreShared/constants/messages";
import {Result} from "@coreShared/types/Result";
import {RepositoryError} from "@coreShared/errors/RepositoryError";


export class StatusRepository implements IStatusRepository {
    private readonly className: string = "StatusRepository";

    constructor(
        @inject(Sequelize) private sequelize: Sequelize
    ) {
    }

    private handleRepositoryError(error: Error): never {
        const message: string = error.message ? error.message : Messages.Generic.INTERNAL_ERROR;
        throw new RepositoryError(this.className, message);
    };

    private convertBooleanToStateEnum(active: boolean): StateEnum {
        return active ? StateEnum.ACTIVE : StateEnum.INACTIVE;
    };

    private convertStateEnumToBoolean(state: StateEnum): boolean {
        return state === StateEnum.ACTIVE;
    };

    public async startTransaction(): Promise<Transaction> {
        return this.sequelize.transaction();
    };

    public async save(statusToSave: Status): Promise<Result<Status>> {
        try {
            const persistedStatus: StatusModel = await StatusModel.create({
                description: statusToSave.getDescription(),
                active: this.convertStateEnumToBoolean(statusToSave.getActive()),
            });

            const restoredStatus: Status = Status.restore({
                id: persistedStatus.id,
                description: persistedStatus.description,
                active: this.convertBooleanToStateEnum(persistedStatus.active),
            });

            return Result.success(restoredStatus);
        } catch (error) {
            this.handleRepositoryError(error as Error);
        }
    };

    public async findById(id: number): Promise<Result<Status>> {
        try {
            const foundStatus: StatusModel | null = await StatusModel.findByPk(id);
            if (!foundStatus) {
                return Result.failure<Status>(Messages.Status.Error.ID_NOT_FOUND(id.toString()));
            }

            const status: Status = Status.restore({
                id: foundStatus.id,
                description: foundStatus.description,
                active: this.convertBooleanToStateEnum(foundStatus.active),
            });

            return Result.success(status);
        } catch (error) {
            this.handleRepositoryError(error as Error);
        }
    };

    public async findByDescription(description: string): Promise<Result<Status>> {
        try {
            const descriptionFormatted: string = StringUtils.transformCapitalLetterWithoutAccent(description);
            const foundStatus: StatusModel | null = await StatusModel.findOne(
                {where: {description: descriptionFormatted}}
            );

            if (!foundStatus) {
                return Result.failure<Status>(Messages.Status.Error.DESCRIPTION_NOT_FOUND(description));
            }

            const status: Status = Status.restore({
                id: foundStatus.id,
                description: foundStatus.description,
                active: this.convertBooleanToStateEnum(foundStatus.active),
            });

            return Result.success(status);
        } catch (error) {
            this.handleRepositoryError(error as Error);
        }
    };

    public async updateDescription(updatedStatus: Status): Promise<void> {
        try {
            const id: number = updatedStatus.getId()!;
            await StatusModel.update({description: updatedStatus.getDescription()}, {where: {id}});
        } catch(error) {
            this.handleRepositoryError(error as Error);
        }
    };
}
