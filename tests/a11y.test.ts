import { expect, test } from "vitest";
import { expectNoA11yViolations } from "./a11y.js";

test("the shared a11y check rejects a button without an accessible name", async () => {
  const container = document.createElement("div");
  container.append(document.createElement("button"));
  document.body.append(container);
  try {
    await expect(expectNoA11yViolations(container)).rejects.toThrow(
      "button-name",
    );
  } finally {
    container.remove();
  }
});
