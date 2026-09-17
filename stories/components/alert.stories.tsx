import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertIndicator,
  AlertTitle,
} from "../../src/index.js";

const meta = {
  id: "components-alert",
  title: "Components/Feedback/Alert",
  component: Alert,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "info", "success", "warning", "destructive"],
    },
    ariaLive: { control: "select", options: ["off", "polite", "assertive"] },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Static and live status messages with semantic severity variants. [Usage and accessibility](https://pycolors.io/docs/ui/alert).",
      },
    },
    controls: { include: ["variant", "ariaLive"] },
  },
  args: { variant: "default", ariaLive: "off" },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Alert {...args} className="max-w-xl">
      <AlertTitle>Workspace updated</AlertTitle>
      <AlertDescription>Your changes have been saved.</AlertDescription>
    </Alert>
  ),
};

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="grid max-w-3xl gap-3">
      {(
        [
          ["info", "i", "Deployment queued", "The build will start shortly."],
          ["success", "✓", "Changes saved", "Your settings are up to date."],
          ["warning", "!", "Action recommended", "Review two pending checks."],
          [
            "destructive",
            "!",
            "Build failed",
            "Open the validation log for details.",
          ],
        ] as const
      ).map(([variant, indicator, title, description]) => (
        <Alert key={variant} variant={variant} ariaLive="off">
          <AlertIndicator aria-hidden="true">{indicator}</AlertIndicator>
          <AlertContent>
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{description}</AlertDescription>
          </AlertContent>
        </Alert>
      ))}
    </div>
  ),
};

export const LongContent: Story = {
  render: (args) => (
    <Alert {...args} className="max-w-xs">
      <AlertTitle>Some workspace changes could not be saved</AlertTitle>
      <AlertDescription>
        Review the highlighted fields and try again. Your local changes remain
        available while you resolve the problem.
      </AlertDescription>
    </Alert>
  ),
};
export const PoliteStatus: Story = {
  ...Default,
  args: { ariaLive: "polite", variant: "success" },
};
