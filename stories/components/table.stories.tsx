import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  TableLoading,
  Badge,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableEmpty,
  TableHead,
  TableHeader,
  TableRow,
} from "../../src/index.js";

const meta = {
  id: "components-table",
  title: "Components/Data display/Table",
  component: Table,
  parameters: {
    docs: {
      description: {
        component:
          "Semantic headers and caption with separate data, empty, loading and error states. [Usage and accessibility](https://pycolors.io/docs/ui/table).",
      },
    },
    controls: { include: [] },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

function TableExample({
  state,
}: {
  state: "populated" | "empty" | "loading" | "error" | "long";
}) {
  return (
    <div className="max-w-3xl">
      <Table>
        <TableCaption>Workspace projects</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead scope="col">Project</TableHead>
            <TableHead scope="col">Owner</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {state === "empty" ? (
            <TableEmpty
              colSpan={2}
              title="No projects"
              description="Create a project to get started."
            />
          ) : state === "loading" ? (
            <TableLoading colSpan={2} />
          ) : state === "error" ? (
            <TableRow>
              <TableCell colSpan={2}>
                <p role="alert">
                  Projects could not be loaded. Try again later.
                </p>
              </TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell>
                {state === "long"
                  ? "A deliberately long project name for checking a bounded horizontal scroll container"
                  : "Documentation"}
              </TableCell>
              <TableCell>Design system team</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
export const Default: Story = {
  render: () => <TableExample state="populated" />,
};
export const Empty: Story = { render: () => <TableExample state="empty" /> };
export const Loading: Story = {
  render: () => <TableExample state="loading" />,
};
export const Error: Story = { render: () => <TableExample state="error" /> };
export const LongContent: Story = {
  render: () => (
    <div className="max-w-xs">
      <TableExample state="long" />
    </div>
  ),
};

export const RowsAndEmptySection: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="max-w-3xl">
      <Table>
        <TableCaption>Current workspace projects.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Project</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Owner</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Marketing site</TableCell>
            <TableCell>
              <Badge variant="success">Healthy</Badge>
            </TableCell>
            <TableCell>Platform team</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Documentation</TableCell>
            <TableCell>
              <Badge variant="warning">Review</Badge>
            </TableCell>
            <TableCell>Design system</TableCell>
          </TableRow>
          <TableEmpty
            colSpan={3}
            title="No archived projects"
            description="Archived projects will appear in this table."
          />
        </TableBody>
      </Table>
    </div>
  ),
};
