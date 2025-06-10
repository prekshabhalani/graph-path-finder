import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class FindPathReqDto {
  @ApiProperty({
    description: "Starting node key",
    example: "T/2345",
  })

  @IsNotEmpty()
  @IsString()
  from: string

  @ApiProperty({
    description: "Ending node key",
    example: "T/0032",
  })

  @IsNotEmpty()
  @IsString()
  to: string

  @ApiPropertyOptional({
    description: "Custom XML file path (optional)",
    example: "src/assets/custom-topology.xml",
  })
  @IsOptional()
  @IsString()
  filePath?: string
}
