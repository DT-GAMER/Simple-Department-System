import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { SubDepartment } from './sub-department.entity';

@ObjectType()
@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @Field()
  name: string;

  @Column({ type: 'text', nullable: true })
  @Field({ nullable: true })
  description?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  @Field()
  updatedAt: Date;

  @OneToMany(() => SubDepartment, (subDepartment) => subDepartment.department, {
    cascade: true,
  })
  @Field(() => [SubDepartment], { nullable: true })
  subDepartments?: SubDepartment[];
}
