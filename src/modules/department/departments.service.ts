import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { SubDepartment } from './entities/sub-department.entity';
import { CreateDepartmentInput } from './dtos/create-department.input';
import { UpdateDepartmentInput } from './dtos/update-department.input';
import { CreateSubDepartmentInput } from './dtos/create-sub-department.input';
import { DeleteResult } from 'typeorm';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentsRepository: Repository<Department>,

    @InjectRepository(SubDepartment)
    private readonly subDepartmentsRepository: Repository<SubDepartment>,
  ) {}

  // Create a new department with optional sub-departments
  async createDepartment(
input: CreateDepartmentInput, subDepartmentsInput: CreateSubDepartmentInput[],
  ): Promise<Department> {
    const department = this.departmentsRepository.create({
      name: input.name,
    });

    if (input.subDepartments && input.subDepartments.length > 0) {
      const subDepartments = input.subDepartments.map(subDept =>
        this.subDepartmentsRepository.create({ name: subDept.name, department }),
      );
      department.subDepartments = subDepartments;
    }

    return this.departmentsRepository.save(department);
  }

  // Update an existing department, handle add/remove sub-departments
  async updateDepartment(
    id: number,
    input: UpdateDepartmentInput,
  ): Promise<Department> {
    const department = await this.departmentsRepository.findOne({
      where: { id },
      relations: ['subDepartments'],
    });

    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }

    department.name = input.name || department.name;

    // Remove sub-departments
    if (input.removeSubDepartmentIds?.length) {
      await this.subDepartmentsRepository.delete({ id: In(input.removeSubDepartmentIds) });
      department.subDepartments = department.subDepartments.filter(
        sd => !input.removeSubDepartmentIds.includes(sd.id),
      );
    }

    // Add new sub-departments
    if (input.subDepartments?.length) {
      const newSubs = input.subDepartments.map(sub =>
        this.subDepartmentsRepository.create({ name: sub.name, department }),
      );
      department.subDepartments.push(...newSubs);
    }

    return this.departmentsRepository.save(department);
  }

  // Get all departments with sub-departments
  async getAllDepartments(): Promise<Department[]> {
    return this.departmentsRepository.find({ relations: ['subDepartments'] });
  }

  // Get single department
  async getDepartmentById(id: number): Promise<Department> {
    const department = await this.departmentsRepository.findOne({
      where: { id },
      relations: ['subDepartments'],
    });

    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }

    return department;
  }

  // Delete a department and its sub-departments
  async deleteDepartment(id: number): Promise<void> {
    const department = await this.departmentsRepository.findOne({
      where: { id },
      relations: ['subDepartments'],
    });

    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }

    await this.departmentsRepository.remove(department);
  }

  // Add sub-departments to an existing department
  async addSubDepartmentsToExistingDepartment(
    departmentId: number,
    subDepartmentsInput: CreateSubDepartmentInput[],
  ): Promise<Department> {
    const department = await this.departmentsRepository.findOne({
      where: { id: departmentId },
      relations: ['subDepartments'],
    });

    if (!department) {
      throw new NotFoundException(`Department with ID ${departmentId} not found`);
    }

    const subDepartments = subDepartmentsInput.map(subDept =>
      this.subDepartmentsRepository.create({ ...subDept, department }),
    );

    department.subDepartments.push(...subDepartments);
    await this.departmentsRepository.save(department);

    return department;
  }

  // Delete a sub-department
  async deleteSubDepartment(subDepartmentId: number): Promise<DeleteResult> {
    const subDepartment = await this.subDepartmentsRepository.findOne({
      where: { id: subDepartmentId },
    });

    if (!subDepartment) {
      throw new NotFoundException(`Sub-department with ID ${subDepartmentId} not found`);
    }

    return this.subDepartmentsRepository.delete(subDepartmentId);
  }
}
