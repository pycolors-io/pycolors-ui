import * as importedDomMatchers from "@testing-library/jest-dom/matchers";
import * as axeMatchers from "vitest-axe/matchers";
import { cleanup } from "@testing-library/react";
import { afterEach, expect } from "vitest";

// Keep plugins on this workspace's Vitest 5 expect instance.
// NodeNext adds a synthetic default type for jest-dom's export= declaration;
// its ESM entry point exports only the named matcher functions.
const domMatchers: Omit<typeof importedDomMatchers, "default"> =
  importedDomMatchers;
expect.extend({ ...domMatchers, ...axeMatchers });

afterEach(() => {
  cleanup();
});
