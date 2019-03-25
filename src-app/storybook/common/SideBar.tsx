import React from "react";

import { useDesignSystem } from "src-core/ds";
import { RouterProvider, Link, IBaseRoute } from "src-core/router";

import { padding } from "src-core/style";

import { IDictionary } from "utils/object";

export const SideBar = ({
  modules,
  group,
}: { modules: IDictionary<string[]>; group?: string } & IBaseRoute) => {
  const ds = useDesignSystem();

  return (
    <RouterProvider value={{ pathPrefix: `/${group}` }}>
      <Container>
        {Object.keys(modules).map(moduleName => (
          <div key={moduleName}>
            <div>{moduleName}</div>
            <div>
              {modules[moduleName].map(compName => (
                <Link
                  css={{
                    color: ds.color.bg,
                  }}
                  key={compName}
                  to={`${moduleName}/${compName}`}>
                  {compName}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </Container>
    </RouterProvider>
  );
};

const Container = ({ children }: { children: React.ReactNode }) => {
  const ds = useDesignSystem();

  return (
    <div
      css={{
        ...padding(10),
        marginRight: 40,
        width: 224,
        height: "100%",
        fontSize: ds.size.s,
        color: ds.color.bg,
        background: ds.color.primary,
      }}>
      {children}
    </div>
  );
};
