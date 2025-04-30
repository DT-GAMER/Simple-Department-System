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
const department_entity_1 = require("./entities/department.entity");
let DepartmentsRepository = class DepartmentsRepository extends typeorm_1.Repository {
    async getDepartments() {
        return this.find({ relations: ['subDepartments'] });
    }
    createDepartmentInstance(input) {
        return this.create({
            name: input.name,
            subDepartments: input.subDepartments?.map(sd => ({
                name: sd.name,
            })) || [],
        });
    }
    createSubDepartmentInstance(name) {
        return { name };
    }
};
exports.DepartmentsRepository = DepartmentsRepository;
exports.DepartmentsRepository = DepartmentsRepository = __decorate([
    (0, typeorm_1.EntityRepository)(department_entity_1.Department)
], DepartmentsRepository);
//# sourceMappingURL=departments.repository.js.map