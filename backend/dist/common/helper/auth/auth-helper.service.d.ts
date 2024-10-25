import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/modules/user/entities/user.entity';
import { IUserPayload } from 'src/modules/user/interface/user-payload.interface';
export declare class AuthHelperService {
    private jwtService;
    constructor(jwtService: JwtService);
    getHashedPassword(password: string): Promise<string>;
    checkPassword(password: string, hash: string): Promise<boolean>;
    getUserPayload(user: UserDocument): IUserPayload;
    getAccessToken(user: UserDocument): Promise<string>;
    verifyAccessToken(token: string): Promise<IUserPayload>;
}
