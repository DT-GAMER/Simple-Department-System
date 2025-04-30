import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty({ description: 'Unique user identifier', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Unique username for the user', example: 'johndoe' })
  @Column({ unique: true })
  username: string;

  @ApiProperty({ description: 'Encrypted password of the user', example: 'strongPassword123' })
  @Column()
  password: string;
}
