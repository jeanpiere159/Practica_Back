import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import * as express from 'express';
import * as passport from 'passport';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: express.Request, res: express.Response, next: express.NextFunction) {
    passport.authenticate('jwt', { session: false }, (err, user) => {
      if (err || !user) {
        return next(new UnauthorizedException('Unauthorized'));
      }
      req.user = user;
      next();
    })(req, res, next);
  }
}
