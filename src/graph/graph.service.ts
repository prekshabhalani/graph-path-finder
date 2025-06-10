import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { XmlParserService } from '../shared/xml-parser/xml-parser.service';
import { PathfinderService } from '../shared/pathfinder/pathfinder.service';


@Injectable()
export class GraphService {
    private readonly logger = new Logger(GraphService.name);
    constructor(
        private readonly xmlParserService: XmlParserService,
        private readonly pathfinderService: PathfinderService,
    ) {
    }

    async getShortestPath(from: string, to: string, filePath: string): Promise<any> {
        try {
            const graph = this.xmlParserService.parseXml(filePath);
            this.pathfinderService.buildGraph(graph);
            return this.pathfinderService.findShortestPath(from, to);
        } catch (error) {
            this.logger.error(`Failed to get shortest path: ${error}`);
            throw new HttpException(error.message, error.status);
        }
    }
}
