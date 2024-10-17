import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  readonly text: string;

  @IsPositive()
  @IsInt()
  @IsNumber()
  readonly fromId: number;

  @IsPositive()
  @IsInt()
  @IsNumber()
  readonly toId: number;
}
