import { CreateDepartmentInput } from './create-department.input';
import { CreateSubDepartmentInput } from './create-sub-department.input';
declare const UpdateDepartmentInput_base: import("@nestjs/common").Type<Partial<CreateDepartmentInput>>;
export declare class UpdateDepartmentInput extends UpdateDepartmentInput_base {
    name?: string;
    subDepartments?: CreateSubDepartmentInput[];
}
export {};
