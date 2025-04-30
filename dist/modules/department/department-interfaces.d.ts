import { SubDepartment } from './entities/sub-department.entity';
export interface DepartmentResponse {
    id: number;
    name: string;
    subDepartments: SubDepartment[];
}
export interface DepartmentInput {
    name: string;
    subDepartments?: {
        name: string;
    }[];
}
export interface UpdateDepartmentInput {
    name?: string;
    subDepartments?: {
        name: string;
    }[];
}
