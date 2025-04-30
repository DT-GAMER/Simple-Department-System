import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { SignupInput } from './dto/signup.input';
import { LoginInput } from './dto/login.input';
import { AuthRestResponse } from './dto/auth.response';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    signup(signupDto: SignupInput): Promise<{
        message: string;
    }>;
    login(loginDto: LoginInput): Promise<AuthRestResponse>;
    validateUser(userId: number): Promise<User | null>;
    private generateToken;
}
