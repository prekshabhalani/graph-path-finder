import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import * as fs from 'fs';
import { XMLParser } from 'fast-xml-parser';

export interface ParsedGraph {
  nodes: { key: string; class: string }[];
  edges: { from: string; to: string }[];
}

@Injectable()
export class XmlParserService {
  private readonly logger = new Logger(XmlParserService.name)
  private readonly parser: XMLParser

  private cache = new Map<string, { data: ParsedGraph; timestamp: number }>()
  private readonly DEFAULT_TTL = 5 * 60 * 1000 // 5 minutes

  constructor() {
    this.parser = new XMLParser({
      ignoreAttributes: false,
    })
    this.logger.debug('XmlParserService initialized')
  }

  parseXml(filePath: string): ParsedGraph {
    try {
      // Check cache first
      const cachedGraph = this.getCached(filePath)
      if (cachedGraph) {
        this.logger.debug(`Using cached graph for ${filePath}`)
        return cachedGraph
      }

      this.logger.debug(`Parsing XML file: ${filePath}`)

      if (!fs.existsSync(filePath)) {
        throw new InternalServerErrorException(`File not found: ${filePath}`)
      }

      const xml = fs.readFileSync(filePath, 'utf-8')
      const parsed = this.parser.parse(xml)

      if (!parsed.topology) {
        throw new InternalServerErrorException('Invalid XML: Missing topology element')
      }

      const topology = parsed.topology;
      const nodes: { key: string; class: string }[] = [];
      const edges: { from: string; to: string }[] = [];

      // Parse nodes
      if (topology.entities && topology.entities.class) {
        const classes = Array.isArray(topology.entities.class) ? topology.entities.class : [topology.entities.class]

        for (const cls of classes) {
          const className = cls['@_key']
          if (cls.entity) {
            const entityList = Array.isArray(cls.entity) ? cls.entity : [cls.entity]
            for (const entity of entityList) {
              nodes.push({ key: entity['@_key'], class: className })
            }
          }
        }
      }

      // Parse edges
      if (topology.associations && topology.associations.association) {
        const associations = Array.isArray(topology.associations.association)
          ? topology.associations.association
          : [topology.associations.association]

        for (const assoc of associations) {
          edges.push({
            from: assoc['@_primary'],
            to: assoc['@_secondary'],
          });
        }
      }

      const result = { nodes, edges }
      
      this.setCached(filePath, result)

      this.logger.debug(`Successfully parsed ${nodes.length} nodes and ${edges.length} edges`)
      return result
    } catch (error) {
      this.logger.error(`Error parsing XML: ${error.message}`, error.stack)
      throw new InternalServerErrorException(`Failed to parse topology XML: ${error.message}`)
    }
  }

  private getCached(key: string): ParsedGraph | undefined {
    const item = this.cache.get(key)
    if (!item) return undefined

    if (Date.now() > item.timestamp) {
      this.cache.delete(key)
      return undefined
    }

    return item.data
  }

  private setCached(key: string, data: ParsedGraph): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now() + this.DEFAULT_TTL,
    })
  }
}
