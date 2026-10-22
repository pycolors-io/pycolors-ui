import { createRef } from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import { AIConversation, AIMessage, AIMessageActions } from "../src/index.js";

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("AI conversation primitives", () => {
  it("composes semantic messages and preserves native props, refs and class overrides", async () => {
    const conversation = createRef<HTMLDivElement>();
    const message = createRef<HTMLLIElement>();
    const actions = createRef<HTMLDivElement>();
    const { container } = render(
      <AIConversation
        ref={conversation}
        id="thread"
        className="w-full"
        label="Support"
        messagesLabel="History"
      >
        <AIMessage
          ref={message}
          author="Ada"
          className="py-2"
          title="Question"
          actions={
            <AIMessageActions
              ref={actions}
              value="Hello"
              onCopy={() => {}}
              data-testid="actions"
            />
          }
        >
          Hello {"<script>unsafe()</script>"}
        </AIMessage>
      </AIConversation>,
    );
    expect(conversation.current).toHaveAttribute("id", "thread");
    expect(message.current).toBe(screen.getByRole("listitem"));
    expect(message.current).toHaveClass("py-2");
    expect(message.current).not.toHaveClass("py-6");
    expect(actions.current).toBe(screen.getByTestId("actions"));
    expect(screen.getByRole("group", { name: "Support" })).toHaveAttribute(
      "tabindex",
      "0",
    );
    expect(screen.getByRole("list", { name: "History" })).toBeInTheDocument();
    expect(container.querySelector("script")).toBeNull();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("copies a snapshot once, waits for success and supports localized feedback", async () => {
    let resolve!: () => void;
    const copy = vi.fn(
      () =>
        new Promise<void>((done) => {
          resolve = done;
        }),
    );
    render(
      <AIMessageActions
        value="First"
        onCopy={copy}
        copyLabel="Copier"
        copyAriaLabel="Copier la réponse"
        pendingLabel="En cours"
        successLabel="Copié"
      />,
    );
    const button = screen.getByRole("button", { name: "Copier la réponse" });
    fireEvent.click(button);
    fireEvent.click(button);
    expect(copy).toHaveBeenCalledExactlyOnceWith("First");
    expect(button).toBeDisabled();
    expect(screen.getByRole("status")).toHaveTextContent("En cours");
    await act(async () => resolve());
    expect(button).toBeEnabled();
    expect(screen.getByRole("status")).toHaveTextContent("Copié");
  });

  it("recovers from synchronous and asynchronous copy failures", async () => {
    const copy = vi
      .fn()
      .mockImplementationOnce(() => {
        throw new Error("denied");
      })
      .mockRejectedValueOnce(new Error("denied"))
      .mockResolvedValue(undefined);
    render(<AIMessageActions value="Text" onCopy={copy} />);
    const button = screen.getByRole("button");
    for (let i = 0; i < 2; i++) {
      await act(async () => fireEvent.click(button));
      expect(screen.getByRole("status")).toHaveTextContent("Could not copy");
      expect(button).toBeEnabled();
    }
    await act(async () => fireEvent.click(button));
    expect(screen.getByRole("status")).toHaveTextContent("Copied.");
  });

  it("ignores stale settlements even when content changes back to the same text", async () => {
    let resolve!: () => void;
    const copy = vi.fn(
      () =>
        new Promise<void>((done) => {
          resolve = done;
        }),
    );
    const { rerender, unmount } = render(
      <AIMessageActions value="A" onCopy={copy} />,
    );
    fireEvent.click(screen.getByRole("button"));
    rerender(<AIMessageActions value="B" onCopy={copy} />);
    rerender(<AIMessageActions value="A" onCopy={copy} />);
    await act(async () => resolve());
    expect(screen.getByRole("status")).toBeEmptyDOMElement();
    fireEvent.click(screen.getByRole("button"));
    unmount();
    await act(async () => resolve());
  });

  it("does not call the consumer for empty or disabled actions", () => {
    const copy = vi.fn();
    const { rerender } = render(<AIMessageActions value="" onCopy={copy} />);
    fireEvent.click(screen.getByRole("button"));
    rerender(<AIMessageActions value="Text" disabled onCopy={copy} />);
    fireEvent.click(screen.getByRole("button"));
    expect(copy).not.toHaveBeenCalled();
  });

  it("preserves reading position across updates and restores focus on jump", () => {
    const view = (text: string) => (
      <AIConversation jumpLabel="Latest">
        <AIMessage author="Assistant">{text}</AIMessage>
      </AIConversation>
    );
    const { rerender } = render(view("First"));
    const viewport = screen.getByRole("group", { name: "Conversation" });
    Object.defineProperties(viewport, {
      scrollHeight: { configurable: true, value: 1000 },
      clientHeight: { configurable: true, value: 200 },
    });
    viewport.scrollTop = 100;
    fireEvent.scroll(viewport);
    rerender(view("More text"));
    expect(viewport.scrollTop).toBe(100);
    fireEvent.click(screen.getByRole("button", { name: "Latest" }));
    expect(viewport.scrollTop).toBe(1000);
    expect(viewport).toHaveFocus();
    Object.defineProperty(viewport, "scrollHeight", { value: 1200 });
    rerender(view("Even more"));
    expect(viewport.scrollTop).toBe(1200);
  });

  it("observes content and viewport resize without stealing a reader's position", () => {
    let notify!: () => void;
    const disconnect = vi.fn();
    const observe = vi.fn();
    vi.stubGlobal(
      "ResizeObserver",
      class {
        constructor(callback: () => void) {
          notify = callback;
        }
        observe = observe;
        disconnect = disconnect;
      },
    );
    const { unmount } = render(
      <AIConversation>
        <AIMessage author="Assistant">Text</AIMessage>
      </AIConversation>,
    );
    const viewport = screen.getByRole("group");
    Object.defineProperties(viewport, {
      scrollHeight: { configurable: true, value: 1000 },
      clientHeight: { configurable: true, value: 200 },
    });
    act(() => notify());
    expect(viewport.scrollTop).toBe(1000);
    viewport.scrollTop = 100;
    fireEvent.scroll(viewport);
    Object.defineProperty(viewport, "scrollHeight", { value: 1300 });
    act(() => notify());
    expect(viewport.scrollTop).toBe(100);
    expect(observe).toHaveBeenCalledTimes(2);
    unmount();
    expect(disconnect).toHaveBeenCalledOnce();
  });
});
