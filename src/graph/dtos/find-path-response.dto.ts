// DTO for standardized response

import { ApiProperty } from '@nestjs/swagger';

export class PathResponseDto {

    @ApiProperty({ example: true })
    success: boolean;

    @ApiProperty({ example: 'Path found' })
    message: string;

    @ApiProperty({ type: [String], description: 'Shortest path nodes' })
    data: string[];

}
