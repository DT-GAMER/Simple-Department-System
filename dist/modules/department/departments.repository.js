"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentsRepository = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const department_entity_1 = require("./entities/department.entity");
const sub_department_entity_1 = require("./entities/sub-department.entity");
let DepartmentsRepository = class DepartmentsRepository extends typeorm_1.Repository {
    async createDepartment(input) {
        const department = this.create({
            name: input.name,
            subDepartments: input.subDepartments ? input.subDepartments.map(subDept => this.createSubDepartment(subDept)) : [],
        });
        return await this.save(department);
    }
    async updateDepartment(id, input) {
        const department = await this.findOne({
            where: { id },
            relations: ['subDepartments'],
        });
        if (!department) {
            throw new Error('Department not found');
        }
        department.name = input.name || department.name;
        department.subDepartments = input.subDepartments
            ? input.subDepartments.map(subDept => this.createSubDepartment(subDept))
            : department.subDepartments;
        return this.save(department);
    }
    async deleteDepartment(id) {
        const department = await this.findOne({
            where: { id },
            relations: ['subDepartments'],
        });
        if (!department) {
            throw new Error('Department not found');
        }
        await this.remove(department);
        return true;
    }
    createSubDepartment(subDept) {
        const subDepartment = new sub_department_entity_1.SubDepartment();
        subDepartment.name = subDept.name;
        return subDepartment;
    }
    async getDepartments() {
        return this.find({ relations: ['subDepartments'] });
    }
};
exports.DepartmentsRepository = DepartmentsRepository;
exports.DepartmentsRepository = DepartmentsRepository = __decorate([
    (0, common_1.Injectable)(),
    (0, typeorm_1.EntityRepository)(department_entity_1.Department)
], DepartmentsRepository);
//# sourceMappingURL=departments.repository.js.map