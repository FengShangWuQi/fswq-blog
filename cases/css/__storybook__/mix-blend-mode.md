---
group: cases
module: css
title: mix-blend-mode
---

import { Source } from "src-app/storybook/common/Source";

import { MixBlendModeDemo } from "./examples/mix-blend-mode";

<MixBlendModeDemo />

```jsx {2}
styled.div({
  mixBlendMode: "darken",
});
```

<Source path="cases/css/__storybook__/examples/mix-blend-mode.tsx" />