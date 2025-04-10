import {
  DataType,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Column,
  Table,
  Default,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
  Sequelize,
} from "sequelize-typescript";
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { Database } from "@coreConfig/database";
import { IUserTypeModel } from "@userType/infrastructure/model/IUserTypeModel";
import { StatusModel } from "@status/infrastructure/models/StatusModel";

const sequelize: Sequelize = Database.getInstance();

@Table({ tableName: "USER_TYPE", timestamps: true })
class UserTypeModel extends Model<InferAttributes<UserTypeModel>,InferCreationAttributes<UserTypeModel>>implements IUserTypeModel
{
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare id: CreationOptional<number>;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare description: string;

  @AllowNull(true)
  @ForeignKey(() => StatusModel)
  @Default(1)
  @Column(DataType.INTEGER)
  declare statusId?: number;

  @BelongsTo(() => StatusModel, {
    foreignKey: "statusId",
    as: "status",
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  status?: StatusModel;

  @CreatedAt
  @Column(DataType.DATE)
  declare createdAt?: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  declare updatedAt?: Date;
}

sequelize.addModels([UserTypeModel]);

export { UserTypeModel };
