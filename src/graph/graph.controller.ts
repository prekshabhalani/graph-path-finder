import { Controller, Get, Logger, Query } from '@nestjs/common';
import { GraphService } from './graph.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindPathReqDto } from './dtos/find-path-request.dto';
import { PathResponseDto } from './dtos/find-path-response.dto';

@ApiTags('Graph')
@Controller('graph')
export class GraphController {
    private readonly logger = new Logger(GraphController.name);

    constructor(private readonly graphService: GraphService) { }

    @Get('shortest-path')
    @ApiOperation({ summary: 'Get shortest path between two nodes' })
    @ApiResponse({ status: 200, description: 'Path found', type: PathResponseDto })
    @ApiResponse({ status: 400, description: 'Invalid input or nodes' })
    @ApiResponse({ status: 404, description: 'No path exists' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    @ApiQuery({ name: 'from', required: true })
    @ApiQuery({ name: 'to', required: true })

    getShortestPath(@Query() query: FindPathReqDto): PathResponseDto {
        const { from, to } = query;
        this.logger.log(`Received request: from=${from}, to=${to} -> Redirecting to service`);

        const path = this.graphService.getShortestPath(query.from, query.to);

        return {
            success: true,
            message: 'Path found',
            data: [path],
        };
    }
}