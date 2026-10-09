import { expect, userEvent, waitFor, within } from "storybook/test";
import { exerciseDialog } from "../interaction-helpers.js";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  Checkbox,
  CheckboxField,
  CheckboxLabel,
  Input,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../src/index.js";

const meta = {
  tags: ["theme", "responsive"],
  id: "components-sheet",
  title: "Components/Overlays/Sheet",
  component: Sheet,
  parameters: {
    docs: {
      description: {
        component:
          "Edge panels with forms, accessible headings and dismiss controls. [Usage and accessibility](https://pycolors.io/docs/ui/sheet).",
      },
    },
    controls: { include: [] },
  },
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    await step("interaction: Default", async () => {
      await exerciseDialog(canvasElement, "Open filters", "Apply filters");
    });
  },
  tags: ["theme"],
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open filters</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Filter projects</SheetTitle>
          <SheetDescription>
            Narrow the list without leaving the current view.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 grid gap-4">
          <Input label="Owner" placeholder="Search owners" />
          <CheckboxField>
            <Checkbox id="active-only" defaultChecked />
            <CheckboxLabel htmlFor="active-only">
              Active projects only
            </CheckboxLabel>
          </CheckboxField>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button>Apply filters</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const Sides: Story = {
  play: async ({ canvasElement, step }) => {
    await step("interaction: Sides", async () => {
      for (const side of ["top", "right", "bottom", "left"]) {
        await exerciseDialog(canvasElement, `Open ${side}`, "Close panel");
        if (side !== "left") {
          await userEvent.keyboard("{Escape}");
          await waitFor(() =>
            expect(
              within(document.body).queryByRole("dialog"),
            ).not.toBeInTheDocument(),
          );
        }
      }
    });
  },
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button variant="outline">Open {side}</Button>
          </SheetTrigger>
          <SheetContent side={side} className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>{side} panel</SheetTitle>
              <SheetDescription>
                Inspect focus, dismissal and space at narrow widths.
              </SheetDescription>
            </SheetHeader>
            <SheetFooter>
              <SheetClose asChild>
                <Button>Close panel</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  ),
};
