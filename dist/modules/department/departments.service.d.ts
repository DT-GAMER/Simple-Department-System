import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { SubDepartment } from './entities/sub-department.entity';
import { CreateDepartmentInput } from './dtos/create-department.input';
import { UpdateDepartmentInput } from './dtos/update-department.input';
import { CreateSubDepartmentInput } from './dtos/create-sub-department.input';
export declare class DepartmentsService {
    private readonly departmentsRepository;
    private readonly subDepartmentsRepository;
    findAll(): void;
    findOne(id: number): void;
    create(createDepartmentInput: CreateDepartmentInput): void;
    constructor(departmentsRepository: Repository<Department>, subDepartmentsRepository: Repository<SubDepartment>);
    createDepartment(createDepartmentInput: CreateDepartmentInput, subDepartmentsInput?: CreateSubDepartmentInput[]): Promise<Department>;
    updateDepartment(departmentId: number, updateDepartmentInput: UpdateDepartmentInput): Promise<Department>;
    getDepartmentById(departmentId: number): Promise<Department>;
    getAllDepartments(): Promise<Department[]>;
    deleteDepartment(departmentId: number): Promise<void>;
    addSubDepartmentsToExistingDepartment(departmentId: number, subDepartmentsInput: CreateSubDepartmentInput[]): Promise<Department>;
}
