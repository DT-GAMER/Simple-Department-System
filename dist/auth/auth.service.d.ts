import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { SignupInput } from './dto/signup.input';
import { LoginInput } from './dto/login.input';
import { AuthResponse } from './dto/auth.response';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    signup(input: SignupInput): Promise<AuthResponse>;
    login(input: LoginInput): Promise<AuthResponse>;
    validateUser(userId: number): Promise<User | null>;
    private generateToken;
}
