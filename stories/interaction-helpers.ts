import { expect, userEvent, waitFor, within } from "storybook/test";

/** Leave the final open state mounted for the official a11y afterEach scan. */
export async function exerciseDialog(
  canvas: HTMLElement,
  triggerName: string,
  closeName: string,
) {
  const trigger = within(canvas).getByRole("button", { name: triggerName });
  const page = within(document.body);
  await userEvent.click(trigger);
  const dialog = await page.findByRole("dialog");
  await expect(dialog).toHaveAccessibleName();
  await expect(dialog).toHaveAccessibleDescription();
  await waitFor(() =>
    expect(dialog.contains(document.activeElement)).toBe(true),
  );
  const close = within(dialog).getByRole("button", {
    name: closeName,
  });
  close.scrollIntoView({ block: "nearest" });
  await userEvent.click(close);
  await waitFor(() =>
    expect(page.queryByRole("dialog")).not.toBeInTheDocument(),
  );
  await waitFor(() => expect(trigger).toHaveFocus());
  await userEvent.click(trigger);
  await page.findByRole("dialog");
  await userEvent.keyboard("{Escape}");
  await waitFor(() =>
    expect(page.queryByRole("dialog")).not.toBeInTheDocument(),
  );
  await waitFor(() => expect(trigger).toHaveFocus());
  await userEvent.click(trigger);
  await expect(await page.findByRole("dialog")).toBeVisible();
}

export async function exerciseTabs(
  canvas: HTMLElement,
  arrow: "ArrowRight" | "ArrowDown",
) {
  const view = within(canvas);
  const overview = view.getByRole("tab", { name: "Overview" });
  const activity = view.getByRole("tab", { name: "Activity" });
  const disabled = view.getByRole("tab", { name: "Settings" });
  await expect(disabled).toBeDisabled();
  await userEvent.click(overview);
  await userEvent.keyboard(`{${arrow}}`);
  await waitFor(() =>
    expect(activity).toHaveAttribute("aria-selected", "true"),
  );
  const panel = view.getByRole("tabpanel", { name: "Activity" });
  await expect(panel).toHaveAttribute(
    "id",
    activity.getAttribute("aria-controls"),
  );
  await expect(panel).toBeVisible();
  await userEvent.keyboard(`{${arrow}}`);
  await waitFor(() => expect(overview).toHaveFocus());
  await expect(overview).toHaveAttribute("aria-selected", "true");
  await expect(disabled).toHaveAttribute("aria-selected", "false");
}
