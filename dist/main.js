"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const graphql_exception_filter_1 = require("./common/filters/graphql-exception.filter");
const logging_interceptor_1 = require("./common/interceptors/logging.interceptor");
const response_interceptor_1 = require("./common/interceptors/response.interceptor");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('PORT') || 3000;
    app.enableCors({
        origin: '*',
        methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalFilters(new graphql_exception_filter_1.GraphQLExceptionFilter());
    app.useGlobalInterceptors(new logging_interceptor_1.LoggingInterceptor(), new response_interceptor_1.ResponseInterceptor());
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Tactology REST API')
        .setDescription('API documentation for REST endpoints like login and signup')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    await app.listen(port);
    console.log(`GraphQL Playground: http://localhost:${port}/graphql`);
    console.log(`Swagger Docs: http://localhost:${port}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map