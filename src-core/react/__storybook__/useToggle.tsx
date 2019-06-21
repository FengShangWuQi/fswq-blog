import React from "react";

import { EditLink } from "src-app/storybook/common/Storybook";

import { useToggle } from "..";

export default () => {
  const [on, toggle] = useToggle(false);

  return (
    <div>
      <div>{on ? "on" : "off"}</div>

      <button
        css={{
          marginTop: 24,
        }}
        onClick={() => toggle()}>
        click
      </button>

      <EditLink path="src-core/react/useToggle.ts" />
    </div>
  );
};