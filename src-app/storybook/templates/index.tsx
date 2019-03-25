import React from "react";

import {
  RouterProvider,
  Location,
  Router,
  Route,
  Link,
  IBaseRoute,
} from "src-core/router";

import { flex, position, size, margin } from "src-core/style";

import { BaseMenu, BaseMenuItem } from "src-components/menus";

import { IDictionary } from "utils/object";

import { Layout } from "../common/Layout";
import { SideBar } from "../common/SideBar";
import { Header } from "../common/Header";

export default () => {
  const groupModuleCompList: IDictionary<
    IDictionary<IDictionary<React.FunctionComponent>>
  > = Object.keys(groups).reduce((prevGroups, groupName) => {
    const currGroup = groups[groupName as keyof typeof groups].keys();

    const modules = currGroup.reduce(
      (prevModules: IDictionary<any>, compPath: string) => {
        const [moduleName, compName] = compPath
          .replace(/^.{2}|\/__storybook__|\.tsx?$/g, "")
          .split("/");
        const comp = groups[groupName as keyof typeof groups](compPath).default;

        if (!!prevModules[moduleName]) {
          return {
            ...prevModules,
            [moduleName]: { ...prevModules[moduleName], [compName]: comp },
          };
        }
        return { ...prevModules, [moduleName]: { [compName]: comp } };
      },
      {},
    );

    return { ...prevGroups, [groupName]: modules };
  }, {});

  const currGroup = "components";
  const defaultGroup = "components";
  const currModules: IDictionary<string[]> = Object.keys(
    groupModuleCompList[currGroup],
  ).reduce(
    (prevModules, currModule) => ({
      ...prevModules,
      [currModule]: Object.keys(groupModuleCompList[currGroup][currModule]),
    }),
    {},
  );

  return (
    <RouterProvider value={{ pathPrefix: "/" }}>
      <Location>
        <Layout>
          <Header>
            <div
              css={{
                ...flex({
                  justifyContent: "space-between",
                }),
              }}>
              <Link to={`/${defaultGroup}`}>枫上雾棋的 storybook</Link>
              <BaseMenu
                css={{
                  height: 50,
                  lineHeight: "50px",
                }}>
                {Object.keys(groupModuleCompList).map(groupName => (
                  <Link to={groupName} key={groupName}>
                    <BaseMenuItem>{groupName.toUpperCase()}</BaseMenuItem>
                  </Link>
                ))}
              </BaseMenu>
            </div>
          </Header>

          <Container>
            <SideBar group={currGroup} modules={currModules} />

            <Router>
              {Object.keys(currModules).map(currModule =>
                currModules[currModule as keyof typeof currModules].map(
                  currComp => (
                    <Route
                      component={
                        groupModuleCompList[currGroup][currModule][currComp]
                      }
                      path={`${currGroup}/${currModule}/${currComp}`}
                    />
                  ),
                ),
              )}
            </Router>
          </Container>
        </Layout>
      </Location>
    </RouterProvider>
  );
};

const groups = {
  core: (require as any).context(
    "src-core",
    true,
    /\/__storybook__\/(.+)\.tsx$/,
  ),
  components: (require as any).context(
    "src-components",
    true,
    /\/__storybook__\/(.+)\.tsx$/,
  ),
  utils: (require as any).context("utils", true, /\/__storybook__\/(.+)\.tsx$/),
};

const Container = ({
  children,
}: { children: React.ReactNode } & IBaseRoute) => {
  return (
    <div
      css={[
        {
          ...flex({}),
          ...position("relative"),
          ...margin(0, "auto"),
          ...size("100%"),
          marginTop: 40,
          maxWidth: 1200,
        },
      ]}>
      {children}
    </div>
  );
};
