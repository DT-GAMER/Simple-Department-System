import { AuthService } from './auth.service';
import { SignupInput } from './dto/signup.input';
import { LoginInput } from './dto/login.input';
import { AuthRestResponse } from './dto/auth.response';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(signupDto: SignupInput): Promise<{
        message: string;
    }>;
    login(loginDto: LoginInput): Promise<AuthRestResponse>;
}
