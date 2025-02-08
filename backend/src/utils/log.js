const fs = require('fs');
const path = require('path');

//constants
const logFilePath = path.join(__dirname, 'logs.txt');
const TEMPLATE_MESSAGE = 'Mensagem nao cadastrada';

class Log {

    logError(method, httpStatus, error) {
        const logMessage = `[${new Date().toISOString()}] ERROR - Method: ${method} - StatusHttp: ${httpStatus} - Message: - ${error.message || error}\n`;
        this.#saveLog(logMessage);
    }

    logWarn(method, httpStatus, message) {
        const logMessage = `[${new Date().toISOString()}] WARN - Method: ${method} - StatusHttp: ${httpStatus} - Message: ${message || TEMPLATE_MESSAGE}\n`;
        this.#saveLog(logMessage);
    }

    logSuccess(method, httpStatus, message ) {
        const logMessage = `[${new Date().toISOString()}] SUCCESS - Method: ${method} - StatusHttp: ${httpStatus} - Message:  - ${message || TEMPLATE_MESSAGE}\n`;
        this.#saveLog(logMessage);
    }

    #saveLog(logMessage) {
        try {
            fs.appendFileSync(logFilePath, logMessage); // Adiciona o erro ao arquivo
        } catch (err) {
            console.error('Erro ao registrar no arquivo de log:', err);
        }
    }
}


module.exports = Log;