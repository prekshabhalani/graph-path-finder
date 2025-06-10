import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { ParsedGraph } from '../xml-parser/xml-parser.service';
import { NodeInfo } from './interfaces/node-info.interface';

@Injectable()
export class PathfinderService {
  private readonly logger = new Logger(PathfinderService.name)
  private adjacencyList = new Map<string, string[]>();
  private nodeInfoMap = new Map<string, string>();
  private graphBuilt = false

  constructor() {
    this.logger.debug('PathfinderService initialized')
  }

  buildGraph({ nodes, edges }: ParsedGraph): void {
    this.logger.debug('Building graph from parsed XML data')
    this.adjacencyList.clear();
    this.nodeInfoMap.clear();

    // Initialize nodes
    for (const { key, class: nodeClass } of nodes) {
      this.nodeInfoMap.set(key, nodeClass);
      this.adjacencyList.set(key, []);
    }

    // Add edges
    for (const { from, to } of edges) {
      if (this.adjacencyList.has(from)) {
        this.adjacencyList.get(from)?.push(to)
      } else {
        this.logger.warn(`Edge references non-existent node: ${from}`)
      }
    }

    this.graphBuilt = true
    this.logger.debug(`Graph built with ${nodes.length} nodes and ${edges.length} edges`)
  }

  findShortestPath(start: string, end: string): NodeInfo[] {
    if (!this.graphBuilt) {
      throw new Error('Graph has not been built yet')
    }

    this.validateNodes(start, end);
    // Use BFS to find shortest path
    const visited = new Set<string>();
    const queue: string[][] = [[start]];
    visited.add(start);

    while (queue.length > 0) {
      const path = queue.shift()!;
      const currentNode = path[path.length - 1];

      if (currentNode === end) {
        this.logger.debug(`Path found from ${start} to ${end} with ${path.length - 1} steps`)
        return path.map((node) => ({
          name: node,
          class: this.nodeInfoMap.get(node) || 'unknown',
        }));
      }

      for (const neighbor of this.adjacencyList.get(currentNode) || []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push([...path, neighbor]);
        }
      }
    }

    throw new NotFoundException(`No path exists from '${start}' to '${end}'`)
  }

  private validateNodes(start: string, end: string): void {
    if (!this.adjacencyList.has(start)) {
      this.logger.error(`Start node '${start}' not found in graph`)
      throw new NotFoundException(`Start node '${start}' not found`)
    }
    if (!this.adjacencyList.has(end)) {
      this.logger.error(`End node '${end}' not found in graph`)
      throw new NotFoundException(`End node '${end}' not found`)
    }
  }

}
