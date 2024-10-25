import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDocument } from 'src/modules/user/entities/user.entity';
import { IUserPayload } from 'src/modules/user/interface/user-payload.interface';

@Injectable()
export class AuthHelperService {
  constructor(private jwtService: JwtService) {}

  async getHashedPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }

  async checkPassword(password: string, hash: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  }

  getUserPayload(user: UserDocument) {
    const payload: IUserPayload = {
      _id: user._id.toString(),
      email: user.email,
      name: user.name,
    };
    return payload;
  }

  async getAccessToken(user: UserDocument): Promise<string> {
    return await this.jwtService.signAsync(this.getUserPayload(user));
  }

  async verifyAccessToken(token:string):Promise<IUserPayload>{
    const payload = await this.jwtService.verifyAsync(token);
    return payload
  }
}
