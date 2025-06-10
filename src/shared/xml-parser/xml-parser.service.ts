import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs';
import { XMLParser } from 'fast-xml-parser';

export interface ParsedGraph {
  nodes: { key: string; class: string }[];
  edges: { from: string; to: string }[];
}

@Injectable()
export class XmlParserService {

  
  parseXml(filePath: string): ParsedGraph {
    try {
      const xml = fs.readFileSync(filePath, 'utf-8');
      const parser = new XMLParser({ ignoreAttributes: false });
      const parsed = parser.parse(xml);

      const topology = parsed.topology;
      const nodes: { key: string; class: string }[] = [];
      const edges: { from: string; to: string }[] = [];

      const classes = topology.entities.class;
      for (const cls of Array.isArray(classes) ? classes : [classes]) {
        const className = cls['@_key'];
        const entities = cls.entity;
        const entityList = Array.isArray(entities) ? entities : [entities];
        for (const entity of entityList) {
          nodes.push({ key: entity['@_key'], class: className });
        }
      }

      const associations = topology.associations?.association ?? [];
      for (const assoc of Array.isArray(associations) ? associations : [associations]) {
        edges.push({
          from: assoc['@_primary'],
          to: assoc['@_secondary'],
        });
      }

      return { nodes, edges };
    } catch (error) {
      console.error('[XmlParserService] Error parsing XML:', error);
      throw new InternalServerErrorException('Failed to parse topology XML');
    }
  }
}
