import { IsString, MinLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginInput {
  @ApiProperty({ example: 'johndoe', description: 'Username of the user' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'securePassword123', description: 'Password (min 6 chars)' })
  @IsString()
  @MinLength(6)
  password: string;
}