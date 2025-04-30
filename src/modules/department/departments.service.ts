import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { SubDepartment } from './entities/sub-department.entity';
import { CreateDepartmentInput } from './dtos/create-department.input';
import { UpdateDepartmentInput } from './dtos/update-department.input';
import { CreateSubDepartmentInput } from './dtos/create-sub-department.input';

@Injectable()
export class DepartmentsService {
  findAll() {
      throw new Error('Method not implemented.');
  }
  findOne(id: number) {
      throw new Error('Method not implemented.');
  }
  create(createDepartmentInput: CreateDepartmentInput) {
      throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Department)
    private readonly departmentsRepository: Repository<Department>,

    @InjectRepository(SubDepartment)
    private readonly subDepartmentsRepository: Repository<SubDepartment>,
  ) {}

  // Create a new department, optionally with sub-departments
  async createDepartment(
    createDepartmentInput: CreateDepartmentInput,
    subDepartmentsInput?: CreateSubDepartmentInput[],
  ): Promise<Department> {
    const department = this.departmentsRepository.create(createDepartmentInput);

    // If sub-department data is provided, create sub-departments
    if (subDepartmentsInput && subDepartmentsInput.length > 0) {
      const subDepartments = subDepartmentsInput.map(subDept =>
        this.subDepartmentsRepository.create({ ...subDept, department }),
      );
      department.subDepartments = subDepartments;
    }

    return this.departmentsRepository.save(department);
  }

  // Update an existing department
  async updateDepartment(
    departmentId: number,
    updateDepartmentInput: UpdateDepartmentInput,
  ): Promise<Department> {
    const department = await this.departmentsRepository.findOne({
      where: { id: departmentId },
      relations: ['subDepartments'],
    });

    if (!department) {
      throw new NotFoundException(`Department with ID ${departmentId} not found`);
    }

    Object.assign(department, updateDepartmentInput);
    return this.departmentsRepository.save(department);
  }

  // Get department by ID with sub-departments
  async getDepartmentById(departmentId: number): Promise<Department> {
    const department = await this.departmentsRepository.findOne({
      where: { id: departmentId },
      relations: ['subDepartments'],
    });

    if (!department) {
      throw new NotFoundException(`Department with ID ${departmentId} not found`);
    }

    return department;
  }

  // Get all departments
  async getAllDepartments(): Promise<Department[]> {
    return this.departmentsRepository.find({
      relations: ['subDepartments'],
    });
  }

  // Delete department by ID
  async deleteDepartment(departmentId: number): Promise<void> {
    const department = await this.departmentsRepository.findOne({
      where: { id: departmentId },
      relations: ['subDepartments'],
    });

    if (!department) {
      throw new NotFoundException(`Department with ID ${departmentId} not found`);
    }

    // Delete sub-departments associated with the department
    if (department.subDepartments && department.subDepartments.length > 0) {
      await this.subDepartmentsRepository.remove(department.subDepartments);
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
}

