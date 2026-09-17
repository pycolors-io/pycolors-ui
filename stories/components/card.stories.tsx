import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../src/index.js";
import { StoryGrid } from "../fixtures.js";

const meta = {
  id: "components-card",
  title: "Components/Layout/Card",
  component: Card,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "muted", "transparent"],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Structural surfaces; native children supply interactive semantics. [Usage and accessibility](https://pycolors.io/docs/ui/card).",
      },
    },
    controls: { include: ["variant"] },
  },
  args: { variant: "default" },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="max-w-xl">
      <CardHeader>
        <CardTitle>Workspace</CardTitle>
        <CardDescription>
          A structural surface with public card parts.
        </CardDescription>
      </CardHeader>
      <CardContent>Project activity appears here.</CardContent>
    </Card>
  ),
};

export const Composition: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <StoryGrid>
      <Card>
        <CardHeader>
          <CardTitle>Workspace health</CardTitle>
          <CardDescription>
            A structural surface composed from public card parts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            All release checks passed for the current workspace.
          </p>
        </CardContent>
        <CardFooter>
          <Button size="sm">View checks</Button>
        </CardFooter>
      </Card>

      <Card asChild interactive variant="muted">
        <a href="#card-example">
          <CardHeader>
            <CardTitle>Interactive composition</CardTitle>
            <CardDescription>
              The native link supplies semantics while Card supplies styling.
            </CardDescription>
          </CardHeader>
        </a>
      </Card>
    </StoryGrid>
  ),
};

export const Variants: Story = {
  render: () => (
    <StoryGrid>
      {(["default", "muted", "transparent"] as const).map((variant) => (
        <Card key={variant} variant={variant}>
          <CardHeader>
            <CardTitle>{variant}</CardTitle>
          </CardHeader>
          <CardContent>Public token-driven surface.</CardContent>
        </Card>
      ))}
    </StoryGrid>
  ),
  parameters: { controls: { disable: true } },
};
export const LongContent: Story = {
  render: (args) => (
    <Card {...args} className="max-w-xs">
      <CardHeader>
        <CardTitle>
          A workspace with a deliberately long project title
        </CardTitle>
        <CardDescription>
          Review how descriptive content wraps at a narrow width without
          truncating essential information.
        </CardDescription>
      </CardHeader>
      <CardContent>
        All information is synthetic and local to this example.
      </CardContent>
    </Card>
  ),
};
