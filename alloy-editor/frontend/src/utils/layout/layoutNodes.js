import ELK from "elkjs/lib/elk.bundled.js";
import convertToElkGraph from "./convertToElkGraph";
import applyElkLayout from "./applyELKLayout";

const elk = new ELK();

export default async function layoutNodes(flowNodes, flowEdges) {
    const elkGraph = convertToElkGraph(flowNodes, flowEdges);

    const layout = await elk.layout(elkGraph);

    return applyElkLayout(flowNodes, layout);
}
