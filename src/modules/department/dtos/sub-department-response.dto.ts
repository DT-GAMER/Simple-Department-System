import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SubDepartmentResponseDto {
  @Field()
  id: number;

  @Field()
  name: string;


  @Field()
  departmentId: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
