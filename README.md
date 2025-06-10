# Graph Pathfinder

This project parses an XML-based directed graph and computes the shortest path between nodes.

> # Shortest Path Finder
A production-quality utility for finding the shortest path between two nodes in a directed graph defined in an XML file.

## Features

- Finds the shortest path between two named nodes in a network
- Returns the names and classifications of all nodes in the path
- Provides both a REST API and a CLI interface
- Includes caching for improved performance
- Comprehensive error handling and logging
- Well-tested with unit and integration tests

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Setup

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/prekshabhalani/graph-path-finder.git
   cd shortest-path-finder
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

## Usage

### REST API

1. Start the server:
   \`\`\`bash
   npm run start
   \`\`\`

2. Access the API at `http://localhost:3000`

3. API Endpoints:
   - `GET /graph/shortest-path?from=<node1>&to=<node2>` - Find shortest path between nodes
   - `GET /graph/nodes` - Get all nodes in the graph

4. Swagger documentation is available at `http://localhost:3000/docs`

### CLI

The CLI tool provides a simple way to find paths directly from the command line:

\`\`\`bash

# Make the CLI executable
chmod +x dist/cli.js

# Find path between two nodes
./dist/cli.js find-path --from "T/2345" --to "T/0032" --xml "src/assets/topology.xml"
\`\`\`

## Configuration

The application can be configured using environment variables:

- `PORT` - Server port (default: 3000)
- `TOPOLOGY_FILE_PATH` - Default path to the XML topology file
- `LOG_LEVEL` - Logging level (default: 'info')

Create a `.env` file in the root directory to set these variables.

## Testing

Run the test suite:

\`\`\`bash
# Unit tests
npm test

# Test coverage
npm run test:cov

# End-to-end tests
npm run test:e2e
\`\`\`

## Design Decisions

### Algorithm Choice

The application uses Breadth-First Search (BFS) to find the shortest path in terms of the number of edges. This is optimal for unweighted graphs where each edge has the same "cost".

### Performance Optimizations

1. **Caching**: The XML parser implements caching to avoid repeated parsing of the same file.
2. **Efficient Data Structures**: Using Maps for O(1) lookups of nodes and their connections.
3. **Early Termination**: The BFS algorithm stops as soon as the target node is found.

### Error Handling

Comprehensive error handling is implemented throughout the application:

- Input validation using class-validator
- Specific error types for different failure scenarios
- Detailed error messages for debugging
- Proper HTTP status codes for API responses

## Future Improvements

With more time, I would add:

1. 
2. More sophisticated caching with Redis
3. Performance benchmarks for large graph