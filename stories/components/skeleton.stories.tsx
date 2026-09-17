import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "../../src/index.js";

const meta = {
  id: "components-skeleton",
  title: "Components/Feedback/Skeleton",
  component: Skeleton,
  parameters: {
    docs: {
      description: {
        component:
          "Decorative loading shapes, including an explicitly labeled busy region. [Usage and accessibility](https://pycolors.io/docs/ui/skeleton).",
      },
    },
    controls: { include: [] },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex max-w-md items-center gap-4">
      <Skeleton circle className="size-12" />
      <div className="grid flex-1 gap-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-full" />
      </div>
    </div>
  ),
};

export const LoadingRegion: Story = {
  render: () => (
    <section
      aria-label="Loading projects"
      aria-busy="true"
      className="max-w-sm space-y-3"
    >
      <span className="sr-only" role="status">
        Loading projects
      </span>
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-20 w-full" />
    </section>
  ),
};
