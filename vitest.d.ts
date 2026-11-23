import "vitest";
import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";
import type { AxeMatchers } from "vitest-axe/matchers";

// Match Vitest 5's public contract, including the return type of promise assertions.
declare module "vitest" {
  interface Matchers<
    R extends void | Promise<void> = void | Promise<void>,
    T = unknown,
  > extends TestingLibraryMatchers<T, R> {
    toHaveNoViolations(
      ...args: Parameters<AxeMatchers["toHaveNoViolations"]>
    ): R;
  }
}

export {};
