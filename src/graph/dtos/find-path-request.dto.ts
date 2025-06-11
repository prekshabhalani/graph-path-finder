import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator'
import { Transform } from 'class-transformer'

export class FindPathReqDto {
  @ApiProperty({
    description: "The key of the starting node",
    example: "T/2345",
    minLength: 1,
    maxLength: 100,
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  @Transform(({ value }) => value?.trim())
  from: string

  @ApiProperty({
    description: "The key of the ending node",
    example: "T/0032",
    minLength: 1,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  @Transform(({ value }) => value?.trim())
  to: string

  @ApiPropertyOptional({
    description: "Custom XML file path (optional)",
    example: "src/assets/topology.xml",
  })
  @IsOptional()
  @IsString()
  filePath?: string
}
