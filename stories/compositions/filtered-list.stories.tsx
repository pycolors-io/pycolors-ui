import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { useRef, useState } from "react";
import {
  Button,
  EmptyState,
  Input,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../src/index.js";

const projects = [
  { id: "atlas", name: "Atlas", description: "Design system exploration" },
  { id: "beacon", name: "Beacon", description: "Documentation workspace" },
  { id: "cedar", name: "Cedar", description: "Customer portal prototype" },
  { id: "delta", name: "Delta", description: "Analytics interface study" },
  { id: "ember", name: "Ember", description: "Planning board example" },
  { id: "fjord", name: "Fjord", description: "Team workspace concept" },
] as const;
const pageSize = 3;

function FilteredList({
  initialQuery = "",
  initialPage = 1,
}: {
  initialQuery?: string;
  initialPage?: number;
}) {
  const search = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);
  const matches = projects.filter((project) =>
    project.name.toLowerCase().includes(query.trim().toLowerCase()),
  );
  const totalPages = Math.max(1, Math.ceil(matches.length / pageSize));
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const visible = matches.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
  const clearSearch = () => {
    setQuery("");
    setPage(1);
    search.current?.focus();
  };

  return (
    <section aria-label="Filter local projects" className="max-w-2xl space-y-5">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Projects</h2>
        <p className="text-sm text-muted-foreground">
          Search and paginate a synthetic local list. No service is connected.
        </p>
      </div>
      <Input
        ref={search}
        type="search"
        label="Search projects"
        placeholder="Search by project name"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setPage(1);
        }}
      />
      <p role="status" className="text-sm text-muted-foreground">
        {matches.length} {matches.length === 1 ? "project" : "projects"}
        {matches.length ? (
          <span>
            {" "}
            · Page {currentPage} of {totalPages}
          </span>
        ) : null}
      </p>
      {matches.length ? (
        <>
          <ul
            aria-label="Projects"
            className="divide-y divide-border rounded-md border border-border bg-card"
          >
            {visible.map((project) => (
              <li key={project.id} className="space-y-1 p-4">
                <h3 className="text-sm font-medium">{project.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
              </li>
            ))}
          </ul>
          <Pagination aria-label="Project pages">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className="min-h-11 min-w-11"
                  disabled={currentPage === 1}
                  onClick={() => setPage(currentPage - 1)}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (number) => (
                  <PaginationItem key={number}>
                    <PaginationLink
                      className="min-h-11 min-w-11"
                      aria-label={`Page ${number}`}
                      isActive={currentPage === number}
                      onClick={() => setPage(number)}
                    >
                      {number}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}
              <PaginationItem>
                <PaginationNext
                  className="min-h-11 min-w-11"
                  disabled={currentPage === totalPages}
                  onClick={() => setPage(currentPage + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      ) : (
        <EmptyState
          ariaLive="off"
          title="No matching projects"
          description="Try another name or clear the search to restore the local list."
          action={<Button onClick={clearSearch}>Clear search</Button>}
        />
      )}
    </section>
  );
}

const source = `"use client";

import { useRef, useState } from "react";
import {
  Button,
  EmptyState,
  Input,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@pycolors/ui";

const projects = [
  { id: "atlas", name: "Atlas", description: "Design system exploration" },
  { id: "beacon", name: "Beacon", description: "Documentation workspace" },
  { id: "cedar", name: "Cedar", description: "Customer portal prototype" },
  { id: "delta", name: "Delta", description: "Analytics interface study" },
  { id: "ember", name: "Ember", description: "Planning board example" },
  { id: "fjord", name: "Fjord", description: "Team workspace concept" },
] as const;
const pageSize = 3;

export default function FilteredList({
  initialQuery = "",
  initialPage = 1,
}: {
  initialQuery?: string;
  initialPage?: number;
}) {
  const search = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);
  const matches = projects.filter((project) =>
    project.name.toLowerCase().includes(query.trim().toLowerCase()),
  );
  const totalPages = Math.max(1, Math.ceil(matches.length / pageSize));
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const visible = matches.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
  const clearSearch = () => {
    setQuery("");
    setPage(1);
    search.current?.focus();
  };

  return (
    <section aria-label="Filter local projects" className="max-w-2xl space-y-5">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Projects</h2>
        <p className="text-sm text-muted-foreground">
          Search and paginate a synthetic local list. No service is connected.
        </p>
      </div>
      <Input
        ref={search}
        type="search"
        label="Search projects"
        placeholder="Search by project name"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setPage(1);
        }}
      />
      <p role="status" className="text-sm text-muted-foreground">
        {matches.length} {matches.length === 1 ? "project" : "projects"}
        {matches.length ? (
          <span> · Page {currentPage} of {totalPages}</span>
        ) : null}
      </p>
      {matches.length ? (
        <>
          <ul
            aria-label="Projects"
            className="divide-y divide-border rounded-md border border-border bg-card"
          >
            {visible.map((project) => (
              <li key={project.id} className="space-y-1 p-4">
                <h3 className="text-sm font-medium">{project.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
              </li>
            ))}
          </ul>
          <Pagination aria-label="Project pages">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className="min-h-11 min-w-11"
                  disabled={currentPage === 1}
                  onClick={() => setPage(currentPage - 1)}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (number) => (
                  <PaginationItem key={number}>
                    <PaginationLink
                      className="min-h-11 min-w-11"
                      aria-label={\`Page \${number}\`}
                      isActive={currentPage === number}
                      onClick={() => setPage(number)}
                    >
                      {number}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}
              <PaginationItem>
                <PaginationNext
                  className="min-h-11 min-w-11"
                  disabled={currentPage === totalPages}
                  onClick={() => setPage(currentPage + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      ) : (
        <EmptyState
          ariaLive="off"
          title="No matching projects"
          description="Try another name or clear the search to restore the local list."
          action={<Button onClick={clearSearch}>Clear search</Button>}
        />
      )}
    </section>
  );
}
`;

const meta = {
  id: "compositions-filtered-list",
  title: "Compositions/Filtered list",
  component: FilteredList,
  tags: ["theme", "responsive"],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component:
          "Synthetic project search, page boundaries and empty-result recovery using public primitives. [Composition](https://pycolors.io/docs/ui/composition).",
      },
      source: { code: source, language: "tsx" },
    },
  },
} satisfies Meta<typeof FilteredList>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <FilteredList />,
  play: async ({ canvasElement, globals }) => {
    if (globals.runStoryInteractions !== true) return;
    const view = within(canvasElement);
    const search = view.getByRole("searchbox", { name: "Search projects" });
    await expect(
      view.getByRole("button", { name: "Previous page" }),
    ).toBeDisabled();
    const secondPage = view.getByRole("button", {
      name: "Page 2",
    });
    await userEvent.click(secondPage);
    await expect(secondPage).toHaveFocus();
    await expect(secondPage).toHaveAttribute("aria-current", "page");
    await expect(view.getByRole("heading", { name: "Delta" })).toBeVisible();
    await expect(
      view.queryByRole("heading", { name: "Atlas" }),
    ).not.toBeInTheDocument();
    await expect(
      view.getByRole("button", { name: "Next page" }),
    ).toBeDisabled();
    await userEvent.type(search, "Atlas");
    await expect(view.getByRole("status")).toHaveTextContent(
      "1 project · Page 1 of 1",
    );
    await expect(view.getByRole("heading", { name: "Atlas" })).toBeVisible();
    await userEvent.clear(search);
    await userEvent.type(search, "unmatched");
    await expect(
      view.getByRole("heading", { name: "No matching projects" }),
    ).toBeVisible();
    await expect(view.getByRole("status")).toHaveTextContent(/^0 projects$/);
    await expect(
      view.queryByRole("navigation", { name: "Project pages" }),
    ).not.toBeInTheDocument();
    await userEvent.click(view.getByRole("button", { name: "Clear search" }));
    await expect(search).toHaveValue("");
    await expect(search).toHaveFocus();
    await expect(view.getByRole("button", { name: "Page 1" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    await expect(view.getByRole("heading", { name: "Atlas" })).toBeVisible();
  },
};

export const EmptyResults: Story = {
  render: () => <FilteredList initialQuery="unmatched" />,
  parameters: {
    docs: {
      source: {
        code: source.replace('initialQuery = ""', 'initialQuery = "unmatched"'),
        language: "tsx",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const view = within(canvasElement);
    await expect(
      view.getByRole("heading", { name: "No matching projects" }),
    ).toBeVisible();
    await expect(view.getByRole("status")).toHaveTextContent(/^0 projects$/);
    await expect(
      view.getByRole("searchbox", { name: "Search projects" }),
    ).toHaveValue("unmatched");
  },
};

export const SecondPage: Story = {
  render: () => <FilteredList initialPage={2} />,
  parameters: {
    docs: {
      source: {
        code: source.replace("initialPage = 1", "initialPage = 2"),
        language: "tsx",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const view = within(canvasElement);
    await expect(view.getByRole("button", { name: "Page 2" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    await expect(view.getByRole("heading", { name: "Delta" })).toBeVisible();
    await expect(
      view.getByRole("button", { name: "Next page" }),
    ).toBeDisabled();
  },
};
