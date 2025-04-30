import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentInput } from './dtos/create-department.input';
import { UpdateDepartmentInput } from './dtos/update-department.input';
import { DepartmentResponseDto } from './dtos/department-response.dto';
import { SubDepartmentResponseDto } from './dtos/sub-department-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { NotFoundException, UseGuards } from '@nestjs/common';

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
      subDepartments: department.subDepartments?.map(this.toSubDepartmentDto),
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
  async getDepartmentById(@Args('id') id: number): Promise<DepartmentResponseDto> {
    const department = await this.departmentsService.getDepartmentById(id);
    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
    return this.toDepartmentDto(department);
  }

  @Mutation(() => DepartmentResponseDto, { name: 'createDepartment' })
  @UseGuards(JwtAuthGuard)
  async createDepartment(
    @Args('createDepartmentInput') createDepartmentInput: CreateDepartmentInput,
  ): Promise<DepartmentResponseDto> {
    const department = await this.departmentsService.createDepartment(createDepartmentInput);
    return this.toDepartmentDto(department);
  }

  @Mutation(() => DepartmentResponseDto, { name: 'updateDepartment' })
  @UseGuards(JwtAuthGuard)
  async updateDepartment(
    @Args('id') id: number,
    @Args('updateDepartmentInput') updateDepartmentInput: UpdateDepartmentInput,
  ): Promise<DepartmentResponseDto> {
    const department = await this.departmentsService.updateDepartment(id, updateDepartmentInput);
    return this.toDepartmentDto(department);
  }

  @Mutation(() => Boolean, { name: 'deleteDepartment' })
  @UseGuards(JwtAuthGuard)
  async deleteDepartment(@Args('id') id: number): Promise<boolean> {
    await this.departmentsService.deleteDepartment(id);
    return true;
  }
}
