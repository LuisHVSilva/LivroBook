import { Request, Response } from "express";

export class HttpMock{
    public static requestMock<T>(body: T): Request {
        return {
            body,
            headers: {},
            params: {},
            query: {},
        } as Request;
    }

    public static requestGetMock<T>(query: Record<string, any> = {}): Request {
        return {
            query,
            params: {},
            headers: {},
            method: "GET",
            originalUrl: "",
            url: "",
        } as Request;
    }

    public static responseMock(): Response {
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        };
        return res as Response;
    }
}