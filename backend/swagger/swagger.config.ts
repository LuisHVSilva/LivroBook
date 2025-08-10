import swaggerJSDoc from 'swagger-jsdoc';
import {swaggerStatusSchemas} from "./schemas/status/statusSwagger.schema";

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API LIVRO BOOK',
        version: '1.0.0',
        description: 'Documentação da API com Swagger',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Servidor local',
        },
    ],
    components: {
        schemas: {
            ErrorResponse: {
                type: 'object',
                properties: {
                    success: {
                        type: 'boolean',
                        example: false,
                    },
                    message: {
                        type: 'string',
                        example: 'Ocorreu um erro interno no servidor. Por favor, tente novamente mais tarde.',
                    },
                },
                required: ['success', 'message'],
            },
            // ...swaggerStatusSchemas
            status: swaggerStatusSchemas
        }
    }
};

export const swaggerOptions = {
    definition: swaggerDefinition,
    apis: [
        "./src/app/modules/**/adapters/routes/*.ts"
    ],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
