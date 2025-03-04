import "reflect-metadata";
import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import {routes} from "./routes";
// import { errorHandler } from "../shared/middlewares/errorHandler";

class Server {
    private app: Application;
    private readonly PORT: number = Number(process.env.PORT) || 3000;

    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
        // this.errorHandling();
    }

    private middlewares(): void {
        this.app.use(cors()); // Habilita CORS
        this.app.use(helmet()); // Segurança HTTP
        this.app.use(morgan("dev")); // Logger HTTP
        this.app.use(express.json()); // Suporte a JSON
        this.app.use(express.urlencoded({ extended: true }));
    }

    private routes(): void {
        this.app.use("/api", routes); // Prefixo das rotas
    }

    // private errorHandling(): void {
    //     this.app.use(errorHandler); // Middleware para tratamento global de erros
    // }

    public start(): void {
        this.app.listen(this.PORT, () => {
            console.log(`🔥 Server running on http://localhost:${this.PORT}`);
        });
    }
}

export default new Server();
