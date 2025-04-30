import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsArray, ArrayMinSize, MinLength, IsOptional, IsNotEmpty } from 'class-validator';
import { CreateSubDepartmentInput } from './create-sub-department.input';

@InputType()
export class CreateDepartmentInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @Field(() => [CreateSubDepartmentInput], { nullable: true })
  @IsArray()
  @ArrayMinSize(1)
  @IsOptional()
  subDepartments?: CreateSubDepartmentInput[];
}
