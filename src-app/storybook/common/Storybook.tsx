import React from "react";

import { useMatch } from "src-core/router";

import { flex, margin, rhythm, padding } from "src-core/style";

import { groupModuleCompList } from "../templates";
import { SideBar } from "./SideBar";

export const Storybook = () => {
  const {
    params: { group, module, component },
  } = useMatch();

  const SB = groupModuleCompList[group][module][component];

  return (
    SB && (
      <div
        css={{
          ...flex({}),
          ...margin(40, "auto"),
          ...padding(0, 24),
          maxWidth: 1200,
        }}>
        <SideBar group={group} />
        <div
          css={{
            flexGrow: 1,
          }}>
          <h1>{component}</h1>

          <SB />
        </div>
      </div>
    )
  );
};

export const EditLink = ({ path }: { path: string }) => {
  return (
    <div
      css={{
        marginTop: rhythm(3),
      }}>
      <a
        href={`https://github.com/FengShangWuQi/fengshangwuqi.github.io/blob/dev/${path}`}
        target="_blank"
        rel="noopener noreferrer">
        Edit on GitHub
      </a>
    </div>
  );
};
