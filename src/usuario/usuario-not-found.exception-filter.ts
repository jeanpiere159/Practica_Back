import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(NotFoundException)
export class UsuarioNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus() || HttpStatus.NOT_FOUND;
    response.status(status).json({
      statusCode: status,
      message: 'Usuario no econtrado o como sea no existe',
      error: exception.message,
      path: request.url,
    });
  }
}
