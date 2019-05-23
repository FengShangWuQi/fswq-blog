import React from "react";

import { EditLink } from "src-app/storybook/common/Storybook";

import { Tag } from "..";

export default () => (
  <div>
    <div>
      <Tag
        color="#61DAFB"
        bg="#222222"
        css={{
          marginRight: 8,
          fontWeight: "bold",
        }}>
        React
      </Tag>
      <Tag
        color="#ffffff"
        bg="#004f86"
        css={{
          fontWeight: "bold",
        }}>
        CSS
      </Tag>
    </div>

    <EditLink path="src-components/tags/Tag.tsx" />
  </div>
);
