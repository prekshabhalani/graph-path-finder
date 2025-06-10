//# DTO for path array (Swagger)

import { ApiProperty } from '@nestjs/swagger';

export class PathResultDto {

    @ApiProperty({
        type: [String], description:
            'Sequence of nodes in shortest path'
    })
    path: string[];

}
