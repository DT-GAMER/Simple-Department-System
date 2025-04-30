"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async signup(signupDto) {
        const existingUser = await this.userRepository.findOne({ where: { username: signupDto.username } });
        if (existingUser) {
            throw new common_1.BadRequestException('Username already exists');
        }
        const hashedPassword = await bcrypt.hash(signupDto.password, 10);
        const user = this.userRepository.create({
            username: signupDto.username,
            password: hashedPassword,
        });
        await this.userRepository.save(user);
        return { message: 'Signup successful. Please log in.' };
    }
    async login(loginDto) {
        const user = await this.userRepository.findOne({ where: { username: loginDto.username } });
        if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = { sub: user.id, username: user.username };
        const accessToken = this.jwtService.sign(payload);
        return { accessToken, user };
    }
    async validateUser(userId) {
        return this.userRepository.findOne({ where: { id: userId } });
    }
    async generateToken(user) {
        return this.jwtService.signAsync({
            sub: user.id,
            username: user.username,
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map