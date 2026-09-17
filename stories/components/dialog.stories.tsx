import type { Meta, StoryObj } from "@storybook/react-vite";
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

export const Default: Story = {
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
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Review project details</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80dvh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Project details and review notes</DialogTitle>
          <DialogDescription>
            Long content should remain reachable on a small screen.
          </DialogDescription>
        </DialogHeader>
        {Array.from({ length: 12 }, (_, i) => (
          <p key={i}>
            Review note {i + 1}: synthetic project details for checking scroll
            and focus behavior.
          </p>
        ))}
        <DialogFooter>
          <DialogClose asChild>
            <Button>Done</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
