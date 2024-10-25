import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUserPayload } from 'src/modules/user/interface/user-payload.interface';

export const GetUser = createParamDecorator(
  (returnPlain: boolean, ctx: ExecutionContext): IUserPayload => {
    const req = ctx
      .switchToHttp()
      .getRequest<Request & { user: IUserPayload }>();
    return returnPlain ? req.user : req.user;
  },
);
