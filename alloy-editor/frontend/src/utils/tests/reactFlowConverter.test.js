import { describe, it, expect } from "vitest";
import { MarkerType } from "@xyflow/react";
import { convertToNodes, convertToEdges } from "../flow/reactFlowConverter";

describe("convertToNodes", () => {
  it("returns an empty array when atoms is empty", () => {
    expect(convertToNodes({})).toEqual([]);
  });

  it("builds one node per atom for a single signature", () => {
    const atoms = { Person: ["Person$0", "Person$1"] };

    expect(convertToNodes(atoms)).toEqual([
      {
        id: "Person$0",
        type: "alloy",
        position: { x: 0, y: 0 },
        data: { label: "Person$0", signature: "Person" },
      },
      {
        id: "Person$1",
        type: "alloy",
        position: { x: 0, y: 0 },
        data: { label: "Person$1", signature: "Person" },
      },
    ]);
  });

  it("skips a signature with no atoms but still processes the rest", () => {
    const atoms = { Person: [], Dog: ["Dog$0"] };

    expect(convertToNodes(atoms)).toEqual([
      {
        id: "Dog$0",
        type: "alloy",
        position: { x: 0, y: 0 },
        data: { label: "Dog$0", signature: "Dog" },
      },
    ]);
  });

  it("builds nodes across multiple signatures, offsetting position by signature and instance index", () => {
    const atoms = {
      Person: ["Person$0", "Person$1"],
      Dog: ["Dog$0"],
    };

    expect(convertToNodes(atoms)).toEqual([
      {
        id: "Person$0",
        type: "alloy",
        position: { x: 0, y: 0 },
        data: { label: "Person$0", signature: "Person" },
      },
      {
        id: "Person$1",
        type: "alloy",
        position: { x: 0, y: 0 },
        data: { label: "Person$1", signature: "Person" },
      },
      {
        id: "Dog$0",
        type: "alloy",
        position: { x: 0, y: 0 },
        data: { label: "Dog$0", signature: "Dog" },
      },
    ]);
  });

  it("preserves duplicate atom ids across signatures instead of merging them", () => {
    const atoms = {
      Person: ["Shared$0"],
      Dog: ["Shared$0"],
    };

    const nodes = convertToNodes(atoms);

    expect(nodes).toHaveLength(2);
    expect(nodes.map((n) => n.id)).toEqual(["Shared$0", "Shared$0"]);
    expect(nodes[0].data.signature).toBe("Person");
    expect(nodes[1].data.signature).toBe("Dog");
  });

  it("gives every atom within a signature a zero-based position", () => {
    const atoms = { Person: ["Person$0", "Person$1", "Person$2"] };

    const nodes = convertToNodes(atoms);

    expect(nodes).toHaveLength(3);
    expect(nodes.map((n) => n.position)).toEqual([
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ]);
  });
});

describe("convertToEdges", () => {
  it("returns an empty array when relations is empty", () => {
    expect(convertToEdges([])).toEqual([]);
  });

  it("builds one edge per relation, labeled with the field name", () => {
    const relations = [
      { fieldName: "friends", source: "Person$0", target: "Person$1" },
    ];

    expect(convertToEdges(relations)).toEqual([
      {
        id: "Person$0-friends-Person$1",
        source: "Person$0",
        target: "Person$1",
        sourceHandle: "right-0",
        targetHandle: "left-0",
        label: "friends",
        type: "default",
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      },
    ]);
  });

  it("gives distinct ids to different fields linking the same pair of atoms", () => {
    const relations = [
      { fieldName: "friends", source: "Person$0", target: "Person$1" },
      { fieldName: "spouse", source: "Person$0", target: "Person$1" },
    ];

    const edges = convertToEdges(relations);

    expect(edges).toHaveLength(2);
    const ids = edges.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(edges.map((e) => e.label)).toEqual(["friends", "spouse"]);
    expect(edges.map((e) => e.sourceHandle)).toEqual(["right-0", "right-1"]);
    expect(edges.map((e) => e.targetHandle)).toEqual(["left-0", "left-1"]);
  });

  it("handles a self-loop relation (source === target)", () => {
    const relations = [
      { fieldName: "self", source: "Person$0", target: "Person$0" },
    ];

    expect(convertToEdges(relations)).toEqual([
      {
        id: "Person$0-self-Person$0",
        source: "Person$0",
        target: "Person$0",
        sourceHandle: "right-0",
        targetHandle: "top-0",
        label: "self",
        type: "selfLoop",
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      },
    ]);
  });

  it("builds multiple edges across different atom pairs", () => {
    const relations = [
      { fieldName: "friends", source: "Person$0", target: "Person$1" },
      { fieldName: "owns", source: "Person$0", target: "Dog$0" },
    ];

    const edges = convertToEdges(relations);

    expect(edges).toHaveLength(2);
    expect(edges.map((e) => e.id)).toEqual([
      "Person$0-friends-Person$1",
      "Person$0-owns-Dog$0",
    ]);
  });
});
