---
group: core
module: style
title: grid
---

import { Source } from "src-app/storybook/common/Source";

import { GridDemo } from "./examples/grid";

<GridDemo />

```jsx {2}
styled.div({
  ...grid({
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "repeat(3, 1fr)",
    gridAutoFlow: "row dense",
    gridGap: `${ds.spacing[5]}`,
  }),
});
```

<Source path="src-core/style/grid.ts" />