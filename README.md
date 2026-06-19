# UR2PhD-Alloy Block Based Editor

## Overview

The Alloy Block-Based Editor is a research project focused on developing a visual programming environment for the Alloy modeling language using Google's Blockly framework. Alloy is a formal specification language commonly used for modeling systems and checking properties through the Alloy Analyzer. While Alloy is powerful, its syntax can be difficult for new users to learn. This project aims to reduce that barrier by providing a drag-and-drop block interface that allows users to construct Alloy models visually while still generating valid Alloy source code behind the scenes.

The editor is being developed as part of undergraduate research investigating block-based structure editors for modeling languages. By leveraging Blockly, users can create Alloy models using visual representations of signatures, predicates, quantifiers, multiplicities, logical operators, and other language constructs. The generated Alloy code can then be executed through the Alloy Analyzer to verify properties and explore model instances.

## Project Goals

The primary goal of this project is to build a fully functional block-based editor capable of representing a substantial subset of the Alloy language. Users should be able to construct models entirely through blocks without directly writing Alloy syntax. The editor will generate syntactically correct Alloy source code and eventually integrate with the Alloy Analyzer API to execute commands and display results.

Beyond providing a usable modeling tool, the project also serves a research purpose. One of the long-term objectives is to investigate whether block-based interfaces can make formal modeling languages more accessible to novice users while maintaining the expressive capabilities required by experienced modelers.

## Current Progress

Development began by integrating Blockly into a React application using Vite. A Blockly workspace was successfully embedded within the application, allowing custom Alloy blocks to be created and organized through toolbox categories. Several foundational Alloy blocks have already been implemented, including signatures, predicates, identifiers, multiplicities, and logical expressions such as conjunctions.

A major milestone was the implementation of Blockly generators. These generators traverse the block structure and translate the visual model into valid Alloy source code. Through this process, key Blockly concepts such as `appendValueInput`, `appendStatementInput`, `valueToCode`, `statementToCode`, expression precedence, and output block generators were explored and implemented. The current system is capable of generating Alloy text directly from the user's block configuration.

Conceptually, the workflow currently looks like:

```text
Blockly Workspace
        ↓
Custom Alloy Blocks
        ↓
Blockly Generators
        ↓
Alloy Source Code
```

At this stage, the frontend portion of the project is largely focused on expanding Alloy language support and refining the visual editing experience.

## System Architecture

The project is divided into two major components: a frontend editor and a backend execution service.

The frontend is responsible for rendering the Blockly workspace, managing custom Alloy blocks, organizing toolbox categories, and generating Alloy source code. This portion of the application is implemented using React, Vite, JavaScript, and Blockly.

The backend will be responsible for executing generated Alloy models. Rather than requiring users to manually copy Alloy code into the Alloy Analyzer, the backend will directly interact with the Alloy API. Generated Alloy text will be sent from the frontend to the backend, parsed into Alloy's internal representation, executed through the Alloy Analyzer, and returned to the frontend as execution results.

The intended architecture is:

```text
User Creates Blocks
        ↓
Blockly Workspace
        ↓
Generator Produces Alloy Code
        ↓
Backend Receives Alloy Text
        ↓
Alloy API Parses Model
        ↓
Alloy Analyzer Executes Command
        ↓
Results Returned to Frontend
```

## Technology Stack

The frontend is built using React and Vite, with Blockly serving as the foundation for the visual programming environment. JavaScript is currently being used for development, with the possibility of migrating portions of the project to TypeScript in the future if additional type safety becomes beneficial.

The backend is planned to be implemented in Java, utilizing the Alloy API to parse and execute generated models. As the project matures, Spring Boot may be introduced to expose Alloy execution functionality through REST endpoints. Maven will likely be used for dependency management and project organization.

The current and planned technology stack includes:

* React
* Vite
* JavaScript
* Blockly
* Java
* Alloy API
* Maven
* Spring Boot (planned)
* Git and GitHub

## Backend Development Plan

The immediate focus of backend development is understanding and experimenting with the Alloy API. Before introducing web services or frontend integration, the goal is to create a standalone Java application capable of parsing Alloy source code, executing Alloy commands, and retrieving satisfiability results.

The first milestone is to take an Alloy model represented as a Java string, parse it into a `CompModule`, execute a selected command using the Alloy API, and determine whether a satisfying instance exists. This stage will provide familiarity with concepts such as Alloy parsing, command execution, solver configuration, and solution inspection.

Once Alloy execution is understood in isolation, the execution logic can be wrapped into a reusable backend service. Afterward, Spring Boot can be introduced to expose execution functionality through REST endpoints that receive Alloy source code from the frontend and return execution results in JSON format.

Only after these pieces are functioning independently will the frontend and backend be connected together.

## Immediate Next Steps

The current priority is backend exploration through the Alloy API. The goal is not to build a web server or integrate React with Java yet, but simply to learn how Alloy models can be executed programmatically.

The next phase will involve creating a small Java project capable of parsing Alloy text, executing commands, and determining satisfiability. Once this workflow is understood, the project can gradually evolve into a complete end-to-end system connecting Blockly-generated Alloy models directly to the Alloy Analyzer.

At a high level, the immediate objective is to prove the following workflow:

```text
Blockly
        ↓
Generated Alloy Text
        ↓
Java Alloy API
        ↓
SAT / UNSAT Result
```

Successfully completing this workflow will establish the foundation for future backend integration and full model execution support.
