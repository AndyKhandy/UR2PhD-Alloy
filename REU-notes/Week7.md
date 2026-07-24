React Flow draws the graph.

ELK decides where everything goes.

### Flow Diagram from Backend response to Graph
```text
Backend JSON
      │
      ▼
convertToNodes()
      │
      ▼
React Flow Nodes
      │
      ▼
layoutNodes()
      │
      ├───────────────┐
      │               │
      ▼               │
convertToELKGraph()   │
      │               │
      ▼               │
ELK Graph             │
      │               │
      ▼               │
elk.layout()          │
      │               │
      ▼               │
ELK Graph + x/y       │
      │               │
      ▼               │
applyELKLayout() ◄────┘
      │
      ▼
React Flow Nodes (positioned)
      │
      ▼
<ReactFlow />
```

### Architecture and Format of Inputs + Outputs
ELK expects

```
{
    children: [

        {
            id: "Person$0",
            width: 120,
            height: 40
        },

        {
            id: "Person$1",
            width: 120,
            height: 40
        }

    ],

    edges: [

        {
            id: "friends",

            sources: ["Person$0"],

            targets: ["Person$1"]
        }

    ]
}
```
Returns the node with the positions after running elk.layout()

```
{
    children: [

        {
            id: "Person$0",

            x: 125,

            y: 80
        },

        {
            id: "Person$1",

            x: 320,

            y: 80
        }

    ]
}
```

Then you convert it back to React Nodes to use


```

const nodes = reactFlowNodes.map(node => {

    const elkNode = layout.children.find(

        child => child.id === node.id

    );

    return {

        ...node,

        position: {

            x: elkNode.x,

            y: elkNode.y

        }

    };

});