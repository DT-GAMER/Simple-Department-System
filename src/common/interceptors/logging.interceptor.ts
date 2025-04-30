import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isGraphQL = context.getType<'graphql' | 'http'>() === 'graphql';
  
    let request: any;
    let body: any;
    let headers: any;
  
    if (isGraphQL) {
      const gqlContext = GqlExecutionContext.create(context);
      request = gqlContext.getContext().req;
      body = gqlContext.getArgs();
      headers = request?.headers;
    } else {
      request = context.switchToHttp().getRequest();
      body = request.body;
      headers = request.headers;
    }
  
    this.logger.log(
      `Incoming Request | Body: ${JSON.stringify(body)} | Headers: ${JSON.stringify(headers)}`,
    );
  
    return next.handle().pipe(
      tap(() => {
        this.logger.log(`Completed Request`);
      }),
    );
  }  
}