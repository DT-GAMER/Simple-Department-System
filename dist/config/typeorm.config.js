"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmConfig = void 0;
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../modules/auth/entities/user.entity");
const department_entity_1 = require("../modules/department/entities/department.entity");
const sub_department_entity_1 = require("../modules/department/entities/sub-department.entity");
const TypeOrmConfig = () => typeorm_1.TypeOrmModule.forRootAsync({
    imports: [config_1.ConfigModule],
    inject: [config_1.ConfigService],
    useFactory: (configService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'postgres'),
        password: configService.get('DB_PASSWORD', 'password'),
        database: configService.get('DB_NAME', 'department_db'),
        entities: [user_entity_1.User, department_entity_1.Department, sub_department_entity_1.SubDepartment],
        synchronize: true,
        autoLoadEntities: true,
    }),
});
exports.TypeOrmConfig = TypeOrmConfig;
//# sourceMappingURL=typeorm.config.js.map