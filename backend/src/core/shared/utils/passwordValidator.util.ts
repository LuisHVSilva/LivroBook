export class PasswordValidatorUtil {
    static validate(password: string): void {
        const hasMinLength = password.length >= 6;
        const hasUppercase = /[A-Z]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (!hasMinLength) {
            throw new Error("Password must be at least 6 characters long");
        }
        if (!hasUppercase) {
            throw new Error("Password must contain at least one uppercase letter");
        }
        if (!hasSpecialChar) {
            throw new Error("Password must contain at least one special character");
        }
    }
}
