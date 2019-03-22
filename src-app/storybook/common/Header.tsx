import React from "react";

import { useDesignSystem } from "src-core/ds";

import { margin } from "src-core/style";

export const Header = ({ children }: { children: React.ReactNode }) => {
  const ds = useDesignSystem();

  return (
    <div
      css={{
        height: 50,
        lineHeight: "50px",
        color: ds.color.bg,
        background: ds.color.primary,
        overflow: "hidden",
        "& a": {
          color: ds.color.bg,
        },
      }}>
      <div
        css={{
          ...margin(0, "auto"),
          maxWidth: 1200,
        }}>
        {children}
      </div>
    </div>
  );
};
