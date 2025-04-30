import { DepartmentsService } from './departments.service';
import { CreateDepartmentInput } from './dtos/create-department.input';
import { UpdateDepartmentInput } from './dtos/update-department.input';
import { DepartmentResponseDto } from './dtos/department-response.dto';
export declare class DepartmentsResolver {
    private readonly departmentsService;
    constructor(departmentsService: DepartmentsService);
    private toSubDepartmentDto;
    private toDepartmentDto;
    getAllDepartments(): Promise<DepartmentResponseDto[]>;
    getDepartmentById(id: number): Promise<DepartmentResponseDto>;
    createDepartment(createDepartmentInput: CreateDepartmentInput): Promise<DepartmentResponseDto>;
    updateDepartment(id: number, updateDepartmentInput: UpdateDepartmentInput): Promise<DepartmentResponseDto>;
    deleteDepartment(id: number): Promise<boolean>;
}
