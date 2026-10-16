import { createRef, useState } from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AIComposer, type AIComposerProps } from "../src/index.js";
import { axe } from "vitest-axe";

const base = {
  label: "Message",
  value: "Draft",
  onChange: vi.fn(),
  onSubmit: vi.fn(),
};
afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

function Controlled() {
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(false);
  return (
    <AIComposer
      label="Message"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      busy={busy}
      onSubmit={() => setBusy(true)}
      onStop={() => setBusy(false)}
    />
  );
}

describe("AIComposer", () => {
  it("preserves controlled input, pasted text and draft through submit/stop", () => {
    render(<Controlled />);
    const input = screen.getByRole("textbox");
    input.focus();
    fireEvent.paste(input, {
      clipboardData: { getData: () => "first\nsecond" },
    });
    fireEvent.change(input, { target: { value: "first\nsecond" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(input).toHaveValue("first\nsecond");
    expect(input).toHaveFocus();
    fireEvent.click(screen.getByRole("button", { name: "Stop response" }));
    expect(input).toHaveValue("first\nsecond");
    expect(screen.getByRole("button", { name: "Send message" })).toBeEnabled();
  });

  it("forwards native attributes, textarea ref and caller classes", () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(
      <AIComposer
        {...base}
        ref={ref}
        name="prompt"
        maxLength={800}
        required
        className="min-h-32"
        helperText="Explain your task"
      />,
    );
    const input = screen.getByRole("textbox", { name: /Message/ });
    expect(ref.current).toBe(input);
    expect(input).toHaveAttribute("name", "prompt");
    expect(input).toHaveAttribute("maxlength", "800");
    expect(input).toHaveClass("min-h-32");
    expect(input).not.toHaveClass("min-h-24");
    expect(input).toHaveAccessibleDescription("Explain your task");
    expect(input).toBeRequired();
  });

  it.each([
    { value: "" },
    { value: " \n " },
    { busy: true },
    { disabled: true },
  ])("guards all submission paths for %j", (props) => {
    const submit = vi.fn();
    const { container } = render(
      <AIComposer {...base} {...props} onSubmit={submit} />,
    );
    expect(screen.getByRole("button")).toBeDisabled();
    fireEvent.submit(container.querySelector("form")!);
    fireEvent.keyDown(screen.getByRole("textbox"), { key: "Enter" });
    expect(submit).not.toHaveBeenCalled();
  });

  it("honors native validation before submitting with Enter", () => {
    const submit = vi.fn();
    render(<AIComposer {...base} onSubmit={submit} />);
    const input = screen.getByRole("textbox") as HTMLTextAreaElement;
    input.setCustomValidity("Rejected by the application");
    fireEvent.keyDown(input, { key: "Enter" });
    expect(submit).not.toHaveBeenCalled();
    input.setCustomValidity("");
    fireEvent.keyDown(input, { key: "Enter" });
    expect(submit).toHaveBeenCalledOnce();
  });

  it("submits once per event turn and suppresses held Enter", async () => {
    const submit = vi.fn();
    const { container } = render(<AIComposer {...base} onSubmit={submit} />);
    fireEvent.keyDown(screen.getByRole("textbox"), {
      key: "Enter",
      repeat: true,
    });
    expect(submit).not.toHaveBeenCalled();
    fireEvent.submit(container.querySelector("form")!);
    fireEvent.submit(container.querySelector("form")!);
    expect(submit).toHaveBeenCalledTimes(1);
    await act(async () => {
      await Promise.resolve();
    });
    fireEvent.click(screen.getByRole("button"));
    expect(submit).toHaveBeenCalledTimes(2);
  });

  it.each([
    { shiftKey: true },
    { altKey: true },
    { ctrlKey: true },
    { metaKey: true },
    { isComposing: true },
    { keyCode: 229 },
  ])("preserves modified/IME Enter %j", (keys) => {
    const submit = vi.fn();
    render(<AIComposer {...base} onSubmit={submit} />);
    expect(
      fireEvent.keyDown(screen.getByRole("textbox"), { key: "Enter", ...keys }),
    ).toBe(true);
    expect(submit).not.toHaveBeenCalled();
  });

  it("does not send during composition; resumes after composition ends", () => {
    const submit = vi.fn();
    const start = vi.fn();
    const end = vi.fn();
    render(
      <AIComposer
        {...base}
        onSubmit={submit}
        onCompositionStart={start}
        onCompositionEnd={end}
      />,
    );
    const input = screen.getByRole("textbox");
    fireEvent.compositionStart(input);
    fireEvent.keyDown(input, { key: "Enter" });
    fireEvent.click(screen.getByRole("button"));
    expect(submit).not.toHaveBeenCalled();
    fireEvent.compositionEnd(input);
    fireEvent.keyDown(input, { key: "Enter" });
    expect(submit).toHaveBeenCalledOnce();
    expect(start).toHaveBeenCalledOnce();
    expect(end).toHaveBeenCalledOnce();
  });

  it("honors consumer keyboard cancellation and newline-only mode", () => {
    const submit = vi.fn();
    const { rerender } = render(
      <AIComposer
        {...base}
        onSubmit={submit}
        onKeyDown={(e) => e.preventDefault()}
      />,
    );
    fireEvent.keyDown(screen.getByRole("textbox"), { key: "Enter" });
    rerender(<AIComposer {...base} onSubmit={submit} submitOnEnter={false} />);
    expect(
      fireEvent.keyDown(screen.getByRole("textbox"), { key: "Enter" }),
    ).toBe(true);
    expect(submit).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button"));
    expect(submit).toHaveBeenCalledOnce();
  });

  it("keeps touch-first Enter as newline with explicit submission", () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({ matches: true })),
    );
    const submit = vi.fn();
    render(<AIComposer {...base} onSubmit={submit} />);
    expect(
      fireEvent.keyDown(screen.getByRole("textbox"), { key: "Enter" }),
    ).toBe(true);
    expect(submit).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button"));
    expect(submit).toHaveBeenCalledOnce();
  });

  it("isolates IDs, errors and descriptions and passes accessibility checks", async () => {
    const { container } = render(
      <>
        <AIComposer {...base} error="Try again" aria-describedby="context" />
        <p id="context">Keep your draft</p>
        <AIComposer {...base} label="Another message" />
      </>,
    );
    const inputs = screen.getAllByRole("textbox");
    expect(inputs[0]?.id).not.toBe(inputs[1]?.id);
    expect(inputs[0]).toHaveAccessibleDescription("Try again Keep your draft");
    expect(inputs[0]).toHaveAttribute("aria-invalid", "true");
    expect(await axe(container)).toHaveNoViolations();
  });

  it("exposes stop only while busy and respects disabled", () => {
    const stop = vi.fn();
    const { rerender } = render(
      <AIComposer {...base} onStop={stop} busy stopLabel="Annuler" />,
    );
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    fireEvent.click(screen.getByRole("button", { name: "Annuler" }));
    expect(stop).toHaveBeenCalledOnce();
    rerender(<AIComposer {...base} onStop={stop} busy disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
    rerender(<AIComposer {...base} onStop={stop} />);
    expect(
      screen.queryByRole("button", { name: "Stop response" }),
    ).not.toBeInTheDocument();
  });
});

// The public contract requires synchronous controlled updates, not a defaultValue.
const controlledProps: AIComposerProps = base;
void controlledProps;
// @ts-expect-error A controlled draft must be a string.
const invalidValue: AIComposerProps = { ...base, value: undefined };
void invalidValue;
// @ts-expect-error The composer owns its form; external reassociation is unsupported.
const invalidForm: AIComposerProps = { ...base, form: "external" };
void invalidForm;
