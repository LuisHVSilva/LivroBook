import { container } from "tsyringe";
import { Sequelize } from "sequelize";

export function Transactional(): MethodDecorator {
    return function (
        target: any,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            const sequelize = container.resolve<Sequelize>("SequelizeInstance");
            const transaction = await sequelize.transaction();

            try {
                const result = await originalMethod.apply(this, [...args, transaction]);
                await transaction.commit();
                return result;
            } catch (error) {
                await transaction.rollback();
                throw error;
            }
        };
    };
}
