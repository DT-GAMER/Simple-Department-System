"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLConfig = void 0;
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const path_1 = require("path");
const GraphQLConfig = () => graphql_1.GraphQLModule.forRoot({
    driver: apollo_1.ApolloDriver,
    autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/schema.gql'),
    sortSchema: true,
    introspection: true,
    playground: true,
    context: ({ req }) => ({ req }),
});
exports.GraphQLConfig = GraphQLConfig;
//# sourceMappingURL=graphql.config.js.map