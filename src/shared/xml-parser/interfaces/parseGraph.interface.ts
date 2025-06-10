export interface ParsedGraph {
  nodes: { key: string; class: string }[];
  edges: { from: string; to: string }[];
}