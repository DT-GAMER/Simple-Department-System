import { EntityRepository, Repository } from 'typeorm';
import { Department } from './entities/department.entity';

@EntityRepository(Department)
export class DepartmentsRepository extends Repository<Department> {
  // Fetch all departments with their sub-departments
  async getDepartments(): Promise<Department[]> {
    return this.find({ relations: ['subDepartments'] });
  }

  // Create an instance of a department (not saved yet)
  createDepartmentInstance(input: {
    name: string;
    subDepartments?: { name: string }[];
  }): Department {
    return this.create({
      name: input.name,
      subDepartments: input.subDepartments?.map(sd => ({
        name: sd.name,
      })) || [],
    });
  }

  // Create an instance of sub-department
  createSubDepartmentInstance(name: string) {
    return { name };
  }
}
