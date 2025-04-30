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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDepartmentInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const create_department_input_1 = require("./create-department.input");
const create_sub_department_input_1 = require("./create-sub-department.input");
let UpdateDepartmentInput = class UpdateDepartmentInput extends (0, graphql_1.PartialType)(create_department_input_1.CreateDepartmentInput) {
};
exports.UpdateDepartmentInput = UpdateDepartmentInput;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDepartmentInput.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => [create_sub_department_input_1.CreateSubDepartmentInput], { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateDepartmentInput.prototype, "subDepartments", void 0);
__decorate([
    (0, graphql_1.Field)(() => [graphql_1.Int], { nullable: true, description: 'IDs of sub-departments to remove' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsInt)({ each: true }),
    __metadata("design:type", Array)
], UpdateDepartmentInput.prototype, "removeSubDepartmentIds", void 0);
exports.UpdateDepartmentInput = UpdateDepartmentInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateDepartmentInput);
//# sourceMappingURL=update-department.input.js.map