import { Handle, Position } from "@xyflow/react";
import { HANDLE_COUNT,HANDLE_SPACING, NODE_WIDTH, NODE_HEIGHT } from "../../utils/data";

export default function AlloyNode({ data }) {
  // Number of handles along each side
  const horizontalHandles = Math.floor(NODE_WIDTH / HANDLE_SPACING);
  const verticalHandles = HANDLE_COUNT;

  // Helper function to create one handle
  const createHandle = (id, type, position, style) => (
    <Handle
      key={id}
      id={id}
      type={type}
      position={position}
      style={style}
    />
  );

  return (
    <div className="alloy-node">

      {/* Top */}
      {Array.from({ length: horizontalHandles }).map((_, i) =>
        createHandle(
          `top-${i}`,
          "target",
          Position.Top,
          {
            left: (i+1) * HANDLE_SPACING,
          }
        )
      )}

      {/* Bottom */}
      {Array.from({ length: horizontalHandles }).map((_, i) =>
        createHandle(
          `bottom-${i}`,
          "source",
          Position.Bottom,
          {
            left: (i+1) * HANDLE_SPACING,
          }
        )
      )}

      {/* Left */}
      {Array.from({ length: verticalHandles }).map((_, i) =>
        createHandle(
          `left-${i}`,
          "target",
          Position.Left,
          {
            top: (i+1)* HANDLE_SPACING,
          }
        )
      )}

      {/* Right */}
      {Array.from({ length: verticalHandles }).map((_, i) =>
        createHandle(
          `right-${i}`,
          "source",
          Position.Right,
          {
            top: (i+1)* HANDLE_SPACING,
          }
        )
      )}

      <div className="label">
        {data.label}
      </div>

    </div>
  );
}
