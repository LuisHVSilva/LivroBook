import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Minha API",
            version: "1.0.0",
            description: "Documentação da minha API usando Swagger com TypeScript",
        },
        servers: [
            {
                url: "http://localhost:3000/api",
                description: "Servidor de Desenvolvimento",
            },
        ],
        components: {
            schemas: {
                Status: {
                    type: "object",
                    description: "Represents a status in the system",
                    properties: {
                        id: {
                            type: "string",
                            example: "1",
                            description: "Unique status identifier provided by the database.",
                        },
                        description: {
                            type: "string",
                            example: "Request approved",
                            description: "Status description.",
                        },
                        active: {
                            type: "boolean",
                            example: false,
                            description: "Defines whether the status is active or not.",
                        },
                    },

                },
                StatusRequests: {
                    type: "object",
                    description: "Represents the request body for the status endpoints",
                    properties: {
                        Create: {
                            type: "object",
                            description: "Object to create a new status",
                            properties: {
                                description: {
                                    type: "string",
                                    example: "Request approved",
                                    description: "Status description.",
                                },
                            },
                            required: ["description"],
                        },
                        UpdateDescription: {
                            type: "object",
                            description: "Object to update status description",
                            properties: {
                                newDescription: {
                                    type: "string",
                                    example: "Order in processing",
                                    description: "New status description.",
                                },
                            },
                            required: ["newDescription"],
                        },
                        UpdateActive: {
                            type: "object",
                            description: "Objeto para atualizar o status de ativo/inativo",
                            properties: {
                                active: {
                                    type: "boolean",
                                    example: false,
                                    description: "Define se o status está ativo ou inativo.",
                                },
                            },
                            required: ["active"],
                        },
                    },
                },
            },
        }
    },
    apis: [
        "./src/http/routes/*.ts",
        "./src/app/modules/status/adapters/route/*.ts"
    ],
};

export const swaggerDocs = swaggerJSDoc(options);
