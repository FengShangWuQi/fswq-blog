import React from "react";
import { Global } from "@emotion/core";
import { position } from "polished";
import produce from "immer";

import { Bootstrap } from "src-core/react";
import { defaultTheme, useDesignSystem } from "src-core/ds";
import { mq } from "src-core/style";

import { Nav } from "./Nav";
import { Loadingbar } from "./LoadingBar";

const blogTheme = produce(defaultTheme, theme => {
  theme.color.primary = "#3c2584";
});

const BlogGlobal = () => {
  const ds = useDesignSystem();

  return (
    <Global
      styles={{
        html: {
          fontSize: ds.fontSize.base,
        },
      }}
    />
  );
};

const Container = ({ children }: { children: React.ReactNode }) => {
  const ds = useDesignSystem();

  return (
    <div
      css={mq(["lg"], {
        ...position("relative"),
        margin: ["0 auto", `0 auto ${ds.spacing[16]}`],
        maxWidth: 1200,
      })}>
      {children}
    </div>
  );
};

export const Layout = ({ children }: { children: React.ReactNode }) => (
  <Bootstrap ds={blogTheme}>
    <BlogGlobal />

    <Loadingbar />
    <Container>
      <Nav />
      {children}
    </Container>
  </Bootstrap>
);
