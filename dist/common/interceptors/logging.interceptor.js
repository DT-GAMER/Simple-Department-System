"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var LoggingInterceptor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const graphql_1 = require("@nestjs/graphql");
let LoggingInterceptor = LoggingInterceptor_1 = class LoggingInterceptor {
    constructor() {
        this.logger = new common_1.Logger(LoggingInterceptor_1.name);
    }
    intercept(context, next) {
        const isGraphQL = context.getType() === 'graphql';
        let request;
        let body;
        let headers;
        if (isGraphQL) {
            const gqlContext = graphql_1.GqlExecutionContext.create(context);
            request = gqlContext.getContext().req;
            body = gqlContext.getArgs();
            headers = request?.headers;
        }
        else {
            request = context.switchToHttp().getRequest();
            body = request.body;
            headers = request.headers;
        }
        this.logger.log(`Incoming Request | Body: ${JSON.stringify(body)} | Headers: ${JSON.stringify(headers)}`);
        return next.handle().pipe((0, operators_1.tap)(() => {
            this.logger.log(`Completed Request`);
        }));
    }
};
exports.LoggingInterceptor = LoggingInterceptor;
exports.LoggingInterceptor = LoggingInterceptor = LoggingInterceptor_1 = __decorate([
    (0, common_1.Injectable)()
], LoggingInterceptor);
//# sourceMappingURL=logging.interceptor.js.map