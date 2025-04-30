// src/departments/dtos/department-list-response.dto.ts
import { ObjectType, Field } from '@nestjs/graphql';
import { DepartmentResponseDto } from './department-response.dto';

@ObjectType()
export class DepartmentListResponse {
  @Field(() => [DepartmentResponseDto])
  departments: DepartmentResponseDto[];
}
