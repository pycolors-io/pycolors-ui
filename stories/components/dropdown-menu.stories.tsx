import { expect, userEvent, waitFor, within } from "storybook/test";
import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../../src/index.js";

const meta = {
  tags: ["theme", "responsive"],
  id: "components-dropdown-menu",
  title: "Components/Overlays/DropdownMenu",
  component: DropdownMenu,
  parameters: {
    docs: {
      description: {
        component:
          "Action, checkbox and radio items with native Radix keyboard behavior. [Usage and accessibility](https://pycolors.io/docs/ui/dropdown-menu).",
      },
    },
    controls: { include: [] },
  },
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// Local axe 4.12 / Radix Menu 2.1.17 exception: the background is hidden by
// Radix and unreachable through its focus trap. Keep the rule on menu content.
// Owner: UI/QA maintainers; #418; review/remove by 2026-10-17. See README ledger.
const modalBackgroundA11y = {
  config: {
    rules: [
      {
        id: "aria-hidden-focus",
        selector: '[aria-hidden="true"]:not([data-aria-hidden="true"])',
      },
    ],
  },
};

async function assertModalFocus(menu: HTMLElement, trigger: HTMLElement) {
  // Exercise the real focus trap: attempting to focus the hidden trigger must
  // immediately redirect focus inside the menu, including programmatic focus.
  trigger.focus();
  await waitFor(() =>
    expect(
      menu.contains(document.activeElement),
      "menu/programmatic focus containment",
    ).toBe(true),
  );
  await userEvent.tab();
  await expect(
    menu.contains(document.activeElement),
    "menu/Tab containment",
  ).toBe(true);
  await userEvent.tab({ shift: true });
  await expect(
    menu.contains(document.activeElement),
    "menu/Shift+Tab containment",
  ).toBe(true);
}

export const Default: Story = {
  parameters: { a11y: modalBackgroundA11y },
  play: async ({ canvasElement, step }) => {
    await step("interaction: Default", async () => {
      const trigger = within(canvasElement).getByRole("button", {
        name: "Open workspace menu",
      });
      const page = within(document.body);
      trigger.focus();
      await userEvent.keyboard("{Enter}");
      const menu = await page.findByRole("menu");
      await expect(menu).toBeVisible();
      await assertModalFocus(menu, trigger);
      await userEvent.keyboard("{Escape}");
      await waitFor(() =>
        expect(page.queryByRole("menu")).not.toBeInTheDocument(),
      );
      await waitFor(() => expect(trigger).toHaveFocus());
      await userEvent.keyboard("{Enter}");
      await expect(await page.findByRole("menu")).toBeVisible();
    });
  },
  tags: ["theme"],
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open workspace menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Workspace</DropdownMenuLabel>
        <DropdownMenuItem>
          Settings
          <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuCheckboxItem defaultChecked>
          Email notifications
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup defaultValue="editor">
          <DropdownMenuRadioItem value="viewer">Viewer</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="editor">Editor</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

function ControlledMenu() {
  const [notifications, setNotifications] = React.useState(true);
  const [role, setRole] = React.useState("editor");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Change preferences</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Workspace preferences</DropdownMenuLabel>
        <DropdownMenuCheckboxItem
          checked={notifications}
          onCheckedChange={setNotifications}
        >
          Notifications
        </DropdownMenuCheckboxItem>
        <DropdownMenuRadioGroup value={role} onValueChange={setRole}>
          <DropdownMenuRadioItem value="viewer">Viewer</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="editor">Editor</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuItem disabled>
          Delete workspace (unavailable)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export const Controlled: Story = {
  parameters: { a11y: modalBackgroundA11y },
  play: async ({ canvasElement, step }) => {
    await step("interaction: Controlled", async () => {
      const trigger = within(canvasElement).getByRole("button", {
        name: "Change preferences",
      });
      const page = within(document.body);
      trigger.focus();
      await userEvent.keyboard("{Enter}");
      const menu = await page.findByRole("menu");
      await expect(
        within(menu).getByRole("menuitem", {
          name: "Delete workspace (unavailable)",
        }),
      ).toHaveAttribute("aria-disabled", "true");
      await userEvent.keyboard("{End}");
      await waitFor(() =>
        expect(
          page.getByRole("menuitemradio", { name: "Editor" }),
        ).toHaveFocus(),
      );
      await userEvent.keyboard("{ArrowUp}{Enter}");
      await waitFor(() =>
        expect(page.queryByRole("menu")).not.toBeInTheDocument(),
      );
      await userEvent.click(trigger);
      await expect(
        await page.findByRole("menuitemradio", { name: "Viewer" }),
      ).toHaveAttribute("aria-checked", "true");
      await userEvent.click(
        page.getByRole("menuitemcheckbox", { name: "Notifications" }),
      );
      await userEvent.click(trigger);
      await expect(
        await page.findByRole("menuitemcheckbox", { name: "Notifications" }),
      ).toHaveAttribute("aria-checked", "false");
      await assertModalFocus(await page.findByRole("menu"), trigger);
    });
  },
  render: () => <ControlledMenu />,
};
