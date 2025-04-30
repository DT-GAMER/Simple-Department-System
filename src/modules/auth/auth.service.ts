import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { SignupInput } from './dto/signup.input';
import { LoginInput } from './dto/login.input';
import { AuthRestResponse } from './dto/auth.response';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupInput): Promise<{ message: string }> {
    const existingUser = await this.userRepository.findOne({ where: { username: signupDto.username } });
  
    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }
  
    const hashedPassword = await bcrypt.hash(signupDto.password, 10);
  
    const user = this.userRepository.create({
      username: signupDto.username,
      password: hashedPassword,
    });
  
    await this.userRepository.save(user);
  
    return { message: 'Signup successful. Please log in.' };
  }
  

  async login(loginDto: LoginInput): Promise<AuthRestResponse> {
    const user = await this.userRepository.findOne({ where: { username: loginDto.username } });
  
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    const payload = { sub: user.id, username: user.username };
    const accessToken = this.jwtService.sign(payload);
  
    return { accessToken, user };
  }
  

  async validateUser(userId: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id: userId } });
  }

  private async generateToken(user: User): Promise<string> {
    return this.jwtService.signAsync({
      sub: user.id,
      username: user.username,
    });
  }
}
