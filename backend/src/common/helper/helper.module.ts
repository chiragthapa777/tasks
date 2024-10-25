import { Global, Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthHelperService } from './auth/auth-helper.service';
import { PaginationHelperService } from './pagination-helper/pagination-helper.service';

@Global()
@Module({
  providers: [AuthHelperService, PaginationHelperService],
  exports: [AuthHelperService, PaginationHelperService],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        global: true,
        signOptions: {
          expiresIn: '24h',
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class HelperModule {}
