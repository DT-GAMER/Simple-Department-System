import { MinLength, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupInput {
  @ApiProperty({ example: 'johndoe', description: 'Unique username for the new user' })
  @IsString()
  @MinLength(3)
  username: string;

  @ApiProperty({ example: 'strongPassword123', description: 'Password (min 6 chars)' })
  @IsString()
  @MinLength(6)
  password: string;
}