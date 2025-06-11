```markdown
# 🔗 Graph Shortest Pathfinder

A production-quality utility to compute the **shortest path between two nodes** in a directed graph, defined via an XML topology file.

🌍 **Live Deployment**: [API Docs on Render](https://graph-path-finder.onrender.com/api/docs)

---

## 🚀 Features

* 🔍  **Shortest Path Finder**: BFS-based routing between two named nodes
* 📜  **Node Classification Output**: Returns node names and classifications in the result
* 🌐 **Dual Interface**: REST API & CLI tool
* ⚡ **In-Memory Caching**: Fast repeat queries by avoiding re-parsing
* 🛡️ **Robust Error Handling & Logging**: Structured exceptions and logging using NestJS best practices.
* 🧪 **Test-Ready Architecture** : Designed for unit and E2E testability
* 📦 **Production-Ready & Scalable**: Ready for integration and scaling

---

## 📁 Project Structure

```bash
graph-path-finder/
├── src/
│   ├── assets/               # XML topology files (example + XSD)
│   ├── graph/
│   │   ├── dtos/             # Request/response DTOs
│   │   ├── interfaces/            
│   │   ├── graph.controller.ts
│   │   ├── graph.module.ts
│   │   └── graph.service.ts
│   ├── shared/
│   │   ├── pathfinder/
│   │   │   ├── interfaces/            
│   │   │   └── pathfinder.service.ts
│   │   ├── xml-parser/
│   │   │   ├── interfaces/            
│   │   │   └── xml-parser.service.ts
│   │   └── catch/
│   │       └── catch.service.ts
│   ├── app.module.ts         # Root NestJS module
│   └── main.ts               # Application entry point
├── test/                     # Placeholder for E2E and integration tests
├── dist/                     # Compiled CLI/REST output
├── cli.ts                    # Command-line interface entry point
├── .env.example              # Example environment configuration
├── .eslintrc.js              # Linting rules
├── .prettierrc               # Formatting rules
├── package.json              # Project metadata and scripts
└── README.md                 # Project documentation
````

---

## 🛠️ Installation

### Prerequisites

* Node.js (v16 or above)
* npm or yarn

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/prekshabhalani/graph-path-finder.git
   cd graph-path-finder
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

---

## 🌐 REST API Usage

1. **Start the server**

   ```bash
   npm run start
   ```

2. **Access the API**

   * Base URL: `http://localhost:3000`
   * Swagger Docs: `http://localhost:3000/api/docs`

🌍 Live Swagger Docs: https://graph-path-finder.onrender.com/api/docs

3. **Endpoint**

   ```
   GET /api/v1/graph/shortest-path?from=<node1>&to=<node2>
   ```

---

## 🖥️ CLI Usage

1. **Make the CLI executable**

   ```bash
   chmod +x dist/cli.js
   ```

2. **Run the pathfinder via CLI**

   ```bash
   ./dist/cli.js find-path --from "T/2345" --to "T/0032" --xml "src/assets/topology.xml"
   ```

3. **Optional: Output in JSON format**

   ```bash
   ./dist/cli.js find-path --from "T/2345" --to "T/0032" --xml "src/assets/topology.xml" --json
   ```

---

## ⚙️ Configuration

Environment variables can be set in a `.env` file (based on `.env.example`):

| Variable             | Description               | Default     |
| -------------------- | ------------------------- | ----------- |
| `PORT`               | Port for REST server      | `3000`      |
| `TOPOLOGY_FILE_PATH` | Path to XML topology file | Custom path |

Example `.env`:

```env
PORT=3000
TOPOLOGY_FILE_PATH=src/assets/topology.xml
```

---

## 📐 Algorithm Design

* **Algorithm**: Breadth-First Search (BFS)
* **Why BFS?**: Ideal for **unweighted graphs** where shortest path is based on edge count.

---

## ⚡ Performance Optimizations

* 🧠 **Caching**: Avoids repeated parsing of the same XML file
* 🔗 **Efficient Graph Lookup**: Uses `Map` for O(1) access
* 🛑 **Early Exit**: BFS terminates as soon as destination is found

---

## 🚨 Error Handling

* ✅ Input validation via `class-validator`
* ✅ Clear and categorized exception types (`HttpException`, `NotFoundException`, etc.)
* ✅ Descriptive error messages for debugging
* ✅ Proper HTTP status codes and Swagger docs for all routes

---

## ✅ Testing

> 📌 *Note: Testing setup is planned, not yet implemented.*

### 🧪 Planned Test Roadmap

- [ ] Unit tests for:
  - BFS logic
  - XML parsing
  - Path validation
- [ ] E2E tests for:
  - API route `/shortest-path`
  - CLI commands
- [ ] Coverage reports via Jest
- [ ] CI integration (e.g., GitHub Actions)

**Future Setup:**

```bash
# Unit tests
npm run test

# Watch mode
npm run test:watch

# Test coverage
npm run test:cov

# E2E tests
npm run test:e2e
```

**Directory Plan:**

* `*.spec.ts` - Unit tests near core services
* `test/app.e2e-spec.ts` - End-to-end integration testing

---

## 🔮 Future Enhancements

Planned upgrades for production environments:

* ⏳ **Rate Limiting & Auth**: Protect APIs from abuse
* 🧊 **Redis Caching**: Persistent and distributed cache layer
* 📊 **Benchmarking**: Test performance on large graphs
* 🧭 **Weighted Graph Support**: Add Dijkstra's Algorithm
* ✅ **Full Testing Coverage**: Unit + E2E tests with CI integration
* 📡 **Kafka & DB Support**: For scalable data ingestion & persistence
* 🐳 **Docker Support**: Containerization for easier deployment
* 📈 **Monitoring & Metrics**: Observability with Prometheus/Grafana

---

## 🤝 Contributing

1. Fork the repository
2. Create your branch: `git checkout -b feature/xyz`
3. Commit your changes: `git commit -am 'Add xyz'`
4. Push to the branch: `git push origin feature/xyz`
5. Submit a pull request 🎉


```
