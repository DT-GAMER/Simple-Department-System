import { ObjectType, Field } from '@nestjs/graphql';
import { SubDepartmentResponseDto } from './sub-department-response.dto';

@ObjectType()
export class DepartmentResponseDto {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [SubDepartmentResponseDto], { nullable: true })
  subDepartments?: SubDepartmentResponseDto[];
}
