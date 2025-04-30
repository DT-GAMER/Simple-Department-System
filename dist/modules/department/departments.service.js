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
exports.DepartmentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const department_entity_1 = require("./entities/department.entity");
const sub_department_entity_1 = require("./entities/sub-department.entity");
let DepartmentsService = class DepartmentsService {
    constructor(departmentsRepository, subDepartmentsRepository) {
        this.departmentsRepository = departmentsRepository;
        this.subDepartmentsRepository = subDepartmentsRepository;
    }
    async createDepartment(input, subDepartmentsInput) {
        const department = this.departmentsRepository.create({
            name: input.name,
        });
        if (input.subDepartments && input.subDepartments.length > 0) {
            const subDepartments = input.subDepartments.map(subDept => this.subDepartmentsRepository.create({ name: subDept.name, department }));
            department.subDepartments = subDepartments;
        }
        return this.departmentsRepository.save(department);
    }
    async updateDepartment(id, input) {
        const department = await this.departmentsRepository.findOne({
            where: { id },
            relations: ['subDepartments'],
        });
        if (!department) {
            throw new common_1.NotFoundException(`Department with ID ${id} not found`);
        }
        department.name = input.name || department.name;
        if (input.removeSubDepartmentIds?.length) {
            await this.subDepartmentsRepository.delete({ id: (0, typeorm_2.In)(input.removeSubDepartmentIds) });
            department.subDepartments = department.subDepartments.filter(sd => !input.removeSubDepartmentIds.includes(sd.id));
        }
        if (input.subDepartments?.length) {
            const newSubs = input.subDepartments.map(sub => this.subDepartmentsRepository.create({ name: sub.name, department }));
            department.subDepartments.push(...newSubs);
        }
        return this.departmentsRepository.save(department);
    }
    async getAllDepartments() {
        return this.departmentsRepository.find({ relations: ['subDepartments'] });
    }
    async getDepartmentById(id) {
        const department = await this.departmentsRepository.findOne({
            where: { id },
            relations: ['subDepartments'],
        });
        if (!department) {
            throw new common_1.NotFoundException(`Department with ID ${id} not found`);
        }
        return department;
    }
    async deleteDepartment(id) {
        const department = await this.departmentsRepository.findOne({
            where: { id },
            relations: ['subDepartments'],
        });
        if (!department) {
            throw new common_1.NotFoundException(`Department with ID ${id} not found`);
        }
        await this.departmentsRepository.remove(department);
    }
    async addSubDepartmentsToExistingDepartment(departmentId, subDepartmentsInput) {
        const department = await this.departmentsRepository.findOne({
            where: { id: departmentId },
            relations: ['subDepartments'],
        });
        if (!department) {
            throw new common_1.NotFoundException(`Department with ID ${departmentId} not found`);
        }
        const subDepartments = subDepartmentsInput.map(subDept => this.subDepartmentsRepository.create({ ...subDept, department }));
        department.subDepartments.push(...subDepartments);
        await this.departmentsRepository.save(department);
        return department;
    }
    async deleteSubDepartment(subDepartmentId) {
        const subDepartment = await this.subDepartmentsRepository.findOne({
            where: { id: subDepartmentId },
        });
        if (!subDepartment) {
            throw new common_1.NotFoundException(`Sub-department with ID ${subDepartmentId} not found`);
        }
        return this.subDepartmentsRepository.delete(subDepartmentId);
    }
};
exports.DepartmentsService = DepartmentsService;
exports.DepartmentsService = DepartmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(department_entity_1.Department)),
    __param(1, (0, typeorm_1.InjectRepository)(sub_department_entity_1.SubDepartment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], DepartmentsService);
//# sourceMappingURL=departments.service.js.map