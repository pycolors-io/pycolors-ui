import { expect } from 'vitest';
import { axe } from 'vitest-axe';
import 'vitest-axe/extend-expect';

// jsdom never loads the compiled Tailwind stylesheet, so every element
// renders with browser-default colors — axe's color-contrast rule has no
// real computed styles to evaluate here and would only produce noise.
// Contrast is verified visually per the project's manual QA checklist;
// every other axe rule still runs and fails the test on a real violation.
const AXE_OPTIONS = {
  rules: {
    'color-contrast': { enabled: false },
  },
} as const;

/**
 * Runs axe-core against a rendered subtree and asserts there are no
 * violations. Shared by every component test that needs an accessibility
 * check, to avoid repeating the axe() + assertion pair in each file.
 */
export async function expectNoA11yViolations(container: Element) {
  const results = await axe(container, AXE_OPTIONS);
  expect(results).toHaveNoViolations();
}
