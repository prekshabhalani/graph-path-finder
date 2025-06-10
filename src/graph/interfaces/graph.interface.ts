//Graph adjacency-list interface

export interface Graph {
    [node: string]: string[]; // Node -> list of neighbors
}