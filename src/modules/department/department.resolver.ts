import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentInput } from './dtos/create-department.input';
import { UpdateDepartmentInput } from './dtos/update-department.input';
import { CreateSubDepartmentInput } from './dtos/create-sub-department.input';
import { DepartmentResponseDto } from './dtos/department-response.dto';
import { SubDepartmentResponseDto } from './dtos/sub-department-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { DeleteResult } from 'typeorm';

@Resolver(() => DepartmentResponseDto)
export class DepartmentsResolver {
  constructor(private readonly departmentsService: DepartmentsService) {}

  private toSubDepartmentDto(subDept): SubDepartmentResponseDto {
    return {
      id: subDept.id,
      name: subDept.name,
      departmentId: subDept.department?.id ?? null,
      createdAt: subDept.createdAt,
      updatedAt: subDept.updatedAt,
    };
  }

  private toDepartmentDto(department): DepartmentResponseDto {
    return {
      id: department.id,
      name: department.name,
      createdAt: department.createdAt,
      updatedAt: department.updatedAt,
      subDepartments: department.subDepartments?.map(this.toSubDepartmentDto.bind(this)),
    };
  }

  @Query(() => [DepartmentResponseDto], { name: 'departments' })
  @UseGuards(JwtAuthGuard)
  async getAllDepartments(): Promise<DepartmentResponseDto[]> {
    const departments = await this.departmentsService.getAllDepartments();
    return departments.map(this.toDepartmentDto.bind(this));
  }

  @Query(() => DepartmentResponseDto, { name: 'department' })
  @UseGuards(JwtAuthGuard)
  async getDepartmentById(@Args('id', { type: () => Int }) id: number): Promise<DepartmentResponseDto> {
    const department = await this.departmentsService.getDepartmentById(id);
    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
    return this.toDepartmentDto(department);
  }

  @Mutation(() => DepartmentResponseDto, { name: 'createDepartment' })
  @UseGuards(JwtAuthGuard)
  async createDepartment(
    @Args('createDepartmentInput', { type: () => CreateDepartmentInput }) createDepartmentInput: CreateDepartmentInput,
    @Args('subDepartmentsInput', { type: () => [CreateSubDepartmentInput], nullable: true }) subDepartmentsInput?: CreateSubDepartmentInput[],
  ): Promise<DepartmentResponseDto> {
    const department = await this.departmentsService.createDepartment(createDepartmentInput, subDepartmentsInput);
    return this.toDepartmentDto(department);
  }

  @Mutation(() => DepartmentResponseDto, { name: 'updateDepartment' })
  @UseGuards(JwtAuthGuard)
  async updateDepartment(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateDepartmentInput', { type: () => UpdateDepartmentInput }) updateDepartmentInput: UpdateDepartmentInput,
  ): Promise<DepartmentResponseDto> {
    const department = await this.departmentsService.updateDepartment(id, updateDepartmentInput);
    return this.toDepartmentDto(department);
  }

  @Mutation(() => Boolean, { name: 'deleteDepartment' })
  @UseGuards(JwtAuthGuard)
  async deleteDepartment(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    await this.departmentsService.deleteDepartment(id);
    return true;
  }

  @Mutation(() => DepartmentResponseDto, { name: 'addSubDepartmentsToExistingDepartment' })
  @UseGuards(JwtAuthGuard)
  async addSubDepartmentsToExistingDepartment(
    @Args('departmentId', { type: () => Int }) departmentId: number,
    @Args('subDepartments', { type: () => [CreateSubDepartmentInput] }) subDepartments: CreateSubDepartmentInput[],
  ): Promise<DepartmentResponseDto> {
    const department = await this.departmentsService.addSubDepartmentsToExistingDepartment(departmentId, subDepartments);
    if (!department) {
      throw new NotFoundException(`Department with ID ${departmentId} not found`);
    }
    return this.toDepartmentDto(department);
  }


  @Mutation(() => Boolean, { name: 'deleteSubDepartment' })
  @UseGuards(JwtAuthGuard)
  async deleteSubDepartment(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    const result: DeleteResult = await this.departmentsService.deleteSubDepartment(id);
    return result.affected > 0;
  }
}