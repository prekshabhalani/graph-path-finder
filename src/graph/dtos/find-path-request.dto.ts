// DTO for query params
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FindPathReqDto {

    @ApiProperty({ description: 'Source node ID' })
    @IsString()
    @IsNotEmpty()
    from: string;

    @ApiProperty({ description: 'Destination node ID' })
    @IsString()
    @IsNotEmpty()
    to: string;
}
