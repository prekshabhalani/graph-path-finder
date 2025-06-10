import { Injectable, Logger } from '@nestjs/common';
import { XmlParserService } from '../shared/xml-parser/xml-parser.service';
import { PathFinderService } from '../shared/pathfinder/pathfinder.service';


@Injectable()
export class GraphService {
    private readonly logger = new Logger(GraphService.name);
    constructor(
        private readonly xmlParserService: XmlParserService,
        private readonly pathFinderService: PathFinderService,
    ) {
    }

    getShortestPath(from: string, to: string) {
        
        let file = ""
        const parsedXML = this.xmlParserService.parse(file);
        const path = this.pathFinderService.findPath(parsedXML, from, to);

        return path
    }
}
