import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, RootFilterQuery } from 'mongoose';
import { AuthHelperService } from 'src/common/helper/auth/auth-helper.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { User, UserDocument } from './entities/user.entity';
import { IUserPayload } from './interface/user-payload.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly authHelperService: AuthHelperService,
  ) {}

  async checkEmailExist(email: string): Promise<boolean> {
    try {
      await this.findOneOrFail({ email });
      return true;
    } catch (e) {
      return false;
    }
  }

  async findOneOrFail(find: RootFilterQuery<User>): Promise<UserDocument> {
    const user = await this.userModel.findOne(find).exec();
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
    const hashedPassword = await this.authHelperService.getHashedPassword(
      createUserDto.password,
    );
    createUserDto.password = hashedPassword;

    const newUser = new User();
    Object.assign(newUser, createUserDto);
    return await this.userModel.create(newUser);
  }

  async getUserAccessToken(
    user: UserDocument,
  ): Promise<{ accessToken: string; user: IUserPayload }> {
    const accessToken = await this.authHelperService.getAccessToken(user);
    const payload = this.authHelperService.getUserPayload(user);
    return {
      user: payload,
      accessToken,
    };
  }

  async register(createUserDto: CreateUserDto) {
    const emailExists = await this.checkEmailExist(createUserDto.email);
    if (emailExists) throw new BadRequestException('Email already exists');
    const user = await this.createUser(createUserDto);
    return await this.getUserAccessToken(user);
  }

  async login(loginDto: LoginDto) {
    const user = await this.findOneOrFail({ email: loginDto.email });
    const isPasswordMatch = await this.authHelperService.checkPassword(
      loginDto.password,
      user.password,
    );
    if (!isPasswordMatch) throw new BadRequestException('Invalid credentials');
    return await this.getUserAccessToken(user);
  }
}
