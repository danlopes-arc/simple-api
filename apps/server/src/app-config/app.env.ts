import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class AppEnv {
  @IsNumberString()
  PORT!: number;

  @IsString()
  @IsNotEmpty()
  JWT_SECRET!: string;
}
