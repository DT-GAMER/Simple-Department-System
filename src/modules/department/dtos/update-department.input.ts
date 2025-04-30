import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsString, IsOptional, MinLength } from 'class-validator';
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
}
