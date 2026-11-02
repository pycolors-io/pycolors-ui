import { exerciseDialog } from "../interaction-helpers.js";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../src/index.js";

const meta = {
  tags: ["theme", "responsive"],
  id: "components-dialog",
  title: "Components/Overlays/Dialog",
  component: Dialog,
  parameters: {
    docs: {
      description: {
        component:
          "Modal confirmation and long-content review using Radix focus semantics. [Usage and accessibility](https://pycolors.io/docs/ui/dialog).",
      },
    },
    controls: { include: [] },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

const reviewSections = [
  [
    "Project overview",
    "Confirm who this project is for and the outcome the team is trying to achieve.",
  ],
  [
    "Scope",
    "Separate the work included in this iteration from follow-up requests so the review has a clear boundary.",
  ],
  [
    "Navigation",
    "Walk through the main screens and check that people can always return to their workspace.",
  ],
  [
    "Roles and permissions",
    "Review which actions each role can take, including access to projects and settings.",
  ],
  [
    "Loading and empty states",
    "Check the first visit, pending requests and empty results so every state explains the next step.",
  ],
  [
    "Forms and validation",
    "Review labels, validation messages and the recovery path when a request cannot be completed.",
  ],
  [
    "Keyboard and mobile",
    "Move through the interface with a keyboard and confirm that key actions remain reachable on a small screen.",
  ],
  [
    "Handover",
    "Record the remaining decisions and the checks that the next reviewer should repeat.",
  ],
] as const;

export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    await step("interaction: Default", async () => {
      await exerciseDialog(canvasElement, "Open dialog", "Cancel");
    });
  },
  tags: ["theme"],
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Archive project?</DialogTitle>
          <DialogDescription>
            The project will leave active navigation but can be restored later.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="destructive">Archive project</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const LongContent: Story = {
  play: async ({ canvasElement, step }) => {
    await step("interaction: LongContent", async () => {
      await exerciseDialog(canvasElement, "Review project details", "Done");
    });
    await step("scroll: keep the title and actions in view", async () => {
      const dialog = within(canvasElement.ownerDocument.body).getByRole(
        "dialog",
      );
      const content = within(dialog).getByRole("region", {
        name: "Project review details",
      });
      await expect(content).toHaveAttribute("tabindex", "0");
      content.focus();
      await expect(content).toHaveFocus();
      await waitFor(() =>
        expect(content.scrollHeight).toBeGreaterThan(content.clientHeight),
      );
      content.scrollTop = content.scrollHeight;
      await expect(content.scrollTop).toBeGreaterThan(0);
      const title = within(dialog).getByRole("heading", {
        name: "Project details and review notes",
      });
      const done = within(dialog).getByRole("button", {
        name: /^Done$/,
      });
      await waitFor(() => {
        expect(title.getBoundingClientRect().top).toBeGreaterThanOrEqual(0);
        expect(done.getBoundingClientRect().bottom).toBeLessThanOrEqual(
          canvasElement.ownerDocument.documentElement.clientHeight + 1,
        );
      });
      content.scrollTop = 0;
    });
  },
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Review project details</Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[80dvh] max-w-xl flex-col gap-0 overflow-hidden p-0">
        <DialogHeader className="shrink-0 border-b border-border px-6 py-5 pr-12">
          <DialogTitle>Project details and review notes</DialogTitle>
          <DialogDescription>
            Review the checklist before completing this example handover.
          </DialogDescription>
        </DialogHeader>
        <div
          role="region"
          aria-label="Project review details"
          tabIndex={0}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-5"
        >
          <ul className="space-y-6">
            {reviewSections.map(([title, description]) => (
              <li key={title}>
                <h3 className="text-sm font-medium">{title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <DialogFooter className="mt-0 shrink-0 flex-row items-center justify-between border-t border-border px-6 py-4 sm:justify-between">
          <p className="text-xs leading-5 text-muted-foreground">
            Example content · No changes saved
          </p>
          <DialogClose asChild>
            <Button>Done</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
