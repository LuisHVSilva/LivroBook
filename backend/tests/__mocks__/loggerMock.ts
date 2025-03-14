import { ILogger } from "@coreShared/logs/ILogger";

export class LoggerMock {
    private readonly loggerMock: jest.Mocked<ILogger>;

    constructor() {
        this.loggerMock = {
            logError: jest.fn().mockImplementation(() => {}),
            logWarn: jest.fn().mockImplementation(() => {}),
            logInfo: jest.fn().mockImplementation(() => {}),
        };
    }

    get mock(): jest.Mocked<ILogger> {
        return this.loggerMock;
    }

    get logError() {
        return this.loggerMock.logError;
    }

    get logWarn() {
        return this.loggerMock.logWarn;
    }

    get logInfo() {
        return this.loggerMock.logInfo;
    }
}
