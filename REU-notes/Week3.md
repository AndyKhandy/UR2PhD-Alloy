Tasks for the Week of 6/15

## Though Process behind AlloyAPI.java

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

instance.eval(field) -> "Give me all tuples in this relation" (a typle would for example be {Person#0, Person#1}) indiciating a relation/connection between them

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

### Spring Boot

Understanding The New Part

This section:

for (Sig sig : world.getAllReachableSigs())

iterates over every signature Alloy knows about.

Think:

sig Person {}
sig File {}
sig Folder {}

becomes:

Person
File
Folder

inside Java.

Then:

instance.eval(sig)

asks:

"For this particular solution, what atoms belong to this signature?"

Example:

sig Person {}

run { some Person } for 3

might produce:

Person$0
Person$1
Fields

Suppose:

sig Person {
    friends: set Person
}

Then:

sig.getFields()

returns:

friends

Then:

instance.eval(field)

might return:

(Person$0, Person$1)
(Person$1, Person$2)

represented as tuples.