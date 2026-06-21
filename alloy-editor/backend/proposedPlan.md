# Proposed Refactor: AlloyAPI → Reusable Classes

## Context

AlloyAPI.java currently puts everything in `main()` — parsing, execution, result extraction, and printing. Before adding a Spring Boot REST layer, the goal is to extract that logic into three reusable classes (`AlloyRunner`, `AlloyResult`, `Relation`) so that `AlloyAPI.main()` becomes a thin driver and the execution logic is testable and independently composable.

---

## Files to Create / Modify

```
alloy-editor/backend/src/main/java/
    Relation.java       ← NEW
    AlloyResult.java    ← NEW
    AlloyRunner.java    ← NEW
    AlloyAPI.java       ← REPLACE content (thin driver only)

alloy-editor/backend/run.bat    ← UPDATE src list
CLAUDE.md                       ← UPDATE javac command
```

No package declarations anywhere — matches existing convention.

---

## Class Designs

### `Relation.java`
Pure data, immutable, no Alloy imports.

```java
public class Relation {
    private final String fieldName;   // e.g. "friends"
    private final String source;      // e.g. "Person$0"
    private final String target;      // e.g. "Person$1"

    public Relation(String fieldName, String source, String target) { ... }
    public String getFieldName() { ... }
    public String getSource()    { ... }
    public String getTarget()    { ... }

    @Override
    public String toString() {
        return fieldName + ": " + source + " -> " + target;
    }
}
```

`fieldName` is added beyond the backendNext.md proposal because a flat `{source, target}` pair loses which field the link came from — needed for frontend visualization and future JSON serialization.

---

### `AlloyResult.java`
Pure data, immutable, no Alloy imports.

```java
import java.util.List;
import java.util.Map;

public class AlloyResult {
    private final boolean satisfiable;
    private final Map<String, List<String>> atoms;   // sig label -> atom list
    private final List<Relation> relations;

    public AlloyResult(boolean satisfiable,
                       Map<String, List<String>> atoms,
                       List<Relation> relations) { ... }

    public boolean isSatisfiable()               { ... }
    public Map<String, List<String>> getAtoms()  { ... }
    public List<Relation> getRelations()         { ... }

    @Override
    public String toString() { ... }  // replaces all System.out.println calls in main()
}
```

`atoms` is `Map<String, List<String>>` (grouped by sig label) rather than the flat `List<String>` proposed in backendNext.md. Grouping preserves sig-type context, which the frontend needs to draw node groups or color-code atoms. Spring Boot / Jackson will serialize this naturally.

---

### `AlloyRunner.java`
All Alloy imports live here and nowhere else.

```java
public class AlloyRunner {

    private final A4Reporter reporter;   // instance field — Spring Boot singleton-ready

    public AlloyRunner() {
        this.reporter = new A4Reporter() { ... };
    }

    // Convenience overload — always runs command 0
    public AlloyResult runModel(String modelText) {
        return runModel(modelText, 0);
    }

    // Full version — caller selects run/check command by index
    public AlloyResult runModel(String modelText, int commandIndex) {
        // parse -> select command -> configure options -> execute -> build AlloyResult
    }
}
```

---

### `AlloyAPI.java` (reduced)

```java
public class AlloyAPI {
    public static void main(String[] args) {
        String modelText = " sig Person {} run { some Person } for 3 ";
        AlloyRunner runner = new AlloyRunner();
        AlloyResult result  = runner.runModel(modelText);
        System.out.println(result);
    }
}
```

No Alloy imports remain here.

---

## What Moves Where

| Current `main()` block | Destination |
|---|---|
| `A4Reporter` anonymous class | `AlloyRunner` constructor → `this.reporter` |
| `CompUtil.parseEverything_fromString` | `AlloyRunner.runModel()` |
| `world.getAllCommands().get(cmdNum)` | `AlloyRunner.runModel()`, `cmdNum` → `commandIndex` param |
| `A4Options` setup | `AlloyRunner.runModel()` |
| `TranslateAlloyToKodkod.execute_command` | `AlloyRunner.runModel()` |
| Sig/atom/field loops + satisfiability check | `AlloyRunner.runModel()` → result captured into `AlloyResult` |
| All `System.out.println` calls | `AlloyResult.toString()` |

---

## Build Command Updates

**run.bat** — update SRC line to include all four files:
```bat
set SRC=src\main\java\Relation.java src\main\java\AlloyResult.java src\main\java\AlloyRunner.java src\main\java\AlloyAPI.java
```

**CLAUDE.md** — update the `javac` one-liner to compile all four files.

---

## Verification

Run from `alloy-editor/backend/`:
```powershell
& "C:\Program Files\Java\jdk-25\bin\javac.exe" -cp lib\alloy.jar -d target\classes src\main\java\Relation.java src\main\java\AlloyResult.java src\main\java\AlloyRunner.java src\main\java\AlloyAPI.java
& "C:\Program Files\Java\jdk-25\bin\java.exe" -cp "target\classes;lib\alloy.jar" AlloyAPI
```

Expected output (same behavior as before):
```
Status: SATISFIABLE
this/Person:
  Person$0
```

---

## Spring Boot Migration Notes (Future)

- `AlloyRunner` → add `@Service`; constructor already works as a singleton
- `AlloyResult` → `@ResponseBody` return type; Jackson serializes getter methods automatically
- `Relation` → serializes to `{"fieldName":"friends","source":"Person$0","target":"Person$1"}`
- `AlloyAPI.main()` → delete and replace with `@SpringBootApplication` main class
