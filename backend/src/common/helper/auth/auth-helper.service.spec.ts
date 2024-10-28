import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import { UserDocument } from 'src/modules/user/entities/user.entity';
import { IUserPayload } from 'src/modules/user/interface/user-payload.interface';
import { AuthHelperService } from './auth-helper.service';

describe('AuthHelperService', () => {
  let service: AuthHelperService;
  let jwtService: JwtService;
  const userId = '123456789012123456789012';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthHelperService,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
            verifyAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthHelperService>(AuthHelperService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When getHashedPassword is called', () => {
    const password = 'password';
    const hashedPassword = 'hashedPassword';
    let result: string;

    beforeEach(async () => {
      jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword as never);
      result = await service.getHashedPassword(password);
    });

    it('should call hash function with the password and salt rounds', () => {
      expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
    });

    it('should return a hashed value', () => {
      expect(result).toBe(hashedPassword);
    });
  });

  describe('When checkPassword is called', () => {
    const password = 'password';
    const hashedPassword = 'hashedPassword';
    let result: boolean;

    beforeEach(async () => {
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);
      result = await service.checkPassword(password, hashedPassword);
    });

    it('should call compare function with password and hashed password', () => {
      expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
    });

    it('should return true if passwords match', () => {
      expect(result).toBe(true);
    });
  });

  describe('When getUserPayload is called', () => {
    const user: Partial<UserDocument> = {
      _id: new Types.ObjectId(userId),
      email: 'test@example.com',
      name: 'Test User',
    };
    let result: IUserPayload;

    beforeEach(() => {
      result = service.getUserPayload(user as UserDocument);
    });

    it('should return a payload with user details', () => {
      expect(result).toEqual({
        _id: userId,
        email: 'test@example.com',
        name: 'Test User',
      });
    });
  });

  describe('When getAccessToken is called', () => {
    const user: Partial<UserDocument> = {
      _id: new Types.ObjectId(userId),
      email: 'test@example.com',
      name: 'Test User',
    };
    const token = 'mockAccessToken';
    let result: string;

    beforeEach(async () => {
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue(token as never);
      result = await service.getAccessToken(user as UserDocument);
    });

    it('should call signAsync with user payload', () => {
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        _id: userId,
        email: 'test@example.com',
        name: 'Test User',
      });
    });

    it('should return an access token', () => {
      expect(result).toBe(token);
    });
  });

  describe('When verifyAccessToken is called', () => {
    const token = 'mockToken';
    const payload: IUserPayload = {
      _id: userId,
      email: 'test@example.com',
      name: 'Test User',
    };
    let result: IUserPayload;

    beforeEach(async () => {
      jest
        .spyOn(jwtService, 'verifyAsync')
        .mockResolvedValue(payload as unknown as Promise<IUserPayload>);
      result = await service.verifyAccessToken(token);
    });

    it('should call verifyAsync with the token', () => {
      expect(jwtService.verifyAsync).toHaveBeenCalledWith(token);
    });

    it('should return the payload if token is valid', () => {
      expect(result).toEqual(payload);
    });
  });
});
