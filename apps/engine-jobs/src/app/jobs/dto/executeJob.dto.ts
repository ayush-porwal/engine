import JSON from 'graphql-type-json';
import { IsNotEmpty, IsObject } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ExecuteJobInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field(() => JSON)
  @IsObject()
  @IsNotEmpty()
  data: object | object[];
}
