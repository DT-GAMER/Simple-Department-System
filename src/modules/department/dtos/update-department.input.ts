import { InputType, Field, PartialType, Int } from '@nestjs/graphql';
import { IsString, IsOptional, MinLength, IsArray, ArrayNotEmpty, IsInt } from 'class-validator';
import { CreateDepartmentInput } from './create-department.input';
import { CreateSubDepartmentInput } from './create-sub-department.input';

@InputType()
export class UpdateDepartmentInput extends PartialType(CreateDepartmentInput) {
  @Field()
  @IsString()
  @MinLength(2)
  @IsOptional()
  name?: string;

  @Field(() => [CreateSubDepartmentInput], { nullable: true })
  @IsOptional()
  subDepartments?: CreateSubDepartmentInput[];

  @Field(() => [Int], { nullable: true, description: 'IDs of sub-departments to remove' })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  removeSubDepartmentIds?: number[];
}

