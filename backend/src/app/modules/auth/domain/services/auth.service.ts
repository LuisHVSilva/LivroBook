import {inject, injectable} from "tsyringe";
import {IAuthService} from "@modules/auth/domain/services/interfaces/IAuth.service";
import {CreateTokenPayloadDTO, LoginDTO, LoginResponseDTO} from "@modules/auth/adapters/dtos/auth.dto";
import {IUserService} from "@user/domain/services/interface/IUser.service";
import {UserEntity} from "@user/domain/entities/user.entity";
import {IUserCredentialService} from "@user/domain/services/interface/IUserCredential.service";
import jwt, {Secret, SignOptions} from "jsonwebtoken";
import {ResultType} from "@coreShared/types/result.type";
import {UserCredentialEntity} from "@user/domain/entities/userCredential.entity";

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

    public async login(input: LoginDTO): Promise<ResultType<LoginResponseDTO>> {
        const user: UserEntity = await this.userService.getUserActiveByEmail(input.email);

        const isValid: ResultType<UserCredentialEntity> = await this.userCredentialService.validateLoginCredential(user, input.password, input.ip);

        if (!isValid.isSuccess()) {
            return ResultType.failure(isValid.getError());
        }

        const token: string = this.createToken({userId: user.id!, email: user.email, userType: user.userType});

        const result = {
            token: token,
            user: {
                email: user.email,
                name: user.name,
                userType: user.userType,
            }
        }

        return ResultType.success(result);
    }

    private createToken(payload: CreateTokenPayloadDTO): string {
        const options: SignOptions = {expiresIn: this.TOKEN_EXPIRES_TIME};
        return jwt.sign(payload, AuthService.secretJwtKey, options);
    }
}