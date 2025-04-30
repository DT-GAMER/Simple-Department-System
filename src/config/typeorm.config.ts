import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../modules/auth/entities/user.entity';
import { Department } from '../modules/department/entities/department.entity';
import { SubDepartment } from '../modules/department/entities/sub-department.entity';

export const TypeOrmConfig = () =>
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
      type: 'postgres',
      host: configService.get<string>('DB_HOST', 'localhost'),
      port: configService.get<number>('DB_PORT', 5432),
      username: configService.get<string>('DB_USERNAME', 'postgres'),
      password: configService.get<string>('DB_PASSWORD', 'password'),
      database: configService.get<string>('DB_NAME', 'department_db'),
      entities: [User, Department, SubDepartment],
      synchronize: true,
      autoLoadEntities: true,
    }),
  });
