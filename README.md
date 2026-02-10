![npm](https://img.shields.io/npm/v/@pycolors/ui)
![downloads](https://img.shields.io/npm/dm/@pycolors/ui)
![license](https://img.shields.io/npm/l/@pycolors/ui)

# @pycolors/ui

> ⚠️ **Read-only mirror**
>
> This repository is automatically synced from the **PyColors monorepo**.
> **Source of truth:** https://github.com/pycolors-io/pycolors/tree/main/packages/ui
>
> 👉 Please open issues and pull requests here — they are synced upstream.

Production-ready UI primitives for modern SaaS apps — built for **speed**, **consistency**, and **real-world patterns**.

- Accessible defaults (Radix + sane patterns)
- Tailwind-friendly (tokens-driven styling)
- “Starter-grade” components: Tables, Dialogs, Sheets, Alerts, Tabs…
- Designed to power the **PyColors SaaS Starter** and future Pro templates

---

## Install

``` bash
pnpm add @pycolors/ui
# or
npm i @pycolors/ui
# or
yarn add @pycolors/ui
```

## Peer dependencies

This library expects React + lucide-react:

``` bash
pnpm add react react-dom lucide-react
```

## Quick usage

``` tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from "@pycolors/ui";

export function Example() {
  return (
    <Card bordered className="p-4">
      <CardHeader className="p-0">
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent className="p-0 pt-4">
        <Button>Get started</Button>
      </CardContent>
    </Card>
  );
}
```

## What's inside (v1)

Exports currently include:

-   Button
-   Card
-   Badge
-   Input
-   PasswordInput
-   Alert
-   Dialog
-   Sheet
-   DropdownMenu
-   Tabs
-   Toast
-   Pagination
-   Table
-   Skeleton
-   EmptyState
-   cn / utils

This is intentionally small and "starter-first": the goal is to ship a
credible SaaS UX surface quickly, then expand.

------------------------------------------------------------------------

## Design approach

PyColors UI is not "just components".\
It's a product system:

-   predictable layout primitives
-   consistent tokens + spacing
-   real data states (loading / empty / error)
-   B2B SaaS patterns (members, billing, settings, projects)

------------------------------------------------------------------------

## Roadmap

Next planned steps:

-   `@pycolors/tokens` (CSS variables + semantic tokens)
-   richer form primitives (Select, Checkbox, Radio, Switch)
-   "Pro" layer: advanced components/patterns for paid templates

------------------------------------------------------------------------

## License

MIT (unless you decide otherwise).

------------------------------------------------------------------------

## Links

-   PyColors: https://pycolors.io
-   Starters: https://pycolors.io/starters
