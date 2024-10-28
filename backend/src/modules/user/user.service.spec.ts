import { BadRequestException, NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model, Types } from 'mongoose';
import { AuthHelperService } from 'src/common/helper/auth/auth-helper.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { User, UserDocument } from './entities/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let userModel: Model<UserDocument>;
  let authHelperService: AuthHelperService;

  const mockUser = {
    _id: new Types.ObjectId(),
    email: 'test@example.com',
    password: 'hashedPassword',
  } as UserDocument;

  const mockUserModel = {
    findOne: jest.fn(),
    create: jest.fn(),
  };

  const mockAuthHelperService = {
    getHashedPassword: jest.fn(),
    getAccessToken: jest.fn(),
    getUserPayload: jest.fn(),
    checkPassword: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getModelToken(User.name), useValue: mockUserModel },
        { provide: AuthHelperService, useValue: mockAuthHelperService },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userModel = module.get<Model<UserDocument>>(getModelToken(User.name));
    authHelperService = module.get<AuthHelperService>(AuthHelperService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('checkEmailExist', () => {
    it('should return true if email exists', async () => {
      jest.spyOn(service, 'findOneOrFail').mockResolvedValue(mockUser);
      expect(await service.checkEmailExist(mockUser.email)).toBe(true);
    });

    it('should return false if email does not exist', async () => {
      jest
        .spyOn(service, 'findOneOrFail')
        .mockRejectedValueOnce(new NotFoundException());
      expect(await service.checkEmailExist('nonexistent@example.com')).toBe(
        false,
      );
    });
  });

  describe('createUser', () => {
    it('should create a user with hashed password', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password',
        name: 'name name',
      };
      const hashedPassword = 'hashedPassword';
      mockAuthHelperService.getHashedPassword.mockResolvedValue(hashedPassword);
      mockUserModel.create.mockResolvedValue({
        ...mockUser,
        password: hashedPassword,
      });

      const result = await service.createUser(createUserDto);

      expect(authHelperService.getHashedPassword).toHaveBeenCalledWith(
        'password',
      );
      expect(userModel.create).toHaveBeenCalledWith(
        expect.objectContaining({ password: hashedPassword }),
      );
      expect(result.password).toEqual(hashedPassword);
    });
  });

  describe('register', () => {
    it('should throw BadRequestException if email already exists', async () => {
      jest.spyOn(service, 'checkEmailExist').mockResolvedValue(true);
      await expect(
        service.register({
          email: mockUser.email,
          password: 'password',
          name: 'name name',
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should return accessToken and user payload if registration is successful', async () => {
      mockUserModel.findOne.mockResolvedValue(null);
      mockAuthHelperService.getHashedPassword.mockResolvedValue(
        'hashedPassword',
      );
      mockUserModel.create.mockResolvedValue(mockUser);
      mockAuthHelperService.getAccessToken.mockResolvedValue('accessToken');
      mockAuthHelperService.getUserPayload.mockReturnValue({
        id: mockUser._id,
        email: mockUser.email,
      });

      const result = await service.register({
        email: mockUser.email,
        password: 'password',
        name: 'name name',
      });

      expect(result).toEqual({
        user: { id: mockUser._id, email: mockUser.email },
        accessToken: 'accessToken',
      });
    });
  });

  describe('login', () => {
    it('should throw NotFoundException if user is not found', async () => {
      jest
        .spyOn(service, 'findOneOrFail')
        .mockRejectedValue(new NotFoundException());
      const loginDto: LoginDto = {
        email: 'nonexistent@example.com',
        password: 'password',
      };

      await expect(service.login(loginDto)).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if password is incorrect', async () => {
      jest.spyOn(service, 'findOneOrFail').mockResolvedValue(mockUser);
      mockAuthHelperService.checkPassword.mockResolvedValue(false);
      const loginDto: LoginDto = {
        email: mockUser.email,
        password: 'wrongPassword',
      };

      await expect(service.login(loginDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should return accessToken and user payload if login is successful', async () => {
      jest.spyOn(service, 'findOneOrFail').mockResolvedValue(mockUser);
      mockAuthHelperService.checkPassword.mockResolvedValue(true);
      mockAuthHelperService.getAccessToken.mockResolvedValue('accessToken');
      mockAuthHelperService.getUserPayload.mockReturnValue({
        id: mockUser._id,
        email: mockUser.email,
      });

      const loginDto: LoginDto = {
        email: mockUser.email,
        password: 'password',
      };
      const result = await service.login(loginDto);

      expect(result).toEqual({
        user: { id: mockUser._id, email: mockUser.email },
        accessToken: 'accessToken',
      });
    });
  });
});
