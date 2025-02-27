import { Request, Response } from 'express';
import express from 'express';
import * as dotenv from 'dotenv';
import * as path from 'path';
import helmet from 'helmet';

import cors from 'cors';
import morgan from 'morgan';

dotenv.config({ path: path.resolve(__dirname, './config/.env') });

const app = express();

// Middlewares globais
app.use(cors()); // Permite requisições de outros domínios (útil para React)
app.use(morgan('dev')); // Logs das requisições HTTP
app.use(helmet()); // Segurança no cabeçalho HTTP
app.use(express.json()); // Lê requisições JSON
app.use(express.urlencoded({ extended: true })); // Lê requisições URL-encoded


app.get('/api/runtest', (req: Request, res: Response) => {
  res.json([{ message: 'API funcionando! 🚀' }]);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
