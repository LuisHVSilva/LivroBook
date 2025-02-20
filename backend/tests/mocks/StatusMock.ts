import { IStatusEntity } from "../../src/app/interface/Entities/IStatusEntity";

class StatusMock {
    private statusMockDataList: Array<IStatusEntity> = [
        {
            id: BigInt(1),
            description: "Active",
            active: true,
            createdAt: new Date("2023-01-01"),
            updatedAt: new Date("2023-01-02"),
        },
        {
            id: BigInt(2),
            description: "Inactive",
            active: true,
            createdAt: new Date("2023-01-03"),
            updatedAt: new Date("2023-01-04"),
        },
    ];

    private statusMockData: IStatusEntity = {
        id: BigInt(1),
        description: "Active",
        active: true,
        createdAt: new Date("2023-01-01"),
        updatedAt: new Date("2023-01-02"),
    }

    public getStatusMockDataList() {
        return this.statusMockDataList;
    }

    public getStatusMockData() {
        return this.statusMockData;
    }

    /**
     * Método auxiliar que verifica se todos os campos da consulta correspondem ao item.
     */
    private matchesQuery(item: IStatusEntity, query: Partial<IStatusEntity>): boolean {
        return Object.keys(query).every((key) => item[key as keyof IStatusEntity] === query[key as keyof IStatusEntity]);
    }

    /**
     * Mock do método `create` que cria um novo registro com ID gerado.
     */
    public mockCreate() {
        return jest.fn().mockImplementation((data: Partial<IStatusEntity>) => {
            const newId = BigInt(this.statusMockDataList.length + 1);
            return Promise.resolve({ ...data, id: newId });
        });
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
        return jest.fn().mockImplementation((query: { where: Partial<IStatusEntity> }) => {
            if (!query.where) return Promise.resolve(null);

            const result = this.statusMockDataList.find((item) =>
                this.matchesQuery(item, query.where)
            );

            return Promise.resolve(result);
        });
    }

    /**
     * Mock do método `findByPk` que busca um registro com base na primary key.
     */
    public mockFindByPk() {
        return jest.fn().mockImplementation((id: bigint) => {
            // Aqui você pode simular a busca pelo ID (ou qualquer outra chave primária)
            const result = this.statusMockDataList.find(status => status.id === id);

            // Se encontrar, resolve com o status, caso contrário, resolve com null
            return result ? Promise.resolve(result) : Promise.resolve(null);
        });
    }
}

export { StatusMock };
