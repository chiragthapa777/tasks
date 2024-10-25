import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthHelperService } from 'src/common/helper/auth/auth-helper.service';
export declare class AuthGuard implements CanActivate {
    private authHelperService;
    constructor(authHelperService: AuthHelperService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
