# Changelog

## 1.1.1

### Patch Changes

- Improve badge foreground color consistency with primary surfaces

## 1.1.0

### Minor Changes

- 52e9c18: Adds Checkbox, Separator, and Textarea components to PyColors UI.

  Introduces new production-ready form and layout primitives with:
  - accessibility-first behavior
  - semantic token integration
  - improved form layout consistency
  - indeterminate checkbox support
  - validation and helper text support
  - comprehensive MDX documentation

## 1.0.6

### Patch Changes

- 243d833: docs: clarify project status and release architecture in README

  Adds a new "Status" section to better communicate:
  - production-readiness
  - automated release pipeline (monorepo → mirror → GitHub Release → npm)
  - active maintenance

  This improves transparency for users and reinforces the distribution model of the library.

## 1.0.5

### Patch Changes

- a0de088: Removes unnecessary prop from UI component example.
  - Simplifies usage by eliminating the redundant bordered prop.
  - Improves clarity for users referencing the example.

## 1.0.4

### Patch Changes

- 0f9d818: Improve release automation and GitHub distribution workflow.
  - Enable automated GitHub Releases for the mirror repository
  - Align versioning between monorepo, npm, and GitHub
  - Strengthen CI pipeline for production-grade publishing

## 1.0.3

### Patch Changes

- 18b87c8: Improve release infrastructure and documentation to support a production-grade distribution workflow.
  - Add automated release pipeline with Changesets
  - Clarify monorepo as the source of truth
  - Enhance README with badges and installation guidance
  - Strengthen repository sync and versioning strategy

All notable changes to **@pycolors/ui** are documented here.

This project follows **Semantic Versioning** and is powered by **Changesets**.

👉 See GitHub Releases for compiled release notes:
https://github.com/pycolors-io/pycolors-ui/releases
