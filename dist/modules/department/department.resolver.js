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
exports.DepartmentsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const departments_service_1 = require("./departments.service");
const create_department_input_1 = require("./dtos/create-department.input");
const update_department_input_1 = require("./dtos/update-department.input");
const department_response_dto_1 = require("./dtos/department-response.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const common_1 = require("@nestjs/common");
let DepartmentsResolver = class DepartmentsResolver {
    constructor(departmentsService) {
        this.departmentsService = departmentsService;
    }
    toSubDepartmentDto(subDept) {
        return {
            id: subDept.id,
            name: subDept.name,
            departmentId: subDept.department?.id ?? null,
            createdAt: subDept.createdAt,
            updatedAt: subDept.updatedAt,
        };
    }
    toDepartmentDto(department) {
        return {
            id: department.id,
            name: department.name,
            createdAt: department.createdAt,
            updatedAt: department.updatedAt,
            subDepartments: department.subDepartments?.map(this.toSubDepartmentDto),
        };
    }
    async getAllDepartments() {
        const departments = await this.departmentsService.getAllDepartments();
        return departments.map(this.toDepartmentDto.bind(this));
    }
    async getDepartmentById(id) {
        const department = await this.departmentsService.getDepartmentById(id);
        if (!department) {
            throw new common_1.NotFoundException(`Department with ID ${id} not found`);
        }
        return this.toDepartmentDto(department);
    }
    async createDepartment(createDepartmentInput) {
        const department = await this.departmentsService.createDepartment(createDepartmentInput);
        return this.toDepartmentDto(department);
    }
    async updateDepartment(id, updateDepartmentInput) {
        const department = await this.departmentsService.updateDepartment(id, updateDepartmentInput);
        return this.toDepartmentDto(department);
    }
    async deleteDepartment(id) {
        await this.departmentsService.deleteDepartment(id);
        return true;
    }
};
exports.DepartmentsResolver = DepartmentsResolver;
__decorate([
    (0, graphql_1.Query)(() => [department_response_dto_1.DepartmentResponseDto], { name: 'departments' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DepartmentsResolver.prototype, "getAllDepartments", null);
__decorate([
    (0, graphql_1.Query)(() => department_response_dto_1.DepartmentResponseDto, { name: 'department' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DepartmentsResolver.prototype, "getDepartmentById", null);
__decorate([
    (0, graphql_1.Mutation)(() => department_response_dto_1.DepartmentResponseDto, { name: 'createDepartment' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('createDepartmentInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_department_input_1.CreateDepartmentInput]),
    __metadata("design:returntype", Promise)
], DepartmentsResolver.prototype, "createDepartment", null);
__decorate([
    (0, graphql_1.Mutation)(() => department_response_dto_1.DepartmentResponseDto, { name: 'updateDepartment' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('updateDepartmentInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_department_input_1.UpdateDepartmentInput]),
    __metadata("design:returntype", Promise)
], DepartmentsResolver.prototype, "updateDepartment", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, { name: 'deleteDepartment' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DepartmentsResolver.prototype, "deleteDepartment", null);
exports.DepartmentsResolver = DepartmentsResolver = __decorate([
    (0, graphql_1.Resolver)(() => department_response_dto_1.DepartmentResponseDto),
    __metadata("design:paramtypes", [departments_service_1.DepartmentsService])
], DepartmentsResolver);
//# sourceMappingURL=department.resolver.js.map