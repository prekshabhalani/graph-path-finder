import { Module } from '@nestjs/common';
import { GraphController } from './graph.controller';
import { GraphService } from './graph.service';
import { XmlParserService } from 'src/shared/xml-parser/xml-parser.service';
import { PathFinderService } from 'src/shared/pathfinder/pathfinder.service';

@Module({
  controllers: [GraphController],
  providers: [GraphService, XmlParserService, PathFinderService]
})
export class GraphModule { }
