import { StatusEntity } from "../../src/app/interface/Entities/IStatusEntity";

class StatusMock {
    private statusMockDataList: Array<StatusEntity> = [
        {
            id: BigInt(1),
            description: "Active",
            createdAt: new Date("2023-01-01"),
            updatedAt: new Date("2023-01-02"),
        },
        {
            id: BigInt(2),
            description: "Inactive",
            createdAt: new Date("2023-01-03"),
            updatedAt: new Date("2023-01-04"),
        },
    ];

    public getStatusMockDataList() {
        return this.statusMockDataList;
    }

    /**
     * Método auxiliar que verifica se todos os campos da consulta correspondem ao item.
     */
    private matchesQuery(item: StatusEntity, query: Partial<StatusEntity>): boolean {
        return Object.keys(query).every((key) => item[key as keyof StatusEntity] === query[key as keyof StatusEntity]);
    }

    /**
     * Mock do método `findAll` que retorna todos os registros de status.
     */
    public mockFindAll() {
        return jest.fn().mockResolvedValue(this.statusMockDataList);
    }

    /**
     * Mock do método `findOne` que busca um registro que corresponde à consulta.
     */
    public mockFindOne() {
        return jest.fn().mockImplementation((query: { where: Partial<StatusEntity> }) => {
            if (!query.where) return Promise.resolve(null);

            const result = this.statusMockDataList.find((item) =>
                this.matchesQuery(item, query.where)
            );

            return Promise.resolve(result);
        });
    }

    /**
     * Mock do método `create` que cria um novo registro com ID gerado.
     */
    public mockCreate() {
        return jest.fn().mockImplementation((data: Partial<StatusEntity>) => {
            const newId = BigInt(this.statusMockDataList.length + 1);
            return Promise.resolve({ ...data, id: newId });
        });
    }

    public mockDelete() {
        return jest.fn().mockImplementation((query: any) => {
            const index = this.statusMockDataList.findIndex((item) =>
                this.matchesQuery(item, query.where)
            );

            if (index !== -1) {
                this.statusMockDataList.splice(index, 1); 
                return Promise.resolve({ rowsAffected: 1 }); 
            }

            return Promise.resolve({ rowsAffected: 0 });
        });
    }
}

export { StatusMock };
