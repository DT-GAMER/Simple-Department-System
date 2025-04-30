import { Department } from './department.entity';
export declare class SubDepartment {
    id: number;
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
    department: Department;
}
