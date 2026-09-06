import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import * as ui from "../src/index.js";
import { expectNoA11yViolations } from "./a11y.js";

describe("@pycolors/ui release-safety behavior coverage", () => {
  describe("Alert", () => {
    it("computes polite, assertive, and off live-region semantics", () => {
      const { rerender } = render(
        <ui.Alert ariaLive="polite">
          <ui.AlertTitle>Settings saved</ui.AlertTitle>
          <ui.AlertDescription>
            Your billing preferences are up to date.
          </ui.AlertDescription>
        </ui.Alert>,
      );

      expect(screen.getByRole("status")).toHaveAttribute("aria-live", "polite");
      expect(
        screen.getByRole("heading", { name: "Settings saved" }),
      ).toBeInTheDocument();
      expect(
        screen.getByText("Your billing preferences are up to date."),
      ).toBeInTheDocument();

      rerender(
        <ui.Alert ariaLive="assertive">
          <ui.AlertTitle>Payment failed</ui.AlertTitle>
        </ui.Alert>,
      );

      expect(screen.getByRole("alert")).toHaveAttribute(
        "aria-live",
        "assertive",
      );

      rerender(
        <ui.Alert ariaLive="off" role="alert">
          <ui.AlertTitle>Static note</ui.AlertTitle>
        </ui.Alert>,
      );

      expect(screen.queryByRole("alert")).toBeNull();
      expect(screen.queryByRole("status")).toBeNull();
      expect(screen.getByText("Static note").closest("[aria-live]")).toBeNull();
    });

    it("renders alert compound parts without accessibility violations", async () => {
      const { container } = render(
        <ui.Alert variant="warning">
          <ui.AlertIndicator aria-hidden="true">!</ui.AlertIndicator>
          <ui.AlertContent>
            <ui.AlertTitle>Review required</ui.AlertTitle>
            <ui.AlertDescription>
              Confirm the settings before continuing.
            </ui.AlertDescription>
          </ui.AlertContent>
        </ui.Alert>,
      );

      expect(screen.getByRole("status")).toHaveTextContent("Review required");
      expect(screen.getByText("!")).toHaveAttribute("aria-hidden", "true");

      await expectNoA11yViolations(container);
    });
  });

  describe("Checkbox", () => {
    it("exposes label, description, checked, and invalid state through public attributes", () => {
      render(
        <ui.CheckboxField>
          <ui.Checkbox
            id="terms"
            checked
            aria-invalid="true"
            aria-describedby="terms-description"
          />
          <ui.CheckboxContent>
            <ui.CheckboxLabel htmlFor="terms">Accept terms</ui.CheckboxLabel>
            <ui.CheckboxDescription id="terms-description">
              Required before creating a workspace.
            </ui.CheckboxDescription>
          </ui.CheckboxContent>
        </ui.CheckboxField>,
      );

      const checkbox = screen.getByRole("checkbox", {
        name: "Accept terms",
      });

      expect(checkbox).toBeChecked();
      expect(checkbox).toHaveAttribute("aria-invalid", "true");
      expect(checkbox).toHaveAccessibleDescription(
        "Required before creating a workspace.",
      );
    });

    it("prevents interaction when disabled and reports unchecked state when enabled", async () => {
      const handleCheckedChange = vi.fn();

      const { container } = render(
        <ui.CheckboxField>
          <ui.Checkbox
            id="newsletter"
            disabled
            checked={false}
            onCheckedChange={handleCheckedChange}
          />
          <ui.CheckboxContent>
            <ui.CheckboxLabel htmlFor="newsletter">
              Product updates
            </ui.CheckboxLabel>
            <ui.CheckboxDescription>
              Receive release notes and migration guidance.
            </ui.CheckboxDescription>
          </ui.CheckboxContent>
        </ui.CheckboxField>,
      );

      const checkbox = screen.getByRole("checkbox", {
        name: "Product updates",
      });

      expect(checkbox).not.toBeChecked();
      expect(checkbox).toBeDisabled();

      fireEvent.click(checkbox);

      expect(handleCheckedChange).not.toHaveBeenCalled();

      await expectNoA11yViolations(container);
    });
  });

  describe("Dialog", () => {
    it("opens with an accessible title and description, then closes from its public close control", async () => {
      render(
        <ui.Dialog>
          <ui.DialogTrigger>Open project dialog</ui.DialogTrigger>
          <ui.DialogContent>
            <ui.DialogHeader>
              <ui.DialogTitle>Create project</ui.DialogTitle>
              <ui.DialogDescription>
                Name the workspace before inviting your team.
              </ui.DialogDescription>
            </ui.DialogHeader>
          </ui.DialogContent>
        </ui.Dialog>,
      );

      fireEvent.click(
        screen.getByRole("button", { name: "Open project dialog" }),
      );

      const dialog = screen.getByRole("dialog", {
        name: "Create project",
      });

      expect(dialog).toHaveAccessibleDescription(
        "Name the workspace before inviting your team.",
      );

      fireEvent.click(screen.getByRole("button", { name: "Close" }));

      await waitFor(() => {
        expect(
          screen.queryByRole("dialog", { name: "Create project" }),
        ).not.toBeInTheDocument();
      });
    });
  });

  describe("Sheet", () => {
    it("opens with an accessible title and description, then closes from its public close control", async () => {
      render(
        <ui.Sheet>
          <ui.SheetTrigger>Open filters</ui.SheetTrigger>
          <ui.SheetContent side="left">
            <ui.SheetHeader>
              <ui.SheetTitle>Project filters</ui.SheetTitle>
              <ui.SheetDescription>
                Narrow the project list by status and owner.
              </ui.SheetDescription>
            </ui.SheetHeader>
          </ui.SheetContent>
        </ui.Sheet>,
      );

      fireEvent.click(screen.getByRole("button", { name: "Open filters" }));

      const sheet = screen.getByRole("dialog", {
        name: "Project filters",
      });

      expect(sheet).toHaveAccessibleDescription(
        "Narrow the project list by status and owner.",
      );

      fireEvent.click(screen.getByRole("button", { name: "Close" }));

      await waitFor(() => {
        expect(
          screen.queryByRole("dialog", { name: "Project filters" }),
        ).not.toBeInTheDocument();
      });
    });
  });

  describe("Tabs", () => {
    it("tracks selected tab state and switches visible tabpanel content", async () => {
      const { container } = render(
        <ui.Tabs defaultValue="overview">
          <ui.TabsList aria-label="Project sections">
            <ui.TabsTrigger value="overview">Overview</ui.TabsTrigger>
            <ui.TabsTrigger value="billing">Billing</ui.TabsTrigger>
          </ui.TabsList>
          <ui.TabsContent value="overview">
            Project health and activity
          </ui.TabsContent>
          <ui.TabsContent value="billing">
            Billing settings and invoices
          </ui.TabsContent>
        </ui.Tabs>,
      );

      const overviewTab = screen.getByRole("tab", { name: "Overview" });
      const billingTab = screen.getByRole("tab", { name: "Billing" });

      expect(overviewTab).toHaveAttribute("aria-selected", "true");
      expect(billingTab).toHaveAttribute("aria-selected", "false");
      expect(screen.getByRole("tabpanel")).toHaveTextContent(
        "Project health and activity",
      );

      fireEvent.mouseDown(billingTab, { button: 0, ctrlKey: false });
      fireEvent.click(billingTab);

      expect(overviewTab).toHaveAttribute("aria-selected", "false");
      expect(billingTab).toHaveAttribute("aria-selected", "true");
      expect(screen.getByRole("tabpanel")).toHaveTextContent(
        "Billing settings and invoices",
      );

      await expectNoA11yViolations(container);
    });
  });

  describe("Pagination", () => {
    it("exposes navigation, active page, previous/next labels, and disabled states", async () => {
      const { container } = render(
        <ui.Pagination>
          <ui.PaginationContent>
            <ui.PaginationItem>
              <ui.PaginationPrevious disabled />
            </ui.PaginationItem>
            <ui.PaginationItem>
              <ui.PaginationLink>1</ui.PaginationLink>
            </ui.PaginationItem>
            <ui.PaginationItem>
              <ui.PaginationLink isActive>2</ui.PaginationLink>
            </ui.PaginationItem>
            <ui.PaginationItem>
              <ui.PaginationEllipsis />
            </ui.PaginationItem>
            <ui.PaginationItem>
              <ui.PaginationNext label="Go to next page" />
            </ui.PaginationItem>
          </ui.PaginationContent>
        </ui.Pagination>,
      );

      expect(
        screen.getByRole("navigation", { name: "Pagination" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Previous page" }),
      ).toBeDisabled();
      expect(screen.getByRole("button", { name: "2" })).toHaveAttribute(
        "aria-current",
        "page",
      );
      expect(
        screen.getByRole("button", { name: "Go to next page" }),
      ).not.toBeDisabled();
      expect(screen.getByText("More pages")).toHaveClass("sr-only");

      await expectNoA11yViolations(container);
    });

    it("builds predictable page ranges for compact, clamped, and ellipsis cases", () => {
      expect(ui.buildPaginationRange({ page: 2, totalPages: 5 })).toEqual([
        { type: "page", value: 1, isActive: false },
        { type: "page", value: 2, isActive: true },
        { type: "page", value: 3, isActive: false },
        { type: "page", value: 4, isActive: false },
        { type: "page", value: 5, isActive: false },
      ]);

      expect(ui.buildPaginationRange({ page: 99, totalPages: 5 })).toEqual([
        { type: "page", value: 1, isActive: false },
        { type: "page", value: 2, isActive: false },
        { type: "page", value: 3, isActive: false },
        { type: "page", value: 4, isActive: false },
        { type: "page", value: 5, isActive: true },
      ]);

      expect(ui.buildPaginationRange({ page: 5, totalPages: 10 })).toEqual([
        { type: "page", value: 1, isActive: false },
        { type: "ellipsis", key: "left" },
        { type: "page", value: 4, isActive: false },
        { type: "page", value: 5, isActive: true },
        { type: "page", value: 6, isActive: false },
        { type: "ellipsis", key: "right" },
        { type: "page", value: 10, isActive: false },
      ]);
    });
  });
});
