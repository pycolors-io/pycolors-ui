import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Checkbox, CheckboxLabel } from "../src/index.js";
import { expectNoA11yViolations } from "./a11y.js";

describe("Checkbox native state contract", () => {
  it("preserves mixed state, refs and callbacks in uncontrolled mode", async () => {
    const ref = React.createRef<HTMLButtonElement>();
    const onCheckedChange = vi.fn();
    const { container } = render(
      <div>
        <Checkbox
          id="projects"
          name="projects"
          value="all"
          defaultChecked="indeterminate"
          onCheckedChange={onCheckedChange}
          ref={ref}
        />
        <CheckboxLabel htmlFor="projects">Select projects</CheckboxLabel>
      </div>,
    );
    const checkbox = screen.getByRole("checkbox", { name: "Select projects" });
    expect(ref.current).toBe(checkbox);
    expect(checkbox).toBePartiallyChecked();
    await expectNoA11yViolations(container);

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(onCheckedChange).toHaveBeenLastCalledWith(true);
  });

  it("preserves the parent's controlled state while requesting a checked selection", () => {
    const onCheckedChange = vi.fn();
    const { rerender } = render(
      <Checkbox
        aria-label="Select projects"
        checked="indeterminate"
        onCheckedChange={onCheckedChange}
      />,
    );
    const checkbox = screen.getByRole("checkbox", { name: "Select projects" });
    fireEvent.click(checkbox);
    expect(onCheckedChange).toHaveBeenLastCalledWith(true);
    expect(checkbox).toBePartiallyChecked();
    rerender(
      <Checkbox
        aria-label="Select projects"
        checked
        onCheckedChange={onCheckedChange}
      />,
    );
    expect(checkbox).toBeChecked();
  });
});
