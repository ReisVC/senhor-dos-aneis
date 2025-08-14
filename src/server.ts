import express, { Application, NextFunction, Request, Response } from 'express';
import router from './routes/CharacterRoutes';
import cors from 'cors';


const app: Application = express();  // Tipando 'app' como 'Application'
const PORT: number = 3000;  // Tipagem da porta como número

// Middleware para permitir que o Express interprete JSON
app.use(express.json());

app.use(cors({}))
app.use(router)

app.use((req: Request, res: Response): Response => {

  // Retorna uma resposta com status HTTP 404 (Não Encontrado)
  // E envia um JSON com a mensagem personalizada
  return res.status(404).json({ "erro": "A passagem de Caradhras está fechada por Saruman. Esta rota não existe para nós. Só nos sobrou...Moria." });
});

// Rota GET para a raiz
app.get('/', (req: Request, res: Response): void => {
  res.send('🚀 Servidor TypeScript rodando!');
});

// Iniciando o servidor
app.listen(PORT, (): void => {
  console.log(`🔥 Servidor rodando em http://localhost:${PORT}`);
});