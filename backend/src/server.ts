import { Request, Response, NextFunction } from 'express';
import express from 'express';
import * as dotenv from 'dotenv';
import * as path from 'path';
import helmet from 'helmet';
import { sequelize } from './config/db';

const cors = require('cors');
const morgan = require('morgan');

dotenv.config({ path: path.resolve(__dirname, './config/.env') });

const app = express();

// Middlewares globais
app.use(cors()); // Permite requisições de outros domínios (útil para React)
app.use(morgan('dev')); // Logs das requisições HTTP
app.use(helmet()); // Segurança no cabeçalho HTTP
app.use(express.json()); // Lê requisições JSON
app.use(express.urlencoded({ extended: true })); // Lê requisições URL-encoded

// Teste de conexão com o banco de dados
sequelize.authenticate()
  .then(() => console.log('Banco de dados conectado com sucesso!'))
  .catch((error: Error) => console.error('Erro ao conectar ao banco de dados:', error));

// Rotas principais
// app.use('/api', routes); // Todas as rotas iniciam com /api

// Rota básica para teste
app.get('/api/runtest', (req: Request, res: Response) => {
  res.json([{ message: 'API funcionando! 🚀' }]);
});

// Tratamento de erros (middleware)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Ocorreu um erro no servidor' });
});

// Porta do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
