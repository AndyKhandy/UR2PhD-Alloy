# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A block-based visual editor for the [Alloy](https://alloytools.org/) formal modeling language. Users drag-and-drop blocks to build Alloy models; a code generator emits valid Alloy source. The Java backend executes models through the Alloy Analyzer.

## Commands

**Frontend** — run from `alloy-editor/frontend/`:

```bash
npm run dev       # Vite dev server (hot reload)
npm run build     # production build
npm run lint      # ESLint check
npm test          # run vitest (watch mode; pass `run` for a single pass, e.g. `npx vitest run`)
```

**Backend** — run from `alloy-editor/backend/`:

```powershell
mvn spring-boot:run    # starts Spring Boot on http://localhost:8080
```

**One-time Maven setup** (Maven installed at `C:\Users\andyt\apache-maven\apache-maven-3.9.6\`):
```powershell
# Register alloy.jar with Maven (run once after cloning):
mvn install:install-file -Dfile="C:\...\alloy-editor\backend\lib\alloy.jar" -DgroupId=org.alloytools -DartifactId=alloy-dist -Dversion=local -Dpackaging=jar -DgeneratePom=true
```

**Standalone (no Spring Boot)** — still works via `run.bat` or direct javac:
```powershell
& "C:\Program Files\Java\jdk-25\bin\javac.exe" -cp lib\alloy.jar -d target\classes src\main\java\Relation.java src\main\java\AlloyResult.java src\main\java\AlloyRunner.java src\main\java\AlloyAPI.java
& "C:\Program Files\Java\jdk-25\bin\java.exe" -cp "target\classes;lib\alloy.jar" AlloyAPI
```

### Frontend

```
alloy-editor/frontend/src/
  App.jsx                        # root — renders <BlocklyEditor />
  components/BlocklyEditor.jsx   # workspace, Generate/Clear buttons, <pre> output
  components/GraphPlane.jsx      # React Flow canvas; currently renders static placeholder nodes/edges, not yet wired to graphConverter output
  utils/graphConverter.js        # AlloyResult -> React Flow nodes/edges (see Graph conversion below)
  blockly/
    toolbox.js                   # sidebar category/block layout
    blocks/                      # block shape definitions per category
      signatures/  predFacts/  commands/  booleanOp/  compareOp/  binSetOp/  unSetOp/
    generators/
      alloy_generator.js         # singleton alloyGenerator instance
      signatures/  predFacts/  commands/  booleanOp/  compareOp/  binSetOp/  unSetOp/
```

**Data-flow:** `BlocklyEditor.jsx` injects Blockly → "Generate Alloy" calls `alloyGenerator.workspaceToCode(workspace)` → generator walks blocks and concatenates output → result shown in `<pre>`.

**Block/generator convention:** Every block `"alloy_X"` has a shape in `blocks/<category>/alloy_X.js` and a generator in `generators/<category>/alloy_X_G.js`, both imported via barrel files. Expression blocks return `[code, precedence]`; statement blocks return plain strings.

**`setCheck` types:** `"Relation"` (connects inside sig body), `"LogicalStatement"` (connects inside pred/fact body).

**Toolbox colors:** Signatures `#5C81A6` · Expressions/Sets `#00058C` · Boolean `#8C0000` · Pred/Facts `#B38E4F` · Commands `#3BA61B`.

**Graph conversion (`utils/graphConverter.js`):** turns an `AlloyResult` into React Flow's `{ nodes, edges }` shape.
- `convertToNodes(atoms)` — one node per atom, grouped by signature; `id` is the atom name (e.g. `"Person$0"`), `data.signature` is the owning signature name.
- `convertToEdges(relations)` — one edge per relation tuple; `id` is `` `${source}-${fieldName}-${target}` `` (must include `fieldName`, not just `source`/`target`, so two different fields linking the same atom pair don't collide), `label` is the field name.
- `getNodesAndEdges(alloyResult)` composes the two — **known bug:** it currently discards both functions' return values and its `satisfiable` check is inverted, so it always returns `null`; not yet wired into `GraphPlane.jsx`.
- Tests: `utils/graphConverter.test.js` (vitest) covers empty/single/multi-signature atoms and duplicate-field-same-atoms edge cases.

### Backend

```
alloy-editor/backend/
  pom.xml                              # Spring Boot 3.3.5 parent + spring-boot-starter-web
  lib/alloy.jar                        # Alloy distribution JAR (gitignored)
  run.bat                              # standalone compile/run (no Spring Boot)
  src/main/java/com/ur2phd/alloy/
    AlloyApplication.java              # @SpringBootApplication entry point
    AlloyController.java               # @RestController: POST /run-model
    ModelRequest.java                  # request DTO: { modelText }
    AlloyRunner.java                   # @Service: parses and executes Alloy models
    AlloyResult.java                   # result DTO: { satisfiable, atoms, relations }
    Relation.java                      # immutable tuple: fieldName, source, target
```

**One-time JAR setup:** Download from [AlloyTools releases](https://github.com/AlloyTools/org.alloytools.alloy/releases), place at `lib/alloy.jar`, then run the Maven install command above.

**REST endpoint:** `POST http://localhost:8080/run-model`
- Request body: `{ "modelText": "sig Person {} run { some Person } for 3" }`
- Response: `{ "satisfiable": true, "atoms": { "this/Person": ["Person$0", "Person$1"] }, "relations": [{ "fieldName": "friends", "source": "Person$0", "target": "Person$1" }] }`

**AlloyRunner flow:**
1. `CompUtil.parseEverything_fromString(reporter, modelText)` → `CompModule`
2. `world.getAllCommands().get(commandIndex)` — selects which `run`/`check` command
3. Configure `A4Options` with `PMaxSAT4JRef.INSTANCE` as the SAT solver
4. `TranslateAlloyToKodkod.execute_command(...)` → `A4Solution`
5. Walk user-defined sigs → collect atoms into `Map<String, List<String>>` and relation tuples into `List<Relation>`
6. Return `AlloyResult` — serialized to JSON by Jackson automatically

**CORS:** `@CrossOrigin(origins = "http://localhost:5173")` on `AlloyController` allows the Vite dev server to call the backend.
