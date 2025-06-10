import { Module } from '@nestjs/common';
import { GraphController } from './graph.controller';
import { GraphService } from './graph.service';
import { XmlParserService } from '../shared/xml-parser/xml-parser.service';
import { PathfinderService } from '../shared/pathfinder/pathfinder.service';

@Module({
  controllers: [GraphController],
  providers: [GraphService, XmlParserService, PathfinderService]
})
export class GraphModule { }
