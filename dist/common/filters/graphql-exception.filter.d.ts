import { ArgumentsHost } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
export declare class GraphQLExceptionFilter implements GqlExceptionFilter {
    catch(exception: any, _host: ArgumentsHost): GraphQLError;
}
