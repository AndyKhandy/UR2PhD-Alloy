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
```

**Backend** — run from `alloy-editor/backend/` (Maven not installed; use direct javac/java):

```powershell
& "C:\Program Files\Java\jdk-25\bin\javac.exe" -cp lib\alloy.jar -d target\classes src\main\java\AlloyAPI.java
& "C:\Program Files\Java\jdk-25\bin\java.exe" -cp "target\classes;lib\alloy.jar" AlloyAPI
```

## Architecture

### Frontend

```
alloy-editor/frontend/src/
  App.jsx                        # root — renders <BlocklyEditor />
  components/BlocklyEditor.jsx   # workspace, Generate/Clear buttons, <pre> output
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

### Backend

```
alloy-editor/backend/
  pom.xml                     # Maven project; alloy-dist:local dependency
  lib/alloy.jar               # Alloy distribution JAR (gitignored)
  src/main/java/AlloyAPI.java # entry point
```

**One-time JAR setup:** Download from [AlloyTools releases](https://github.com/AlloyTools/org.alloytools.alloy/releases), place at `lib/alloy.jar`.

**AlloyAPI.java flow:**
1. Set `model_text` to the Alloy source string
2. `CompUtil.parseEverything_fromString(rep, model_text)` → `CompModule`
3. `world.getAllCommands().get(cmdNum)` — selects which `run`/`check` command to execute
4. Configure `A4Options` with `PMaxSAT4JRef.INSTANCE` as the SAT solver
5. `TranslateAlloyToKodkod.execute_command(...)` → `A4Solution`
6. `System.out.println(instance)` — prints the found instance or counterexample

**Reading output:** INFO lines from Kodkod are solver noise (ignore them). The `---Trace---` section is the result — it shows atom sets for each signature and relation mappings. `State 0 (loop)` means a temporal model that stays in one state.

Spring Boot REST layer planned for a later phase, after standalone execution is proven.
