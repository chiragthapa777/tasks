import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { HelperModule } from 'src/common/helper/helper.module';
import { userServiceMock } from './__mock__/user-service.mock';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guards/auth/auth.guard';
import { IUserPayload } from './interface/user-payload.interface';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  const mockUserService = userServiceMock;

  const mockUser: IUserPayload = {
    _id: new Types.ObjectId().toString(),
    email: 'test@example.com',
    name: 'Test User',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
      imports: [HelperModule],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should call userService.register with the provided CreateUserDto', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password123',
        name: 'test user',
      };
      const result = { _id: new Types.ObjectId(), ...createUserDto };
      mockUserService.register.mockResolvedValue(result);

      expect(await controller.register(createUserDto)).toEqual(result);
      expect(userService.register).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('login', () => {
    it('should call userService.login with the provided LoginDto', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };
      const result = { accessToken: 'jwt.token.here' };
      mockUserService.login.mockResolvedValue(result);

      expect(await controller.login(loginDto)).toEqual(result);
      expect(userService.login).toHaveBeenCalledWith(loginDto);
    });
  });

  describe('currentUser', () => {
    it('should return the user from the request if authenticated', () => {
      const request = { user: mockUser } as any;

      expect(controller.currentUser(request)).toEqual(mockUser);
    });
  });
});
