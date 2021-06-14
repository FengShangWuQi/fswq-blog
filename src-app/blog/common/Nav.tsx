import React from "react";
import { Link } from "gatsby";

import { useDesignSystem } from "src-core/ds";
import { mq, flex } from "src-core/style";

import { Menu, MenuItem } from "src-components/navigation/Menu";
import { Button } from "src-components/basic/Button";

import { pickElmAttrs } from "utils/pickElmAttrs";

import { Search } from "../search";

export const Nav = ({ pathname, ...props }: { pathname: string }) => {
  const ds = useDesignSystem();

  const isArchiveOr404 = pathname === "/archive" || pathname === "/404";

  return (
    <div
      css={{
        ...flex({
          justifyContent: "space-between",
          alignItems: "center",
        }),
      }}>
      <Menu {...pickElmAttrs(props)}>
        <MenuItem>
          <Link
            to="/"
            css={mq(["lg"], {
              display: isArchiveOr404 ? "block" : "none",
              fontSize: [ds.size["2xl"], ds.size["3xl"]],
            })}>
            枫上雾棋的日志
          </Link>
        </MenuItem>
      </Menu>

      <Menu
        css={
          isArchiveOr404
            ? mq(["sm"], {
                display: ["none", "block"],
                marginLeft: ds.spacing["5"],
              })
            : {}
        }
        {...pickElmAttrs(props)}>
        <MenuItem
          key="search"
          css={mq(["lg"], {
            display: ["none", "flex"],
          })}>
          <Search indices={[{ name: "blog" }]} />
        </MenuItem>

        {[
          { value: "/archive", label: "归档" },
          { value: "/", label: "最新" },
          { value: "/rss.xml", label: "rss" },
        ].map(item => (
          <MenuItem key={item.value}>
            {item.label === "rss" ? (
              <a href={item.value} target="_blank" rel="noopener noreferrer">
                {item.label.toUpperCase()}
              </a>
            ) : (
              <Link to={item.value}>{item.label.toUpperCase()}</Link>
            )}
          </MenuItem>
        ))}

        <MenuItem key="subscribe">
          <a
            href="https://github.com/FengShangWuQi/fengshangwuqi.github.io/releases"
            target="_blank"
            rel="noopener noreferrer">
            <Button primary>Subscribe</Button>
          </a>
        </MenuItem>
      </Menu>
    </div>
  );
};
