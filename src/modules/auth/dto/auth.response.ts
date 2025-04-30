import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class AuthRestResponse {
  @ApiProperty({ description: 'JWT access token' })
  accessToken: string;

  @ApiProperty({ type: () => User })
  user: User;
}
