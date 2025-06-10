export interface Entity {
  key: string
}

export interface EntityClass {
  key: string
  entities: Entity[]
}

export interface Association {
  primary: string
  secondary: string
}

export interface Topology {
  entities: EntityClass[]
  associations: Association[]
}

export interface GraphNode {
  key: string
  classification: string
  neighbors: string[]
}

export interface Graph {
  nodes: Map<string, GraphNode>
  adjacencyList: Map<string, string[]>
}

export interface ParsedXmlTopology {
  topology: {
    entities: {
      class:
        | Array<{
            key: string
            entity: Array<{ key: string }> | { key: string }
          }>
        | {
            key: string
            entity: Array<{ key: string }> | { key: string }
          }
    }
    associations?: {
      association:
        | Array<{
            primary: string
            secondary: string
          }>
        | {
            primary: string
            secondary: string
          }
    }
  }
}
