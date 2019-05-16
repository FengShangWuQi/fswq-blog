import React from "react";

import { useDesignSystem } from "../../../src-core/ds";
import { flex } from "../../../src-core/style";

import { IconMenu } from "../";

export default () => {
  const ds = useDesignSystem();

  return (
    <div
      css={{
        ...flex({
          flexWrap: "wrap",
        }),
        color: "#555",
        fill: "#555",
      }}>
      <div
        css={{
          ...flex({
            flexDirection: "column",
            alignItems: "center",
          }),
          width: "16.66%",
        }}>
        <span
          css={{
            fontSize: ds.size.xxl,
          }}>
          <IconMenu />
        </span>
        <span css={{ fontSize: ds.size.s }}>IconMenu</span>
      </div>
    </div>
  );
};
