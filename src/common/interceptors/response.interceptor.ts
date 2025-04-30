import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Logger,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  
  @Injectable()
  export class ResponseInterceptor implements NestInterceptor {
    private readonly logger = new Logger(ResponseInterceptor.name);
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const isGraphQL = context.getType<'http' | 'graphql'>() === 'graphql';
    
      return next.handle().pipe(
        map((data) => {
          if (isGraphQL) return data;
    
          return {
            success: true,
            data,
          };
        }),
      );
    }
  }    
  