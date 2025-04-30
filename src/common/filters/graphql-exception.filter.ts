import { Catch, ArgumentsHost } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Catch()
export class GraphQLExceptionFilter implements GqlExceptionFilter {
  catch(exception: any, _host: ArgumentsHost) {
    console.error('GraphQL Error:', exception);

    return new GraphQLError(
      exception?.message || 'Internal Server Error',
      {
        extensions: {
          code: 'INTERNAL_SERVER_ERROR',
          error: exception?.name || 'UnknownError',
          stacktrace: exception?.stack?.split('\n') || [],
        },
      },
    );
  }
}
