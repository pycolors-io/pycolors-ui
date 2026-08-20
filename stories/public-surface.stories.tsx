import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertIndicator,
  AlertTitle,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  CheckboxContent,
  CheckboxDescription,
  CheckboxField,
  CheckboxLabel,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  EmptyState,
  Input,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PasswordInput,
  Separator,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Skeleton,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableEmpty,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "../src/index.js";

const meta = {
  title: "UI/Public component surface",
  parameters: {
    docs: {
      description: {
        component:
          "Representative maintained examples for every public @pycolors/ui component family.",
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

function StoryGrid({ children }: React.PropsWithChildren) {
  return (
    <div className="grid w-full max-w-4xl gap-4 sm:grid-cols-2">{children}</div>
  );
}

export const Buttons: Story = {
  render: () => (
    <div className="flex max-w-4xl flex-wrap items-center gap-3">
      {(
        [
          "default",
          "secondary",
          "outline",
          "ghost",
          "destructive",
          "link",
        ] as const
      ).map((variant) => (
        <Button key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
      <Button disabled>Disabled</Button>
    </div>
  ),
};

export const Cards: Story = {
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

export const Checkboxes: Story = {
  render: () => (
    <div className="grid max-w-xl gap-5">
      <CheckboxField>
        <Checkbox id="release-updates" defaultChecked />
        <CheckboxContent>
          <CheckboxLabel htmlFor="release-updates">
            Release updates
          </CheckboxLabel>
          <CheckboxDescription>
            Receive a summary when a new package version is available.
          </CheckboxDescription>
        </CheckboxContent>
      </CheckboxField>

      <CheckboxField>
        <Checkbox id="partial-selection" checked="indeterminate" />
        <CheckboxContent>
          <CheckboxLabel htmlFor="partial-selection">
            Select workspace projects
          </CheckboxLabel>
          <CheckboxDescription>Some projects are selected.</CheckboxDescription>
        </CheckboxContent>
      </CheckboxField>
    </div>
  ),
};

export const Badges: Story = {
  render: () => (
    <div className="flex max-w-3xl flex-wrap items-center gap-3">
      {(
        [
          "default",
          "secondary",
          "muted",
          "outline",
          "success",
          "warning",
          "destructive",
        ] as const
      ).map((variant) => (
        <Badge key={variant} variant={variant}>
          {variant}
        </Badge>
      ))}
    </div>
  ),
};

export const Inputs: Story = {
  render: () => (
    <StoryGrid>
      <Input
        type="email"
        label="Work email"
        placeholder="you@example.com"
        helperText="Used for workspace notifications."
      />
      <Input
        label="Workspace slug"
        defaultValue="PyColors Demo"
        error="Use lowercase letters, numbers, and hyphens only."
      />
      <Input label="Disabled field" defaultValue="Read only" disabled />
    </StoryGrid>
  ),
};

export const Skeletons: Story = {
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

export const EmptyStates: Story = {
  render: () => (
    <div className="max-w-xl">
      <EmptyState
        ariaLive="off"
        icon={
          <span aria-hidden="true" className="text-2xl">
            +
          </span>
        }
        title="No projects yet"
        description="Create a project to start organizing your workspace."
        action={<Button size="sm">Create project</Button>}
      />
    </div>
  ),
};

export const Alerts: Story = {
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

export const Dialogs: Story = {
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

export const Separators: Story = {
  render: () => (
    <div className="grid max-w-xl gap-6">
      <div>
        <p className="text-sm font-medium">Workspace settings</p>
        <Separator className="my-3" />
        <p className="text-sm text-muted-foreground">
          Horizontal decorative separation.
        </p>
      </div>
      <div className="flex h-8 items-center gap-4">
        <span className="text-sm">Profile</span>
        <Separator orientation="vertical" decorative={false} />
        <span className="text-sm">Security</span>
      </div>
    </div>
  ),
};

export const Sheets: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open filters</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Filter projects</SheetTitle>
          <SheetDescription>
            Narrow the list without leaving the current view.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 grid gap-4">
          <Input label="Owner" placeholder="Search owners" />
          <CheckboxField>
            <Checkbox id="active-only" defaultChecked />
            <CheckboxLabel htmlFor="active-only">
              Active projects only
            </CheckboxLabel>
          </CheckboxField>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button>Apply filters</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const DropdownMenus: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open workspace menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Workspace</DropdownMenuLabel>
        <DropdownMenuItem>
          Settings
          <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuCheckboxItem defaultChecked>
          Email notifications
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup defaultValue="editor">
          <DropdownMenuRadioItem value="viewer">Viewer</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="editor">Editor</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const TabSets: Story = {
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

function ToastExample() {
  const [open, setOpen] = React.useState(false);

  return (
    <ToastProvider swipeDirection="right">
      <Button onClick={() => setOpen(true)}>Save changes</Button>
      <Toast open={open} onOpenChange={setOpen} variant="success">
        <div>
          <ToastTitle className="font-medium">Changes saved</ToastTitle>
          <ToastDescription className="text-muted-foreground">
            Workspace settings are up to date.
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

export const Toasts: Story = {
  render: () => <ToastExample />,
};

export const PaginationLinkComposition: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious asChild>
            <a href="/page/1" />
          </PaginationPrevious>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink asChild>
            <a href="/page/1">1</a>
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink asChild isActive>
            <a href="/page/2">2</a>
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink asChild>
            <a href="/page/3">3</a>
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext asChild>
            <a href="/page/3" />
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};

export const PaginationControls: Story = {
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

export const Tables: Story = {
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

export const Textareas: Story = {
  render: () => (
    <StoryGrid>
      <Textarea
        label="Release notes"
        placeholder="Describe the user-facing change"
        helperText="Keep the summary concrete and concise."
      />
      <Textarea
        label="Required context"
        defaultValue="Too short"
        error="Add at least one validation note."
      />
    </StoryGrid>
  ),
};

export const PasswordInputs: Story = {
  render: () => (
    <div className="max-w-md">
      <PasswordInput
        label="Password"
        defaultValue="correct-horse-battery-staple"
        helperText="Use the visibility control to inspect the value."
      />
    </div>
  ),
};
