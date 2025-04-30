"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtConfig = void 0;
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const JwtConfig = () => jwt_1.JwtModule.registerAsync({
    imports: [config_1.ConfigModule],
    inject: [config_1.ConfigService],
    useFactory: async (configService) => ({
        secret: configService.get('JWT_SECRET', 'supersecret'),
        signOptions: {
            expiresIn: configService.get('JWT_EXPIRES_IN', '1d'),
        },
    }),
});
exports.JwtConfig = JwtConfig;
//# sourceMappingURL=jwt.config.js.map