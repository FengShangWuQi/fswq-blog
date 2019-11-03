import React from "react";

import { flex } from "..";

export const FlexDemo = () => {
  return (
    <div>
      <pre>{`{
  ...flex({
    justifyContent: "center",
    alignItems: "center",
  })
}`}</pre>

      <div
        css={{
          ...flex({
            justifyContent: "center",
            alignItems: "center",
          }),
          marginTop: 24,
          width: 620,
          height: 320,
          fontSize: 24,
          color: "white",
          background: "#ff8c00",
          borderRadius: 8,
          border: "1px solid #eee",
        }}>
        CSS FlexBox
      </div>

      {/* <EditLink path="src-core/style/flex.ts" /> */}
    </div>
  );
};
