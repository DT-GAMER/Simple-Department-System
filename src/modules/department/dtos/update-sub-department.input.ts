// src/departments/dtos/update-sub-department.input.ts
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateSubDepartmentInput {
  @Field({ nullable: true })
  name?: string;
}
