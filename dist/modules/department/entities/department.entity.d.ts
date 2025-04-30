import { SubDepartment } from './sub-department.entity';
export declare class Department {
    id: number;
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
    subDepartments?: SubDepartment[];
}
