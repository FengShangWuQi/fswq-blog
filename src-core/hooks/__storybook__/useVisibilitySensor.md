---
group: core
module: hooks
title: useVisibilitySensor
---

import { Source } from "src-app/storybook/common/Source";

import { UseVisibilitySensorDemo } from "./examples/useVisibilitySensor";

<UseVisibilitySensorDemo />

```jsx {4}
const rootRef = useRef(null);
const footerRef = useRef(null);

const isVisible = useVisibilitySensor(footerRef, {
  root: rootRef.current,
});
```

<Source path="src-core/hooks/useVisibilitySensor.ts" />