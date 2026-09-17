import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "../../src/index.js";

const meta = {
  id: "components-toast",
  title: "Components/Feedback/Toast",
  component: Toast,
  parameters: {
    docs: {
      description: {
        component:
          "Triggered status notifications with variant, dismissal and long-message examples. [Usage and accessibility](https://pycolors.io/docs/ui/toast).",
      },
    },
    controls: { include: [] },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

function ToastExample({ long = false }: { long?: boolean }) {
  const toastVariants = [
    "default",
    "success",
    "warning",
    "destructive",
    "info",
  ] as const;
  const [openVariant, setOpenVariant] =
    React.useState<(typeof toastVariants)[number]>("success");
  const [open, setOpen] = React.useState(false);

  return (
    <ToastProvider swipeDirection="right">
      <div className="space-y-2">
        {toastVariants.map((variant) => (
          <Button
            key={variant}
            onClick={() => {
              setOpenVariant(variant);
              setOpen(true);
            }}
            variant="outline"
            size="sm"
          >
            Show {variant} toast
          </Button>
        ))}
      </div>
      <Toast open={open} onOpenChange={setOpen} variant={openVariant}>
        <div>
          <ToastTitle className="font-medium">
            {openVariant.charAt(0).toUpperCase() + openVariant.slice(1)} message
          </ToastTitle>
          <ToastDescription className="text-muted-foreground">
            {long
              ? "The workspace has a deliberately long notification. Review wrapping, dismissal and viewport placement without relying on a short message."
              : `This is a ${openVariant} toast notification.`}
          </ToastDescription>
        </div>
        <Button asChild size="sm" variant="outline">
          <ToastClose>Dismiss</ToastClose>
        </Button>
      </Toast>
      <ToastViewport className="fixed bottom-4 right-4 z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2 outline-none" />
    </ToastProvider>
  );
}

export const Default: Story = {
  render: () => <ToastExample />,
};

export const LongContent: Story = { render: () => <ToastExample long /> };
