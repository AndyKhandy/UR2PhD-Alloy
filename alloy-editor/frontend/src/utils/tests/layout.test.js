import { describe, expect, it } from "vitest";
import convertToElkGraph from "../layout/convertToElkGraph";
import applyElkLayout from "../layout/applyELKLayout";
import layoutNodes from "../layout/layoutNodes";
import { NODE_WIDTH, NODE_HEIGHT } from "../../components/graph/AlloyNode";

describe("convertToElkGraph", () => {
  it("converts flow nodes to sized ELK children", () => {
    const nodes = [
      { id: "person", position: { x: 10, y: 20 }, data: { label: "Person" } },
      { id: "dog", position: { x: 30, y: 40 }, data: { label: "Dog" } },
    ];

    expect(convertToElkGraph(nodes, [])).toEqual({
      id: "root",
      layoutOptions: {
        "elk.algorithm": "layered",
        "elk.direction": "RIGHT",
      },
      children: [
        { id: "person", width: NODE_WIDTH, height: NODE_HEIGHT },
        { id: "dog", width: NODE_WIDTH, height: NODE_HEIGHT },
      ],
      edges: [],
    });
  });

  it("converts flow edges to ELK source and target arrays", () => {
    const graph = convertToElkGraph(
      [{ id: "person" }, { id: "dog" }],
      [{ id: "person-owns-dog", source: "person", target: "dog" }],
    );

    expect(graph.edges).toEqual([
      {
        id: "person-owns-dog",
        sources: ["person"],
        targets: ["dog"],
      },
    ]);
  });

  it("handles an empty graph", () => {
    expect(convertToElkGraph([], [])).toMatchObject({
      children: [],
      edges: [],
    });
  });
});

describe("applyElkLayout", () => {
  it("applies ELK coordinates while preserving flow node data", () => {
    const nodes = [
      {
        id: "person",
        position: { x: 10, y: 20 },
        data: { label: "Person" },
        type: "default",
      },
    ];

    expect(
      applyElkLayout(nodes, {
        children: [{ id: "person", x: 120, y: 80 }],
      }),
    ).toEqual([
      {
        id: "person",
        position: { x: 120, y: 80 },
        data: { label: "Person" },
        type: "default",
      },
    ]);
    expect(nodes[0].position).toEqual({ x: 10, y: 20 });
  });

  it("throws when ELK does not return a requested node", () => {
    expect(() =>
      applyElkLayout([{ id: "missing" }], { children: [] }),
    ).toThrow('ELK layout did not contain node "missing"');
  });

  it("keeps overlapping nodes separated by a 20px horizontal gap", () => {
    const nodes = [
      { id: "person", position: { x: 0, y: 0 } },
      { id: "dog", position: { x: 0, y: 100 } },
    ];

    const laidOutNodes = applyElkLayout(nodes, {
      children: [
        { id: "person", x: 200, y: 40 },
        { id: "dog", x: 200, y: 80 },
      ],
    });

    expect(laidOutNodes.map((node) => node.position)).toEqual([
      { x: 200, y: 40 },
      { x: 445, y: 80 },
    ]);
  });
});

describe("layoutNodes", () => {
  it("returns asynchronously laid out nodes with finite coordinates", async () => {
    const nodes = [
      { id: "person", position: { x: 0, y: 0 }, data: { label: "Person" } },
      { id: "dog", position: { x: 0, y: 0 }, data: { label: "Dog" } },
    ];
    const edges = [{ id: "owns", source: "person", target: "dog" }];

    const laidOutNodes = await layoutNodes(nodes, edges);

    expect(laidOutNodes).toHaveLength(2);
    expect(laidOutNodes.map((node) => node.id)).toEqual(["person", "dog"]);
    for (const node of laidOutNodes) {
      expect(Number.isFinite(node.position.x)).toBe(true);
      expect(Number.isFinite(node.position.y)).toBe(true);
      expect(node.data).toBeDefined();
    }
  });
});
