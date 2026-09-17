import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../src/index.js";

const meta = {
  id: "components-tabs",
  title: "Components/Navigation/Tabs",
  component: Tabs,
  parameters: {
    docs: {
      description: {
        component:
          "Linked tab panels with controlled selection, sizes and orientation. [Usage and accessibility](https://pycolors.io/docs/ui/tabs).",
      },
    },
    controls: { include: [] },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="max-w-xl">
      <TabsList aria-label="Project sections">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>
              Summary content for the selected project.
            </CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
      <TabsContent value="activity">Recent activity appears here.</TabsContent>
      <TabsContent value="settings">Project settings appear here.</TabsContent>
    </Tabs>
  ),
};

function ControlledTabs({
  vertical = false,
  size = "md",
}: {
  vertical?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const [value, setValue] = React.useState("overview");
  return (
    <Tabs
      value={value}
      onValueChange={setValue}
      orientation={vertical ? "vertical" : "horizontal"}
      className={vertical ? "flex gap-4" : "max-w-md"}
    >
      <TabsList
        aria-label="Workspace sections"
        size={size}
        className={vertical ? "h-auto flex-col" : undefined}
      >
        <TabsTrigger size={size} value="overview">
          Overview
        </TabsTrigger>
        <TabsTrigger size={size} value="activity">
          Activity
        </TabsTrigger>
        <TabsTrigger size={size} value="settings" disabled>
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Overview content.</TabsContent>
      <TabsContent value="activity">Recent synthetic activity.</TabsContent>
    </Tabs>
  );
}
export const Controlled: Story = { render: () => <ControlledTabs /> };
export const Vertical: Story = { render: () => <ControlledTabs vertical /> };
export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      {(["sm", "md", "lg"] as const).map((size) => (
        <ControlledTabs key={size} size={size} />
      ))}
    </div>
  ),
};
