import "@testing-library/jest-dom/vitest";
import "vitest-axe/extend-expect";

// vitest-axe augments the legacy Assertion interface. Bind its existing runtime
// matcher through Vitest 4's shared contract for browser/unit peer contexts.
declare module "vitest" {
  interface Matchers {
    toHaveNoViolations(): void;
  }
}

export {};
