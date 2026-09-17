import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../src/index.js";

const meta = {
  id: "components-pagination",
  title: "Components/Navigation/Pagination",
  component: Pagination,
  parameters: {
    docs: {
      description: {
        component:
          "Native link composition and stateful boundary controls. [Usage and accessibility](https://pycolors.io/docs/ui/pagination).",
      },
    },
    controls: { include: [] },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive>2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};

export const LinkComposition: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious asChild>
            <a href="#page-1" />
          </PaginationPrevious>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink asChild>
            <a href="#page-1">1</a>
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink asChild isActive>
            <a href="#page-2">2</a>
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink asChild>
            <a href="#page-3">3</a>
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext asChild>
            <a href="#page-3" />
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};

function ControlledPagination() {
  const [page, setPage] = React.useState(1);
  return (
    <div className="space-y-4">
      <p role="status">Page {page} of 3</p>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            />
          </PaginationItem>
          {[1, 2, 3].map((p) => (
            <PaginationItem key={p}>
              <PaginationLink isActive={page === p} onClick={() => setPage(p)}>
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              disabled={page === 3}
              onClick={() => setPage((p) => p + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
export const BoundaryControls: Story = {
  render: () => <ControlledPagination />,
};
