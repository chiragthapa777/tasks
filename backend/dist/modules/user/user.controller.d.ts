import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { Request as Req } from 'express';
import { LoginDto } from './dto/login.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(createUserDto: CreateUserDto): Promise<{
        accessToken: string;
        user: import("./interface/user-payload.interface").IUserPayload;
    }>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        user: import("./interface/user-payload.interface").IUserPayload;
    }>;
    currentUser(request: Req): any;
}
