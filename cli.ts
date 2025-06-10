#!/usr/bin/env node
import { Command } from "commander"
import * as fs from "fs"
import { XMLParser } from "fast-xml-parser"

// Simple CLI version of the pathfinder
const program = new Command()

interface Node {
  key: string
  class: string
}

interface Edge {
  from: string
  to: string
}

interface Graph {
  nodes: Map<string, string>
  adjacencyList: Map<string, string[]>
}

// Parse XML file
function parseXmlFile(filePath: string): Graph {
  try {
    if (!fs.existsSync(filePath)) {
      console.error(`Error: File not found: ${filePath}`)
      process.exit(1)
    }

    const xml = fs.readFileSync(filePath, "utf-8")
    const parser = new XMLParser({ ignoreAttributes: false })
    const parsed = parser.parse(xml)

    if (!parsed.topology) {
      console.error("Error: Invalid XML: Missing topology element")
      process.exit(1)
    }

    const nodes = new Map<string, string>()
    const adjacencyList = new Map<string, string[]>()

    // Parse nodes
    if (parsed.topology.entities && parsed.topology.entities.class) {
      const classes = Array.isArray(parsed.topology.entities.class)
        ? parsed.topology.entities.class
        : [parsed.topology.entities.class]

      for (const cls of classes) {
        const className = cls["@_key"]
        const entities = Array.isArray(cls.entity) ? cls.entity : [cls.entity]

        for (const entity of entities) {
          const key = entity["@_key"]
          nodes.set(key, className)
          adjacencyList.set(key, [])
        }
      }
    }

    // Parse edges
    if (parsed.topology.associations && parsed.topology.associations.association) {
      const associations = Array.isArray(parsed.topology.associations.association)
        ? parsed.topology.associations.association
        : [parsed.topology.associations.association]

      for (const assoc of associations) {
        const from = assoc["@_primary"]
        const to = assoc["@_secondary"]

        if (adjacencyList.has(from)) {
          adjacencyList.get(from)?.push(to)
        }
      }
    }

    return { nodes, adjacencyList }
  } catch (error) {
    console.error(`Error parsing XML: ${error.message}`)
    process.exit(1)
  }
}

// Find shortest path using BFS
function findShortestPath(graph: Graph, start: string, end: string): Node[] {
  if (!graph.adjacencyList.has(start)) {
    console.error(`Error: Start node '${start}' not found`)
    process.exit(1)
  }

  if (!graph.adjacencyList.has(end)) {
    console.error(`Error: End node '${end}' not found`)
    process.exit(1)
  }

  const visited = new Set<string>()
  const queue: string[][] = [[start]]
  visited.add(start)

  while (queue.length > 0) {
    const path = queue.shift()!
    const currentNode = path[path.length - 1]

    if (currentNode === end) {
      return path.map((node) => ({
        key: node,
        class: graph.nodes.get(node) || "unknown",
      }))
    }

    for (const neighbor of graph.adjacencyList.get(currentNode) || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor)
        queue.push([...path, neighbor])
      }
    }
  }

  console.error(`Error: No path exists from '${start}' to '${end}'`)
  process.exit(1)
}

program.name("pathfinder").description("Find shortest path between two nodes in a directed graph").version("1.0.0")

program
  .command("find-path")
  .description("Find shortest path between two nodes")
  .requiredOption("-f, --from <node>", "Starting node key")
  .requiredOption("-t, --to <node>", "Ending node key")
  .requiredOption("-x, --xml <file>", "Path to XML file")
  .action((options) => {
    try {
      const graph = parseXmlFile(options.xml)
      const path = findShortestPath(graph, options.from, options.to)

      console.log("\nShortest path found:")
      console.log("-------------------")
      path.forEach((node, index) => {
        console.log(`${index + 1}. ${node.key} (${node.class})`)
      })
      console.log(`\nTotal steps: ${path.length - 1}`)
    } catch (error) {
      console.error(`Error: ${error.message}`)
      process.exit(1)
    }
  })

program.parse(process.argv)
