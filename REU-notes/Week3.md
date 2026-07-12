Tasks for the Week of 6/15

## Thought Process behind AlloyAPI.java

```text
Instance
│
├── Atoms
│     Person$0
│     Person$1
│     File$0
│
└── Relations
      friends(Person$0, Person$1)
      link(File$0, File$1)
```
instance.eval(sig) -> "Give me all atoms in this set"

(Ex) (Person#0), (Person#1), (Person#2)

instance.eval(field) -> "Give me all tuples in this relation" (a typle would for example be {Person#0, Person#1}) indiciating a relation/connection between them

(Ex) (Person$0, Person$1)
(Person$1, Person$2) which equates to the relations of Person#0 -> Person#1 and Person#1 -> Person#2

## Finished Workflow

```text
User clicks Run
        ↓
Blockly Workspace
        ↓
Generators
        ↓
Alloy Text
        ↓
fetch()
        ↓
Spring Boot
        ↓
Alloy API
        ↓
A4Solution
        ↓
Java Result Object
        ↓
JSON
        ↓
React
        ↓
Display SAT / UNSAT
```

1. React sends an HTTP request to a URL
2. Spring Boot receives it, runs your Java logic
3. Spring Boot sends back a JSON response
4. React reads the JSON and updates the UI

### Indepth Workflow (Frontend + Backend Interactions)

1. **React** makes an HTTP request to get the value from the AlloyAPI.java which also utilizes Java Spring Boot as the middleman
```text
async function runModel(modelText) {
  const response = await fetch("http://localhost:8080/run-model", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ modelText })   // JS object → JSON string
  });

  const result = await response.json();  // JSON string → JS object
  console.log(result.satisfiable);       // true
  console.log(result.atoms);             // { "this/Person": ["Person$0"] }
}
```

2. This is the JSON result that **Spring Boot** returns to the frontend where runModel was called (ie const result = await response.json())

**Spring Boot** is a framework that turns your Java code into an HTTP server. You annotate classes and methods, and it wires everything together:

```text
{
  "satisfiable": true,
  "atoms": {
    "this/Person": ["Person$0", "Person$1"]
  },
  "relations": [
    { "fieldName": "friends", "source": "Person$0", "target": "Person$1" }
  ]
}
```

3. AlloyApplication.java — The Entry Point

@SpringBootApplication
public class AlloyApplication {
    public static void main(String[] args) {
        SpringApplication.run(AlloyApplication.class, args);
    }
}
Why: @SpringBootApplication does three things at once: it marks this as the app's starting point, enables auto-configuration (Spring wires up Tomcat, Jackson, etc. automatically), and tells Spring to scan com.ur2phd.alloy.* for components. SpringApplication.run() boots the whole server — it replaces the old AlloyAPI.main().

---
4. @Service on AlloyRunner

@Service
Just a bare Maven project with one dependency.

After: Added a <parent>:
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.3.5</version>
</parent>
Why: The Spring Boot parent POM is like an "everything included" shopping list. It manages the versions of
200+ libraries so they're all compatibt, you'd have to manually findcompatible versions of Spring, Jackson, Tomcat, and dozens of other dependencies.

Added spring-boot-starter-web:
<dependency>
    <groupId>org.springframework.boot<
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
Why: This one dependency pulls in everserver: Spring MVC (routing), Tomcat(the embedded web server), and Jackson (JSON serialization). Without it you'd have no web server at all.

Changed Java version from 11 → 17:
Why: Spring Boot 3.x requires Java 17 minimum. Your machine has JDK 25 so this just changes what bytecode level Maven targets.
---
4. @Service on AlloyRunner

@Service
public class AlloyRunner { ... }
Why: @Service tells Spring "create exactly one instance of this class and manage it." Spring then makes that single instance available anywhere in your app via @Autowired. Without this, Spring would never know AlloyRunner exists and couldn't inject it into the controller.

---
5. ModelRequest.java — The Request Shape

public class ModelRequest {
    private String modelText;
    public String getModelText() { ... }
    public void setModelText(String t)
}
Why: When the React frontend POSTs { }", Spring needs a Java object to put that data into. Jackson (the JSON library) reads the incoming JSON and calls setModelText() to populate
this object. Without it, there's nowheand.

---
6. AlloyController.java — The HTTP End

@RestController
@CrossOrigin(origins = "http://localho
public class AlloyController {

    @Autowired
    private AlloyRunner runner;

    @PostMapping("/run-model")
    public AlloyResult runModel(@RequestBody ModelRequest request) {
        return runner.runModel(request.getModelText());
    }                                                                                                  }
Each annotation does a specific job:                                                                   
- @RestController — Marks this class as an HTTP handler. Every method return value is automatically    serialized to JSON and sent back as th
- @CrossOrigin(origins = "http://localhost:5173") — Browsers block requests from one port/domain to another by default (this is called CORS). Your React app runs on port 5173, Spring Boot on port 8080 — different ports = blocked. This annotaers to its responses that tell thebrowser "this is allowed." Without it, the browser would silently block every fetch call from your frontend.
- @Autowired — Spring looks up its man injects it here. You never call newAlloyRunner() yourself.
- @PostMapping("/run-model") — This method handles POST http://localhost:8080/run-model. Only POST requests to that exact path reach this method.
- @RequestBody ModelRequest request — Jackson automatically deserializes the JSON request body into a ModelRequest object before the method
- The return value — AlloyResult is returned directly. Because of @RestController, Jackson automatically
converts it to JSON — your getters (istRelations()) become the JSON keys.

---
7. BlocklyEditor.jsx — The Frontend Fetch

async function runModel() {
    const code = alloyGenerator.workspaceToCode(workspaceRef.current);
    const response = await fetch("http://localhost:8080/run-model", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ modelText: code })
    });
    const result = await response.json();
    setRunResult(result);
}
Why async/await: fetch() is a network call that takes time. async/await means "pause here and wait for the response before continuing" without freezing the whole browser tab.

Why Content-Type: application/json: Tells Spring Boot that the request body is JSON. Without this header, Spring doesn't know how to parse the body and returns a 400 error.

cks "Run Model"
        │
        ▼
alloyGenerator.workspaceToCode()
  → "sig Person {} run { some Person } for 3"
        │
        ▼ fetch POST to localhost:8080/run-model
        │  body: { "modelText": "sig Person..." }
        │
        ▼ Spring Boot receives it
AlloyController.runModel()
  → Jackson parses body into ModelRequ
  → Spring injects AlloyRunner (the @Service)
  → runner.runModel(request.getModelText())
        │

AlloyRunner.runModel()
  → CompUtil.parseEverything_fromString(...)
  → TranslateAlloyToKodkod.execute_command(...)
  → builds AlloyResult with atoms + relations
        │
        ▼ Spring Boot sends it back
Jackson serializes AlloyResult to JSON
  → { "satisfiable": true, "atoms": {...}, "relations": [...] }
        │
        ▼ React receives it
response.json() → JS object
setRunResult(result) → component re-renders
  → atoms and relations displayed on screen