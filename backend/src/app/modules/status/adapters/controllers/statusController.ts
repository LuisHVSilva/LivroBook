import {Request, Response} from "express";
import {inject, injectable} from "tsyringe";
import {CreateStatusOutput, CreateStatusUseCase} from "../../application/usecases/createStatusUseCase";

@injectable()
export class StatusController {
    constructor(@inject("CreateStatusUseCase") private createStatusUseCase: CreateStatusUseCase) {
    }

    async createStatus(req: Request, res: Response): Promise<Response> {
        try {
            const {description} = req.body;
            const result: CreateStatusOutput = await this.createStatusUseCase.execute({description});
            return res.status(201).json(result);
        } catch (error) {
            return res.status(400).json({message: "não foi possível criar"});
        }
    }
}
