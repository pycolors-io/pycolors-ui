![npm](https://img.shields.io/npm/v/@pycolors/ui)
![downloads](https://img.shields.io/npm/dm/@pycolors/ui)
![license](https://img.shields.io/npm/l/@pycolors/ui)

# @pycolors/ui

Production-ready UI primitives for modern SaaS apps — built for
**speed**, **consistency**, and **real-world patterns**.

👉 Docs: https://pycolors.io/docs \
👉 Discussions: https://github.com/pycolors-io/pycolors-ui/discussions

------------------------------------------------------------------------

## Status

✅ Production-ready for modern SaaS starters\
⚡ Actively maintained\
🔁 Automated releases from the PyColors monorepo

------------------------------------------------------------------------

> ⚠️ **Read-only mirror**
>
> This repository is automatically synced from the **PyColors
> monorepo**.\
> **Source of truth:**
> https://github.com/pycolors-io/pycolors/tree/main/packages/ui
>
> You can safely open **Issues and Discussions here** --- they are part
> of the public community surface.

------------------------------------------------------------------------

## Why PyColors UI?

PyColors UI is a **documentation-first design system** focused on one
goal:

👉 **Help developers ship SaaS interfaces faster.**

It prioritizes:

-   clarity over cleverness
-   consistency over trendiness
-   production readiness over demos

If it helps you ship faster, it belongs here.

------------------------------------------------------------------------

## Community 💬

Questions, feedback, ideas, or showcase your product:

👉 https://github.com/pycolors-io/pycolors-ui/discussions

We especially love seeing **real products built with PyColors**.

------------------------------------------------------------------------

## Release & publishing

This repository is a **distribution mirror**.

-   NPM publishing happens from the **PyColors monorepo** (Changesets)
-   This mirror receives version bumps + CHANGELOG via sync PRs
-   A GitHub Release is created only when the mirror `main` branch and npm both
    expose the same `@pycolors/ui` version

If you want to propose changes, contribute to the monorepo:
https://github.com/pycolors-io/pycolors/tree/main/packages/ui

------------------------------------------------------------------------

## Install

``` bash
pnpm add @pycolors/ui
# or
npm i @pycolors/ui
# or
yarn add @pycolors/ui
```

------------------------------------------------------------------------

## Peer dependencies

``` bash
pnpm add react react-dom lucide-react
```

------------------------------------------------------------------------

## Quick usage

``` tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from "@pycolors/ui";

export function Example() {
  return (
    <Card className="p-4">
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

------------------------------------------------------------------------

## What's inside (v1)

Starter-grade components focused on real SaaS interfaces:

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

The library is intentionally **small and starter-first**:\
ship fast → expand with real usage.

------------------------------------------------------------------------

## Design approach

PyColors UI is not just components.\
It's a **product system** built around real SaaS needs:

-   predictable layout primitives
-   consistent tokens + spacing
-   real data states (loading / empty / error)
-   B2B SaaS patterns (members, billing, settings, projects)

------------------------------------------------------------------------

## Roadmap

Next steps:

-   richer form primitives (Select, Checkbox, Radio, Switch)
-   advanced SaaS patterns
-   Pro layer for premium starters & templates

Full roadmap → https://pycolors.io/roadmap

------------------------------------------------------------------------

## License

MIT

------------------------------------------------------------------------

## Links

Website → https://pycolors.io \
Docs → https://pycolors.io/docs \
Starters → https://pycolors.io/starters \
Roadmap → https://pycolors.io/roadmap \
Discussions → https://github.com/pycolors-io/pycolors-ui/discussions
