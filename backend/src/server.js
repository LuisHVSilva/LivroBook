const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');
const db = require('./config/db'); // Importa a conexão com o banco de dados
const routes = require('./routes'); // Importa o index das rotas

dotenv.config({ path: './config/.env' }); // Carrega variáveis de ambiente do arquivo .env

const app = express();

// Middlewares globais
app.use(cors()); // Permite requisições de outros domínios (útil para React)
app.use(morgan('dev')); // Logs das requisições HTTP
app.use(helmet()); // Segurança no cabeçalho HTTP
app.use(express.json()); // Lê requisições JSON
app.use(express.urlencoded({ extended: true })); // Lê requisições URL-encoded

// Teste de conexão com o banco de dados
db.authenticate()
  .then(() => console.log('Banco de dados conectado com sucesso!'))
  .catch((error) => console.error('Erro ao conectar ao banco de dados:', error));

// Rotas principais
app.use('/api', routes); // Todas as rotas iniciam com /api

// Rota básica para teste
app.get('/', (req, res) => {
  res.send('API funcionando! 🚀');
});

// Tratamento de erros (middleware)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Ocorreu um erro no servidor' });
});

// Porta do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
