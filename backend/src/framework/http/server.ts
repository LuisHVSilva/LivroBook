import "reflect-metadata";
import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import {router} from "@frameworkHttp/router";
import {ErrorHandler} from "@coreShared/middlewares/errorHandler";

class Server {
    private readonly app: Application;
    private readonly PORT: number = Number(process.env.PORT) || 3000;

    constructor() {
        this.app = express();
        this.middlewares();
        this.router();
        this.errorHandling();
    }

    public get appInstance(): Application {
        return this.app;
    }

    private middlewares(): void {
        this.app.use(cors()); // Habilita CORS
        this.app.use(helmet()); // Segurança HTTP
        this.app.use(morgan("dev")); // Logger HTTP
        this.app.use(express.json()); // Suporte a JSON
        this.app.use(express.urlencoded({ extended: true }));
    }

    private router(): void {
        this.app.use("/api", router);
    }

    private errorHandling(): void {
        this.app.use(ErrorHandler.handleError);
    }

    public start(): void {
        this.app.listen(this.PORT, () => {
            console.log(`🔥 Server running on http://localhost:${this.PORT}`);
        });
    }
}

export default new Server();
