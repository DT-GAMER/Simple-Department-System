import { SubDepartmentResponseDto } from './sub-department-response.dto';
export declare class DepartmentResponseDto {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    subDepartments?: SubDepartmentResponseDto[];
}
