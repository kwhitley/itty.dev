### Performance-Tuning
# Size (tree-shaking)

For maximum control over your bundle size, we recommend using direct imports of the specific files, rather than using the more-convenient import off the base.

### Examples (filesizes are approximate)
::: code-group

```ts [Unoptimized]
// uses top-level import
import { Router, json } from 'itty-router' // 957B (603B zipped)
```

```ts [Optimized]
// uses file-specific paths
import { Router } from 'itty-router/Router' // 637B (430B zipped)
import { json } from 'itty-router/json' // 253B (204B zipped)
```

For the absolute minimalist file size, we recommend using [`IttyRouter`](/itty-router/routers/ittyrouter).  It includes none of the convenience stages (`before`, `catch`, and `finally`) and is the fastest router in the lineup.

:::
