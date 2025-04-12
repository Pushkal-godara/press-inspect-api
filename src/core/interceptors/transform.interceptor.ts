import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
  meta?: any;
  message?: string;
  statusCode: number;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const statusCode = response.statusCode;

    return next.handle().pipe(
      map(data => {
        // Handle pagination responses
        if (data && data.hasOwnProperty('items') && data.hasOwnProperty('meta')) {
          return {
            data: data.items,
            meta: data.meta,
            statusCode,
          };
        }
        
        // Handle regular responses
        return {
          data,
          statusCode,
          message: data?.message || 'Success',
        };
      }),
    );
  }
}