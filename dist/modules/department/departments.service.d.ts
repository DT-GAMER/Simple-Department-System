import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { SubDepartment } from './entities/sub-department.entity';
import { CreateDepartmentInput } from './dtos/create-department.input';
import { UpdateDepartmentInput } from './dtos/update-department.input';
import { CreateSubDepartmentInput } from './dtos/create-sub-department.input';
import { DeleteResult } from 'typeorm';
export declare class DepartmentsService {
    private readonly departmentsRepository;
    private readonly subDepartmentsRepository;
    constructor(departmentsRepository: Repository<Department>, subDepartmentsRepository: Repository<SubDepartment>);
    createDepartment(input: CreateDepartmentInput, subDepartmentsInput: CreateSubDepartmentInput[]): Promise<Department>;
    updateDepartment(id: number, input: UpdateDepartmentInput): Promise<Department>;
    getAllDepartments(): Promise<Department[]>;
    getDepartmentById(id: number): Promise<Department>;
    deleteDepartment(id: number): Promise<void>;
    addSubDepartmentsToExistingDepartment(departmentId: number, subDepartmentsInput: CreateSubDepartmentInput[]): Promise<Department>;
    deleteSubDepartment(subDepartmentId: number): Promise<DeleteResult>;
}
