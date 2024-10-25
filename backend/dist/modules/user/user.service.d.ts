import { Model, RootFilterQuery } from 'mongoose';
import { AuthHelperService } from 'src/common/helper/auth/auth-helper.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { User, UserDocument } from './entities/user.entity';
import { IUserPayload } from './interface/user-payload.interface';
export declare class UserService {
    private userModel;
    private readonly authHelperService;
    constructor(userModel: Model<User>, authHelperService: AuthHelperService);
    checkEmailExist(email: string): Promise<boolean>;
    findOneOrFail(find: RootFilterQuery<User>): Promise<UserDocument>;
    createUser(createUserDto: CreateUserDto): Promise<UserDocument>;
    getUserAccessToken(user: UserDocument): Promise<{
        accessToken: string;
        user: IUserPayload;
    }>;
    register(createUserDto: CreateUserDto): Promise<{
        accessToken: string;
        user: IUserPayload;
    }>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        user: IUserPayload;
    }>;
}
