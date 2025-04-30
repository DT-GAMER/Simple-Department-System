import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { CreateDepartmentInput } from './dtos/create-department.input';
import { UpdateDepartmentInput } from './dtos/update-department.input';
export declare class DepartmentsRepository extends Repository<Department> {
    createDepartment(input: CreateDepartmentInput): Promise<Department>;
    updateDepartment(id: number, input: UpdateDepartmentInput): Promise<Department>;
    deleteDepartment(id: number): Promise<boolean>;
    private createSubDepartment;
    getDepartments(): Promise<Department[]>;
}
