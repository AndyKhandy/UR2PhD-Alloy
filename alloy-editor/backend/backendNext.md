Next Refactor Goal

I do NOT want to jump directly into Spring Boot controllers.

I want to first refactor the current Alloy API prototype into reusable classes.

Proposed backend structure:

backend/
├── src/
│
├── AlloyRunner.java
├── AlloyResult.java
├── Relation.java
AlloyRunner

Example:

AlloyResult result =
    runner.runModel(modelText);
AlloyResult

Stores execution results.

Possible structure:

public class AlloyResult {

    private boolean satisfiable;

    private List<String> atoms;

    private List<Relation> relations;

}
Relation

Represents relational tuples extracted from Alloy fields.

Example:

public class Relation {

    private String source;

    private String target;

}
Spring Boot Phase (Future)

Once AlloyRunner works independently, I plan to add Spring Boot.

Possible structure:

backend/
├── controller/
├── service/
├── model/

Example endpoint:

@PostMapping("/run-model")
public AlloyResult runModel(
    @RequestBody ModelRequest request
) {
    return alloyRunner.runModel(
        request.getModelText()
    );
}

Spring Boot should automatically serialize AlloyResult into JSON.

Example response:

{
  "satisfiable": true,
  "atoms": [
    "Person$0",
    "Person$1"
  ]
}
Areas Where I Want Help
Designing AlloyRunner, AlloyResult, and Relation classes.
Refactoring Alloy execution code out of main().
Creating a clean backend architecture before introducing Spring Boot.
Understanding best practices for exposing Alloy execution through REST APIs.
Determining what data structures should be returned to the frontend for later visualization.
Suggesting a scalable project structure for a Java backend that will eventually integrate with a React + Blockly frontend.
Identifying any missing backend concepts I should learn before starting Spring Boot.

Please treat the Alloy API execution portion as already functional and focus on improving architecture, maintainability, and future frontend integration.