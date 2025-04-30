import { EntityRepository, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Department } from './entities/department.entity';
import { SubDepartment } from './entities/sub-department.entity';
import { CreateDepartmentInput } from './dtos/create-department.input';
import { UpdateDepartmentInput } from './dtos/update-department.input';


@Injectable()
@EntityRepository(Department)
export class DepartmentsRepository extends Repository<Department> {
  // Create a department with optional sub-departments
  async createDepartment(input: CreateDepartmentInput): Promise<Department> {
    const department = this.create({
      name: input.name,
      subDepartments: input.subDepartments ? input.subDepartments.map(subDept => this.createSubDepartment(subDept)) : [],
    });
    return await this.save(department); 
  }

  // Update a department by ID
  async updateDepartment(id: number, input: UpdateDepartmentInput): Promise<Department> {
    const department = await this.findOne({
      where: { id },
      relations: ['subDepartments'],
    });

    if (!department) {
      throw new Error('Department not found');
    }

    department.name = input.name || department.name;
    department.subDepartments = input.subDepartments
      ? input.subDepartments.map(subDept => this.createSubDepartment(subDept))
      : department.subDepartments;

    return this.save(department);
  }

  // Delete a department and its sub-departments
  async deleteDepartment(id: number): Promise<boolean> {
    const department = await this.findOne({
      where: { id },
      relations: ['subDepartments'],
    });

    if (!department) {
      throw new Error('Department not found');
    }

    await this.remove(department);
    return true;
  }

  // Helper method to create sub-department
  private createSubDepartment(subDept: { name: string }): SubDepartment {
    const subDepartment = new SubDepartment();
    subDepartment.name = subDept.name;
    return subDepartment;
  }

  // Fetch all departments with sub-departments
  async getDepartments(): Promise<Department[]> {
    return this.find({ relations: ['subDepartments'] });
  }
}