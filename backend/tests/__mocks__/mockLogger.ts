import { ILogger } from "@coreShared/logs/ILogger";

export class MockLogger {
    private readonly mockLogger: jest.Mocked<ILogger>;

    constructor() {
        this.mockLogger = {
            logError: jest.fn().mockImplementation(() => {}),
            logWarn: jest.fn().mockImplementation(() => {}),
            logInfo: jest.fn().mockImplementation(() => {}),
        };
    }

    get mock(): jest.Mocked<ILogger> {
        return this.mockLogger;
    }

    get logError() {
        return this.mockLogger.logError;
    }

    get logWarn() {
        return this.mockLogger.logWarn;
    }

    get logInfo() {
        return this.mockLogger.logInfo;
    }
}
