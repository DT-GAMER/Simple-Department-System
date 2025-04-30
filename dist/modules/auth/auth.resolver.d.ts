import { AuthService } from './auth.service';
import { SignupInput } from './dto/signup.input';
import { LoginInput } from './dto/login.input';
import { AuthResponse } from './dto/auth.response';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    signup(input: SignupInput): Promise<AuthResponse>;
    login(input: LoginInput): Promise<AuthResponse>;
}
