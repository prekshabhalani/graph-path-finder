// DTO for standardized response

import { ApiProperty } from '@nestjs/swagger'

export class NodeInfoDto {
  @ApiProperty({
    description: "Node name/key",
    example: "T/2345",
  })
  name: string

  @ApiProperty({
    description: "Node classification",
    example: "Transceiver",
  })
  class: string
}

export class PathResponseDto {
  @ApiProperty({
    description: "Whether the operation was successful",
    example: true,
  })
  success: boolean

  @ApiProperty({
    description: "Response message",
    example: "Path found",
  })
  message: string

  @ApiProperty({
    description: "Path data with node information",
    type: [NodeInfoDto],
  })
  data: NodeInfoDto[]
}
