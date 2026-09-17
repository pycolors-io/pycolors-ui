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

export const Default: Story = {
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
export const Controlled: Story = { render: () => <ControlledMenu /> };
