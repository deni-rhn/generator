import { IsInt, Max, Min, IsOptional, IsBoolean } from 'class-validator';

export class GeneratePayloadDto {
  @IsInt()
  @Min(1)
  @Max(10_000)
  count!: number;

  // Optional: ensure unique nik/phone within the batch
  @IsOptional()
  @IsBoolean()
  unique?: boolean = false;

  @IsOptional()
  @IsBoolean()
  isHaveWalis?: boolean = false;
}