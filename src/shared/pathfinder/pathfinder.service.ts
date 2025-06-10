import { Injectable, NotFoundException } from '@nestjs/common';
import { ParsedGraph } from '../xml-parser/xml-parser.service';

@Injectable()
export class PathfinderService {
  private adjacencyList = new Map<string, string[]>();
  private nodeInfoMap = new Map<string, string>();

  buildGraph({ nodes, edges }: ParsedGraph) {
    this.adjacencyList.clear();
    this.nodeInfoMap.clear();

    for (const { key, class: nodeClass } of nodes) {
      this.nodeInfoMap.set(key, nodeClass);
      this.adjacencyList.set(key, []);
    }

    for (const { from, to } of edges) {
      if (this.adjacencyList.has(from)) {
        this.adjacencyList.get(from)?.push(to);
      }
    }
  }

  findShortestPath(start: string, end: string) {
    if (!this.adjacencyList.has(start)) {
      throw new NotFoundException(`Start node '${start}' not found`);
    }
    if (!this.adjacencyList.has(end)) {
      throw new NotFoundException(`End node '${end}' not found`);
    }

    const visited = new Set<string>();
    const queue: string[][] = [[start]];

    while (queue.length > 0) {
      const path = queue.shift()!;
      const lastNode = path[path.length - 1];

      if (lastNode === end) {
        return path.map((node) => ({
          name: node,
          class: this.nodeInfoMap.get(node),
        }));
      }

      for (const neighbor of this.adjacencyList.get(lastNode) ?? []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push([...path, neighbor]);
        }
      }
    }

    throw new NotFoundException(`No path found from '${start}' to '${end}'`);
  }
  
}