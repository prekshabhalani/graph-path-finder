import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { XmlParserService } from '../shared/xml-parser/xml-parser.service';
import { PathfinderService } from '../shared/pathfinder/pathfinder.service';
import { NodeInfo } from './interfaces/node-info.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GraphService {
    private readonly logger = new Logger(GraphService.name);
    private readonly defaultFilePath: string

    constructor(
        private readonly xmlParserService: XmlParserService,
        private readonly pathfinderService: PathfinderService,
        private readonly configService: ConfigService
    ) {
        this.defaultFilePath = this.configService.get<string>("TOPOLOGY_FILE_PATH", "src/assets/topology.xml")
    }

    async getShortestPath(from: string, to: string, filePath?: string): Promise<NodeInfo[]> {
        try {
            const path = filePath || this.defaultFilePath
            this.logger.log(`Finding shortest path from ${from} to ${to} using file: ${path}`)

            const graph = this.xmlParserService.parseXml(path)
            this.pathfinderService.buildGraph(graph)

            return this.pathfinderService.findShortestPath(from, to)
        } catch (error) {
            this.logger.error(`Failed to get shortest path: ${error.message}`, error.stack)

            if (error.status) {
                throw error
            }

            throw new HttpException(
                error.message || "An error occurred while finding the path",
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            )
        }
    }
}
