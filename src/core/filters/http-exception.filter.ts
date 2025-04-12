import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    
    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    
    const errorResponse = exception.getResponse();
    const errorMessage = typeof errorResponse === 'string' 
      ? errorResponse 
      : (errorResponse as any).message || exception.message;
    
    const errorDetails = (errorResponse as any).error || null;
    
    const responseBody = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: errorMessage,
      ...(errorDetails ? { error: errorDetails } : {}),
    };

    this.logger.error(
      `${request.method} ${request.url} ${status} - ${JSON.stringify(errorMessage)}`,
    );

    response.status(status).json(responseBody);
  }
}