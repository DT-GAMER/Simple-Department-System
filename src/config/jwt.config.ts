import { JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

export const JwtConfig = () =>
  JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService): Promise<JwtModuleOptions> => ({
      secret: configService.get<string>('JWT_SECRET', 'supersecret'),
      signOptions: {
        expiresIn: configService.get<string>('JWT_EXPIRES_IN', '1d'),
      },
    }),
  });
