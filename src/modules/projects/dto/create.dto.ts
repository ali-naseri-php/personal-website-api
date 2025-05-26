import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  body!: string;

  @IsString()
  @IsNotEmpty()
  user_id!: string;
}
