import { Department } from './entities/department.entity';
import { SubDepartment } from './entities/sub-department.entity';

// Interface for the department response structure
export interface DepartmentResponse {
  id: number;
  name: string;
  subDepartments: SubDepartment[];
}

// Interface for the department creation input
export interface DepartmentInput {
  name: string;
  subDepartments?: { name: string }[];
}

// Interface for the department update input
export interface UpdateDepartmentInput {
  name?: string;
  subDepartments?: { name: string }[];
}
