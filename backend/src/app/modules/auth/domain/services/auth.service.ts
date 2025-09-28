import {inject, injectable} from "tsyringe";
import {IAuthService} from "@modules/auth/domain/services/interfaces/IAuth.service";
import {CreateTokenPayloadDTO, LoginDTO, LoginResponseDTO} from "@modules/auth/adapters/dtos/auth.dto";
import {LogError} from "@coreShared/decorators/LogError";
import {IUserService} from "@user/domain/services/interface/IUser.service";
import {UserEntity} from "@user/domain/entities/user.entity";
import {IUserCredentialService} from "@user/domain/services/interface/IUserCredential.service";
import {ValidationError} from "@coreShared/errors/domain.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import jwt, {Secret, SignOptions} from "jsonwebtoken";

@injectable()
export class AuthService implements IAuthService {
    //#region PROPERTIES
    private static readonly SECRET_JWT_KEY: Secret = process.env.SECRET_JWT_KEY || "super-senha";
    private readonly TOKEN_EXPIRES_TIME = "1d";

    static get secretJwtKey(): Secret {
        return this.SECRET_JWT_KEY;
    }

    //#endregion

    constructor(
        @inject("IUserService") private readonly userService: IUserService,
        @inject("IUserCredentialService") private readonly userCredentialService: IUserCredentialService,
    ) {
    }

    @LogError()
    public async login(input: LoginDTO): Promise<LoginResponseDTO> {
        const user: UserEntity = await this.userService.getUserActiveByEmail(input.email);
        const isPasswordValid: boolean = await this.userCredentialService.isPasswordValid(user.userCredentialId, input.password);

        if (!isPasswordValid) {
            throw new ValidationError(EntitiesMessage.error.validation.invalidPassword);
        }

        const token: string = this.createToken({userId: user.id!, email: user.email, userTypeId: user.userTypeId});

        return {
            token: token,
            user: {
                email: user.email,
                name: user.name,
                userTypeId: user.userTypeId,
            }
        }
    }

    private createToken(payload: CreateTokenPayloadDTO): string {
        const options: SignOptions = {expiresIn: this.TOKEN_EXPIRES_TIME};
        return jwt.sign(payload, AuthService.secretJwtKey, options);
    }

    // private verifyToken(token: string): any {
    //     try {
    //         return jwt.verify(token, AuthService.secretJwtKey);
    //     } catch (err) {
    //         throw new ServiceError("Token inválido ou expirado");
    //     }
    // }
    //
    // private decodeToken(token: string): any {
    //     return jwt.decode(token);
    // }
}