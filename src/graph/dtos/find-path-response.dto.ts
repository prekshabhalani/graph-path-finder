// DTO for standardized response

import { ApiProperty } from '@nestjs/swagger'

export class PathNodeDto {
  @ApiProperty({
    description: "The unique key of the node",
    example: "T/2345",
  })
  key: string

  @ApiProperty({
    description: "The classification/class of the node",
    example: "Transceiver",
  })
  classification: string
}

export class PathResponseDto {
  @ApiProperty({
    description: "Whether a path was found between the nodes",
    example: true,
  })
  pathFound: boolean

  @ApiProperty({
    description: "The starting node key",
    example: "T/2345",
  })
  startNode: string

  @ApiProperty({
    description: "The ending node key",
    example: "T/0031",
  })
  endNode: string

  @ApiProperty({
    description: "The length of the shortest path (number of nodes)",
    example: 5,
    minimum: 0,
  })
  pathLength: number

  @ApiProperty({
    description: "The nodes in the shortest path from start to end",
    type: [PathNodeDto],
    example: [
      { key: "T/2345", classification: "Transceiver" },
      { key: "Bartrum-X5", classification: "Link" },
      { key: "M60", classification: "Fibre" },
      { key: "Matfold-A4", classification: "Link" },
      { key: "T/0031", classification: "Transceiver" },
    ],
  })
  path: PathNodeDto[]

  @ApiProperty({
    description: "Additional message or error details",
    example: "Shortest path found successfully",
  })
  message: string

  @ApiProperty({
    description: "Processing time in milliseconds",
    example: 15.5,
    required: false,
  })
  processingTimeMs?: number
}
