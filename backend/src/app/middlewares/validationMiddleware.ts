// Imports
import { validate as validadeCpf } from 'gerador-validador-cpf'
import { StatusCodes } from 'http-status-codes';

const UserService = require('../services/userService')
import { MESSAGES } from '../../utils/messages';
import { Log } from '../../utils/log';
const { MODELS_FIELDS_ENUM } = require('../utils/enum');

// Constants
const LOG = new Log();
const MIN_NAME_SIZE = 4;
const MIN_USERNAME_SIZE = 4;
const MIN_PASSWORD_SIZE = 6;
const SENHA = "SENHA";
const UNIQUE_FIELDS = ['email', 'phone', 'username'];
const REGEX_SPECIAL_CHARACTER = /[^a-zA-Z0-9]/;
const CAPITAL_LETTER_REGEX = /[A-Z]/;
const INVALID_HTTP_METHOD_VALIDATION = StatusCodes.BAD_REQUEST;

class Validations {
    static validateTextLength(text: string, min: number | null = null, max: number | null = null): boolean {
        try {
            min !== null && text.length < min;
            max !== null && text.length > max;
            return true;
        }
        catch (error) {
            const minPart = min ? `no minimo ${min}.` : '';
            const maxPart = max ? `no máximo ${max}.` : '';
            LOG.logError("validatePasswordStrength", INVALID_HTTP_METHOD_VALIDATION, error);
            throw new Error(`O texto deve ter no mínimo ${minPart}${max}`);
        }

    }

    static isRequired(value: string, fieldName: string): boolean {
        try {
            !value || value.trim() !== '';
            return true;
        } catch (error) {
            LOG.logError("isRequired", INVALID_HTTP_METHOD_VALIDATION, error);
            throw new Error(`O campo ${fieldName} é obrigatório.`);
        }
    }

    static isValidEmail(email: string): boolean {
        try {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            emailRegex.test(email);
            return true;
        } catch (error) {
            LOG.logError("isValidEmail", INVALID_HTTP_METHOD_VALIDATION, error);
            throw new Error(`Email inválido.`);
        }

    }

    static validatePasswordStrength(password: string): boolean {
        try {
            this.containsCapitalLetter(password);
            this.containsSpecialCharacter(password);
            return true;
        } catch (error) {
            LOG.logError("validatePasswordStrength", INVALID_HTTP_METHOD_VALIDATION, error);

            throw error;
        }
    }

    static validateFieldEquality(firstField: string, secondField: string, fieldName: string): boolean {
        try {
            firstField !== secondField;
            return true
        } catch (error) {
            LOG.logError("validateFieldEquality", INVALID_HTTP_METHOD_VALIDATION, error);

            throw new Error(`Os campos de ${fieldName} devem ser iguais.`);
        }
    }

    static isValidPhoneNumber(phone: string): boolean {
        try {
            const PHONE_REGEX = /^\(\d{2}\) \d{4,5}-\d{4}$/;
            PHONE_REGEX.test(phone);
            return true;
        } catch (error) {
            LOG.logError("isValidEmail", INVALID_HTTP_METHOD_VALIDATION, error);
            throw new Error(`Telefone inválido.`);
        }
    }

    static isValidUUID() { }

    static isValidCPF() { }

    static isValidCNPJ() { }

    static containsSpecialCharacter(text: string, fieldName: string | null = "Campo"): boolean {
        const regex = REGEX_SPECIAL_CHARACTER;
        if (!regex.test(text)) {
            throw new Error(`${fieldName} deve conter pelo menos um caractere especial.`);
        }

        return true;
    }

    static containsCapitalLetter(text: string, fieldName: string | null = "Campo"): boolean {
        const regex = CAPITAL_LETTER_REGEX;
        if (!regex.test(text)) {
            throw new Error(`${fieldName} deve conter pelo menos uma letra maiúscula.`);
        }

        return true;
    }
}

module.exports = Validations;
