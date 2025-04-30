import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
export declare class DepartmentsRepository extends Repository<Department> {
    getDepartments(): Promise<Department[]>;
    createDepartmentInstance(input: {
        name: string;
        subDepartments?: {
            name: string;
        }[];
    }): Department;
    createSubDepartmentInstance(name: string): {
        name: string;
    };
}
