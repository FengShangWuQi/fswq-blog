import React from "react";
import { rgba, position, size } from "polished";

import { flex } from "src-core/style";
import { pickElmAttrs } from "utils/pickElmAttrs";

export const BackFaceVisibilityDemo = () => (
  <div
    css={{
      ...flex({}),
    }}>
    <BackFaceVisibility
      css={{
        marginRight: 24,
      }}
    />
    <BackFaceVisibility hidden />
  </div>
);

const BackFaceVisibility = ({
  hidden,
  ...otherProps
}: {
  hidden?: boolean;
}) => {
  return (
    <div
      {...pickElmAttrs(otherProps)}
      css={{
        width: 150,
        height: 50,
        lineHeight: "50px",
        textTransform: "uppercase",
        textAlign: "center",
        letterSpacing: 2,
        cursor: "pointer",
        color: "#ffffff",
        "&:hover > div": {
          transform: "rotateY(180deg)",
        },
      }}>
      <div
        css={{
          ...position("relative"),
          ...size("100%"),
          transition: "all 0.6s cubic-bezier(0.37, 0.74, 0.15, 1.65)",
          transformStyle: "preserve-3d",
          "& > div": {
            ...position("absolute"),
            ...size("100%"),
            borderRadius: 4,
            backfaceVisibility: hidden ? "hidden" : "visible",
          },
        }}>
        <div
          css={{
            background: rgba("#fc2161", 0.8),
            transform: "rotateY(0deg) translateZ(25px)",
          }}>
          {hidden ? "hidden" : "visible"}
        </div>
        <div
          css={{
            background: rgba("#77bd42", 0.8),
            transform: "rotateY(-180deg) translateZ(25px)",
          }}>
          backface
        </div>
      </div>
    </div>
  );
};
