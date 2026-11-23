/** Public consumer examples: package imports only, never Storybook fixtures. */
type ExampleOptions = {
  react?: string;
  setup?: string;
  helpers?: string;
  client?: boolean;
};

function example(
  names: string,
  markup: string,
  { react, setup, helpers, client = false }: ExampleOptions = {},
): string {
  const content = [markup, setup, helpers].filter(Boolean).join("\n");
  const usedNames = names
    .split(",")
    .map((name) => name.trim())
    .filter((name) => new RegExp(`\\b${name}\\b`).test(content))
    .join(", ");
  return [
    react || client ? '"use client";\n' : "",
    react ? `import { ${react} } from "react";` : "",
    `import { ${usedNames} } from "@pycolors/ui";`,
    "",
    helpers ? `${helpers}\n` : "",
    "export default function Example() {",
    setup
      ? setup
          .split("\n")
          .map((line) => `  ${line}`)
          .join("\n")
      : "",
    "  return (",
    markup
      .split("\n")
      .map((line) => `    ${line}`)
      .join("\n"),
    "  );",
    "}",
  ]
    .filter((line, index, lines) => line !== "" || lines[index - 1] !== "")
    .join("\n")
    .trim();
}

const examples: Record<string, string> = {};
function family(name: string, stories: Record<string, string>): void {
  for (const [story, code] of Object.entries(stories))
    examples[`components-${name}--${story}`] = code;
}

family("button", {
  default: example("Button", '<Button type="button">Save changes</Button>'),
  variants: example(
    "Button",
    `<div className="flex flex-wrap gap-3">
  {(["default", "secondary", "outline", "ghost", "destructive", "link"] as const).map((variant) => (
    <Button key={variant} type="button" variant={variant}>{variant}</Button>
  ))}
  <Button disabled>Disabled</Button>
</div>`,
  ),
  sizes: example(
    "Button",
    `<div className="flex flex-wrap items-center gap-3">
  {(["sm", "default", "lg"] as const).map((size) => (
    <Button key={size} type="button" size={size}>{size}</Button>
  ))}
  {(["icon-sm", "icon", "icon-lg"] as const).map((size) => (
    <Button key={size} type="button" size={size} aria-label={\`Add project (\${size})\`}>
      <span aria-hidden="true">+</span>
    </Button>
  ))}
</div>`,
  ),
  disabled: example("Button", "<Button disabled>Save changes</Button>"),
  "loading-composition": example(
    "Button",
    '<Button disabled aria-busy="true">Saving…</Button>',
  ),
  "native-link": example(
    "Button",
    `<Button asChild>
  <a href="https://pycolors.io/docs/ui/button">Read Button documentation</a>
</Button>`,
  ),
});

family("badge", {
  default: example(
    "Badge",
    '<Badge variant="default" size="md">Active</Badge>',
  ),
  variants: example(
    "Badge",
    `<div className="flex flex-wrap gap-3">
  {(["default", "secondary", "muted", "outline", "success", "warning", "destructive", "info"] as const).map((variant) => (
    <Badge key={variant} variant={variant}>{variant}</Badge>
  ))}
</div>`,
  ),
  sizes: example(
    "Badge",
    `<div className="flex flex-wrap gap-3">
  {(["sm", "md", "lg"] as const).map((size) => (
    <Badge key={size} size={size}>{size}</Badge>
  ))}
</div>`,
  ),
  "long-content": example(
    "Badge",
    `<Badge className="max-w-xs h-auto whitespace-normal">
  Waiting for the workspace administrator to review this request
</Badge>`,
  ),
  "native-link": example(
    "Badge",
    `<Badge asChild variant="outline">
  <a href="https://pycolors.io/docs/ui/badge">Badge documentation</a>
</Badge>`,
  ),
});

const alertNames =
  "Alert, AlertContent, AlertDescription, AlertIndicator, AlertTitle";
function alertExample(variant: string, live: string, long = false): string {
  return example(
    alertNames,
    `<Alert variant="${variant}" ariaLive="${live}" className="${long ? "max-w-xs" : "max-w-xl"}">
  <AlertTitle>${long ? "Some workspace changes could not be saved" : "Workspace updated"}</AlertTitle>
  <AlertDescription>${long ? "Review the highlighted fields and try again. Your local changes remain available." : "Your changes have been saved."}</AlertDescription>
</Alert>`,
  );
}
family("alert", {
  default: alertExample("default", "off"),
  variants: example(
    alertNames,
    `<div className="grid gap-3">
  {(["info", "success", "warning", "destructive"] as const).map((variant) => (
    <Alert key={variant} variant={variant} ariaLive="off">
      <AlertIndicator aria-hidden="true">!</AlertIndicator>
      <AlertContent>
        <AlertTitle>{variant} notification</AlertTitle>
        <AlertDescription>Review the current workspace status.</AlertDescription>
      </AlertContent>
    </Alert>
  ))}
</div>`,
  ),
  "long-content": alertExample("default", "off", true),
  "polite-status": alertExample("success", "polite"),
});

const cardNames =
  "Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle";
family("card", {
  default: example(
    cardNames,
    `<Card className="max-w-xl">
  <CardHeader>
    <CardTitle>Workspace</CardTitle>
    <CardDescription>A structural surface with public card parts.</CardDescription>
  </CardHeader>
  <CardContent>Project activity appears here.</CardContent>
</Card>`,
  ),
  composition: example(
    cardNames,
    `<div className="grid gap-5 sm:grid-cols-2">
  <Card>
    <CardHeader>
      <CardTitle>Workspace health</CardTitle>
      <CardDescription>Public card parts composed into a useful surface.</CardDescription>
    </CardHeader>
    <CardContent>Review the current workspace checks.</CardContent>
    <CardFooter><Button type="button" size="sm">View checks</Button></CardFooter>
  </Card>
  <Card asChild interactive variant="muted">
    <a href="#workspace-details">
      <CardHeader>
        <CardTitle>Interactive composition</CardTitle>
        <CardDescription>A native link supplies navigation semantics.</CardDescription>
      </CardHeader>
    </a>
  </Card>
</div>`,
  ),
  variants: example(
    cardNames,
    `<div className="grid gap-5 sm:grid-cols-3">
  {(["default", "muted", "transparent"] as const).map((variant) => (
    <Card key={variant} variant={variant}>
      <CardHeader><CardTitle>{variant}</CardTitle></CardHeader>
      <CardContent>Public token-driven surface.</CardContent>
    </Card>
  ))}
</div>`,
  ),
  "long-content": example(
    cardNames,
    `<Card className="max-w-xs">
  <CardHeader>
    <CardTitle>A workspace with a deliberately long project title</CardTitle>
    <CardDescription>Keep essential descriptive content visible at narrow widths.</CardDescription>
  </CardHeader>
  <CardContent>All information is synthetic and local to this example.</CardContent>
</Card>`,
  ),
});

family("input", {
  default: example(
    "Input",
    '<Input type="email" label="Work email" placeholder="you@example.com" size="md" />',
  ),
  states: example(
    "Input",
    `<div className="grid gap-5">
  <Input type="email" label="Work email" placeholder="you@example.com" helperText="Used for workspace notifications." />
  <Input label="Workspace slug" defaultValue="PyColors Demo" error="Use lowercase letters, numbers, and hyphens only." />
  <Input label="Disabled field" defaultValue="Read only" disabled />
</div>`,
  ),
  sizes: example(
    "Input",
    `<div className="grid gap-5">
  {(["sm", "md", "lg"] as const).map((size) => (
    <Input key={size} size={size} label={\`\${size} field\`} placeholder="Workspace name" />
  ))}
</div>`,
  ),
  "read-only": example(
    "Input",
    '<Input label="Workspace ID" defaultValue="workspace-demo-2026" readOnly />',
  ),
  required: example(
    "Input",
    '<Input type="email" label="Work email" placeholder="you@example.com" required />',
  ),
  "long-content": example(
    "Input",
    '<Input label="Workspace name" defaultValue="Research and documentation workspace with a deliberately long descriptive name" />',
  ),
});

family("textarea", {
  default: example(
    "Textarea",
    '<Textarea label="Release notes" placeholder="Describe the change" size="md" resize="vertical" />',
  ),
  states: example(
    "Textarea",
    `<div className="grid gap-5">
  <Textarea label="Release notes" placeholder="Describe the user-facing change" helperText="Keep the summary concrete and concise." />
  <Textarea label="Required context" defaultValue="Too short" error="Add at least one validation note." />
</div>`,
  ),
  sizes: example(
    "Textarea",
    `<div className="grid gap-5">
  {(["sm", "md", "lg"] as const).map((size) => (
    <Textarea key={size} size={size} label={\`\${size} notes\`} />
  ))}
</div>`,
  ),
  disabled: example(
    "Textarea",
    '<Textarea label="Release notes" defaultValue="Notes are unavailable while saving." disabled />',
  ),
  "long-content": example(
    "Textarea",
    `<Textarea
  label="Release notes"
  readOnly
  defaultValue={"These synthetic notes contain several lines of content.\\nReview the long text at a narrow viewport.\\nThe content remains selectable."}
  className="max-w-xs"
/>`,
  ),
});

family("password-input", {
  default: example(
    "PasswordInput",
    '<PasswordInput label="Password" defaultValue="correct-horse-battery-staple" helperText="Use the visibility control to inspect the value." />',
  ),
  error: example(
    "PasswordInput",
    '<PasswordInput label="Password" defaultValue="demo" error="Use a longer password." />',
  ),
  disabled: example(
    "PasswordInput",
    '<PasswordInput label="Password" defaultValue="synthetic-demo-password" disabled />',
  ),
  "read-only": example(
    "PasswordInput",
    '<PasswordInput label="Password" defaultValue="synthetic-demo-password" readOnly />',
  ),
});

const checkboxNames =
  "Button, Checkbox, CheckboxContent, CheckboxDescription, CheckboxField, CheckboxLabel";
function checkboxExample(disabled = false): string {
  return example(
    checkboxNames,
    `<CheckboxField>
  <Checkbox id={id}${disabled ? " disabled" : ""} />
  <CheckboxLabel htmlFor={id}>Release updates</CheckboxLabel>
</CheckboxField>`,
    { react: "useId", setup: "const id = useId();" },
  );
}
family("checkbox", {
  default: checkboxExample(),
  disabled: checkboxExample(true),
  controlled: example(
    checkboxNames,
    `<div className="space-y-3">
  <CheckboxField>
    <Checkbox id={id} checked={checked} onCheckedChange={(value) => setChecked(value === true)} />
    <CheckboxLabel htmlFor={id}>Send release updates</CheckboxLabel>
  </CheckboxField>
  <p role="status">Updates {checked ? "enabled" : "disabled"}</p>
</div>`,
    {
      react: "useId, useState",
      setup:
        "const id = useId();\nconst [checked, setChecked] = useState(false);",
    },
  ),
  states: example(
    checkboxNames,
    `<div className="grid gap-5">
  <CheckboxField>
    <Checkbox id={\`\${id}-checked\`} defaultChecked />
    <CheckboxContent>
      <CheckboxLabel htmlFor={\`\${id}-checked\`}>Release updates</CheckboxLabel>
      <CheckboxDescription>Receive a new-version summary.</CheckboxDescription>
    </CheckboxContent>
  </CheckboxField>
  <CheckboxField>
    <Checkbox id={\`\${id}-partial\`} checked="indeterminate" />
    <CheckboxLabel htmlFor={\`\${id}-partial\`}>Select workspace projects</CheckboxLabel>
  </CheckboxField>
  <CheckboxField>
    <Checkbox id={\`\${id}-terms\`} required error="You must accept the terms before continuing." />
    <CheckboxLabel htmlFor={\`\${id}-terms\`}>Accept the terms</CheckboxLabel>
  </CheckboxField>
  <form className="grid gap-3">
    <CheckboxField>
      <Checkbox id={\`\${id}-local\`} name="projects" value="all" defaultChecked="indeterminate" />
      <CheckboxLabel htmlFor={\`\${id}-local\`}>Select local projects</CheckboxLabel>
    </CheckboxField>
    <Button type="reset" variant="outline">Reset selection</Button>
  </form>
</div>`,
    { react: "useId", setup: "const id = useId();" },
  ),
});

family("empty-state", {
  default: example(
    "EmptyState",
    '<EmptyState title="No projects yet" ariaLive="off" />',
  ),
  "with-action": example(
    "Button, EmptyState",
    `<EmptyState
  ariaLive="off"
  icon={<span aria-hidden="true">+</span>}
  title="No projects yet"
  description="Create a project to start organizing your workspace."
  action={<Button type="button" size="sm">Create project</Button>}
/>`,
  ),
  "long-content": example(
    "EmptyState",
    `<EmptyState
  ariaLive="off"
  title="No projects match all of these filters"
  description="Try a broader search or clear a filter to see more projects in this workspace."
  className="max-w-xs"
/>`,
  ),
});
family("skeleton", {
  default: example(
    "Skeleton",
    `<div className="flex max-w-md items-center gap-4">
  <Skeleton circle className="size-12" />
  <div className="grid flex-1 gap-2">
    <Skeleton className="h-4 w-2/3" />
    <Skeleton className="h-3 w-full" />
  </div>
</div>`,
  ),
  "loading-region": example(
    "Skeleton",
    `<section aria-label="Loading projects" aria-busy="true" className="max-w-sm space-y-3">
  <span className="sr-only" role="status">Loading projects</span>
  <Skeleton className="h-5 w-3/4" />
  <Skeleton className="h-20 w-full" />
</section>`,
  ),
});
family("separator", {
  default: example(
    "Separator",
    `<div className="grid max-w-xl gap-6">
  <div>
    <p>Workspace settings</p>
    <Separator className="my-3" />
    <p>Horizontal decorative separation.</p>
  </div>
  <div className="flex h-8 items-center gap-4">
    <span>Profile</span>
    <Separator orientation="vertical" decorative={false} />
    <span>Security</span>
  </div>
</div>`,
  ),
});

const dialogNames =
  "Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger";
family("dialog", {
  default: example(
    dialogNames,
    `<Dialog>
  <DialogTrigger asChild><Button>Open dialog</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Archive project?</DialogTitle>
      <DialogDescription>The project will leave active navigation but can be restored later.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
      <DialogClose asChild><Button variant="destructive">Archive project</Button></DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
  ),
  "long-content": example(
    dialogNames,
    `<Dialog>
  <DialogTrigger asChild><Button>Review project details</Button></DialogTrigger>
  <DialogContent className="flex max-h-[80dvh] max-w-xl flex-col gap-0 overflow-hidden p-0">
    <DialogHeader className="shrink-0 border-b border-border px-6 py-5 pr-12">
      <DialogTitle>Project details and review notes</DialogTitle>
      <DialogDescription>Review the checklist before completing this example handover.</DialogDescription>
    </DialogHeader>
    <div role="region" aria-label="Project review details" tabIndex={0} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-5">
      <ul className="space-y-6">
        {reviewSections.map(([title, description]) => (
          <li key={title}><h3>{title}</h3><p>{description}</p></li>
        ))}
      </ul>
    </div>
    <DialogFooter className="mt-0 shrink-0 border-t border-border px-6 py-4">
      <DialogClose asChild><Button>Done</Button></DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
    {
      helpers: `const reviewSections = [
  ["Project overview", "Confirm the audience and intended outcome."],
  ["Scope", "Record the work included and remaining follow-ups."],
  ["Navigation", "Check the main screens and return paths."],
  ["Roles", "Review each role's available actions."],
  ["Loading and empty states", "Explain the next step in each state."],
  ["Forms", "Review validation and recovery paths."],
  ["Keyboard and mobile", "Confirm that key actions remain reachable."],
  ["Handover", "Record decisions and verification steps."],
] as const;`,
    },
  ),
});

const sheetNames =
  "Button, Checkbox, CheckboxField, CheckboxLabel, Input, Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger";
family("sheet", {
  default: example(
    sheetNames,
    `<Sheet>
  <SheetTrigger asChild><Button variant="outline">Open filters</Button></SheetTrigger>
  <SheetContent side="right">
    <SheetHeader><SheetTitle>Filter projects</SheetTitle><SheetDescription>Narrow the list without leaving the current view.</SheetDescription></SheetHeader>
    <div className="mt-6 grid gap-4">
      <Input label="Owner" placeholder="Search owners" />
      <CheckboxField>
        <Checkbox id={id} defaultChecked />
        <CheckboxLabel htmlFor={id}>Active projects only</CheckboxLabel>
      </CheckboxField>
    </div>
    <SheetFooter><SheetClose asChild><Button>Apply filters</Button></SheetClose></SheetFooter>
  </SheetContent>
</Sheet>`,
    { react: "useId", setup: "const id = useId();" },
  ),
  sides: example(
    sheetNames,
    `<div className="flex flex-wrap gap-3">
  {(["top", "right", "bottom", "left"] as const).map((side) => (
    <Sheet key={side}>
      <SheetTrigger asChild><Button variant="outline">Open {side}</Button></SheetTrigger>
      <SheetContent side={side} className="overflow-y-auto">
        <SheetHeader><SheetTitle>{side} panel</SheetTitle><SheetDescription>Inspect focus, dismissal and available space.</SheetDescription></SheetHeader>
        <SheetFooter><SheetClose asChild><Button>Close panel</Button></SheetClose></SheetFooter>
      </SheetContent>
    </Sheet>
  ))}
</div>`,
  ),
});

const menuNames =
  "Button, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger";
family("dropdown-menu", {
  default: example(
    menuNames,
    `<DropdownMenu>
  <DropdownMenuTrigger asChild><Button variant="outline">Open workspace menu</Button></DropdownMenuTrigger>
  <DropdownMenuContent align="start">
    <DropdownMenuLabel>Workspace</DropdownMenuLabel>
    <DropdownMenuItem>Settings<DropdownMenuShortcut>⌘,</DropdownMenuShortcut></DropdownMenuItem>
    <DropdownMenuCheckboxItem defaultChecked>Email notifications</DropdownMenuCheckboxItem>
    <DropdownMenuSeparator />
    <DropdownMenuRadioGroup defaultValue="editor">
      <DropdownMenuRadioItem value="viewer">Viewer</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="editor">Editor</DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  </DropdownMenuContent>
</DropdownMenu>`,
  ),
  controlled: example(
    menuNames,
    `<DropdownMenu>
  <DropdownMenuTrigger asChild><Button>Change preferences</Button></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Workspace preferences</DropdownMenuLabel>
    <DropdownMenuCheckboxItem checked={notifications} onCheckedChange={setNotifications}>Notifications</DropdownMenuCheckboxItem>
    <DropdownMenuRadioGroup value={role} onValueChange={setRole}>
      <DropdownMenuRadioItem value="viewer">Viewer</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="editor">Editor</DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
    <DropdownMenuItem disabled>Delete workspace (unavailable)</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    {
      react: "useState",
      setup:
        'const [notifications, setNotifications] = useState(true);\nconst [role, setRole] = useState("editor");',
    },
  ),
});

const tabNames =
  "Card, CardDescription, CardHeader, CardTitle, Tabs, TabsContent, TabsList, TabsTrigger";
function controlledTabs(vertical = false, sizes = false): string {
  const tabs = `<Tabs value={value} onValueChange={setValue} orientation="${vertical ? "vertical" : "horizontal"}" className="${vertical ? "flex gap-4" : "max-w-md"}">
  <TabsList aria-label="Workspace sections"${sizes ? " size={size}" : ""}${vertical ? ' className="h-auto flex-col"' : ""}>
    <TabsTrigger value="overview"${sizes ? " size={size}" : ""}>Overview</TabsTrigger>
    <TabsTrigger value="activity"${sizes ? " size={size}" : ""}>Activity</TabsTrigger>
    <TabsTrigger value="settings"${sizes ? " size={size}" : ""} disabled>Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview content.</TabsContent>
  <TabsContent value="activity">Recent synthetic activity.</TabsContent>
</Tabs>`;
  return example(
    tabNames,
    sizes
      ? `<div className="space-y-6">
  {(["sm", "md", "lg"] as const).map((size) => <div key={size}>${tabs}</div>)}
</div>`
      : tabs,
    {
      react: "useState",
      setup: 'const [value, setValue] = useState("overview");',
    },
  );
}
family("tabs", {
  default: example(
    tabNames,
    `<Tabs defaultValue="overview" className="max-w-xl">
  <TabsList aria-label="Project sections">
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="activity">Activity</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview"><Card><CardHeader><CardTitle>Overview</CardTitle><CardDescription>Summary content for the selected project.</CardDescription></CardHeader></Card></TabsContent>
  <TabsContent value="activity">Recent activity appears here.</TabsContent>
  <TabsContent value="settings">Project settings appear here.</TabsContent>
</Tabs>`,
  ),
  controlled: controlledTabs(),
  vertical: controlledTabs(true),
  sizes: controlledTabs(false, true),
});

const paginationNames =
  "Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious";
family("pagination", {
  default: example(
    paginationNames,
    `<Pagination>
  <PaginationContent>
    <PaginationItem><PaginationPrevious /></PaginationItem>
    <PaginationItem><PaginationLink>1</PaginationLink></PaginationItem>
    <PaginationItem><PaginationLink isActive>2</PaginationLink></PaginationItem>
    <PaginationItem><PaginationLink>3</PaginationLink></PaginationItem>
    <PaginationItem><PaginationEllipsis /></PaginationItem>
    <PaginationItem><PaginationNext /></PaginationItem>
  </PaginationContent>
</Pagination>`,
  ),
  "link-composition": example(
    paginationNames,
    `<Pagination>
  <PaginationContent>
    <PaginationItem><PaginationPrevious asChild><a href="#page-1" /></PaginationPrevious></PaginationItem>
    <PaginationItem><PaginationLink asChild><a href="#page-1">1</a></PaginationLink></PaginationItem>
    <PaginationItem><PaginationLink asChild isActive><a href="#page-2">2</a></PaginationLink></PaginationItem>
    <PaginationItem><PaginationLink asChild><a href="#page-3">3</a></PaginationLink></PaginationItem>
    <PaginationItem><PaginationEllipsis /></PaginationItem>
    <PaginationItem><PaginationNext asChild><a href="#page-3" /></PaginationNext></PaginationItem>
  </PaginationContent>
</Pagination>`,
  ),
  "boundary-controls": example(
    paginationNames,
    `<div className="space-y-4">
  <p role="status">Page {page} of 3</p>
  <Pagination>
    <PaginationContent>
      <PaginationItem><PaginationPrevious disabled={page === 1} onClick={() => setPage((current) => Math.max(1, current - 1))} /></PaginationItem>
      {[1, 2, 3].map((number) => (
        <PaginationItem key={number}><PaginationLink isActive={page === number} onClick={() => setPage(number)}>{number}</PaginationLink></PaginationItem>
      ))}
      <PaginationItem><PaginationNext disabled={page === 3} onClick={() => setPage((current) => Math.min(3, current + 1))} /></PaginationItem>
    </PaginationContent>
  </Pagination>
</div>`,
    { react: "useState", setup: "const [page, setPage] = useState(1);" },
  ),
});

const tableNames =
  "Badge, Table, TableBody, TableCaption, TableCell, TableEmpty, TableHead, TableHeader, TableLoading, TableRow";
function tableExample(
  state: "populated" | "empty" | "loading" | "error" | "long",
): string {
  const content =
    state === "empty"
      ? '<TableEmpty colSpan={2} title="No projects" description="Create a project to get started." />'
      : state === "loading"
        ? "<TableLoading colSpan={2} />"
        : state === "error"
          ? '<TableRow><TableCell colSpan={2}><p role="alert">Projects could not be loaded. Try again later.</p></TableCell></TableRow>'
          : `<TableRow><TableCell>${state === "long" ? "A deliberately long project name for checking a bounded horizontal scroll container" : "Documentation"}</TableCell><TableCell>Design system team</TableCell></TableRow>`;
  return example(
    tableNames,
    `<div className="${state === "long" ? "max-w-xs" : "max-w-3xl"}">
  <Table>
    <TableCaption>Workspace projects</TableCaption>
    <TableHeader><TableRow><TableHead scope="col">Project</TableHead><TableHead scope="col">Owner</TableHead></TableRow></TableHeader>
    <TableBody>${content}</TableBody>
  </Table>
</div>`,
  );
}
family("table", {
  default: tableExample("populated"),
  empty: tableExample("empty"),
  loading: tableExample("loading"),
  error: tableExample("error"),
  "long-content": tableExample("long"),
  "rows-and-empty-section": example(
    tableNames,
    `<Table>
  <TableCaption>Current workspace projects.</TableCaption>
  <TableHeader><TableRow><TableHead scope="col">Project</TableHead><TableHead scope="col">Status</TableHead><TableHead scope="col">Owner</TableHead></TableRow></TableHeader>
  <TableBody>
    <TableRow><TableCell>Marketing site</TableCell><TableCell><Badge variant="success">Healthy</Badge></TableCell><TableCell>Platform team</TableCell></TableRow>
    <TableRow><TableCell>Documentation</TableCell><TableCell><Badge variant="warning">Review</Badge></TableCell><TableCell>Design system</TableCell></TableRow>
    <TableEmpty colSpan={3} title="No archived projects" description="Archived projects will appear in this table." />
  </TableBody>
</Table>`,
  ),
});

function toastExample(
  variant: "default" | "success" | "warning" | "destructive" | "info",
  long = false,
): string {
  return example(
    "Button, Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport",
    `<ToastProvider swipeDirection="right">
  <Button type="button" variant="outline" onClick={() => setOpen(true)}>Show ${variant} toast</Button>
  <Toast open={open} onOpenChange={setOpen} variant="${variant}">
    <div>
      <ToastTitle>${variant === "default" ? "Default" : variant[0]!.toUpperCase() + variant.slice(1)} message</ToastTitle>
      <ToastDescription>${long ? "The workspace has a deliberately long notification. Review wrapping, dismissal and viewport placement without relying on a short message." : `This is a ${variant} toast notification.`}</ToastDescription>
    </div>
    <Button asChild size="sm" variant="outline"><ToastClose>Dismiss</ToastClose></Button>
  </Toast>
  <ToastViewport className="fixed bottom-4 right-4 z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2 outline-none" />
</ToastProvider>`,
    { react: "useState", setup: "const [open, setOpen] = useState(false);" },
  );
}
family("toast", {
  default: toastExample("success"),
  neutral: toastExample("default"),
  warning: toastExample("warning"),
  destructive: toastExample("destructive"),
  "long-content": toastExample("info", true),
});

function composerExample(
  state: "default" | "busy" | "error" | "disabled" | "long",
): string {
  const initial =
    state === "default"
      ? ""
      : state === "long"
        ? "Review the accessible settings screen and explain the tradeoffs.\n".repeat(
            20,
          )
        : state === "error"
          ? "Draft preserved after a failed request."
          : state === "disabled"
            ? "Messaging is unavailable."
            : "Keep this draft while the application is busy.";
  return example(
    "AIComposer",
    `<AIComposer
  label="Message"
  value={value}
  onChange={(event) => setValue(event.target.value)}
  onSubmit={() => setBusy(true)}
  onStop={() => setBusy(false)}
  busy={busy}${state === "disabled" ? "\n  disabled" : ""}${state === "error" ? '\n  error="The application could not send your message. Try again."' : ""}${state === "long" ? '\n  className="max-h-64"\n  submitLabel="Send this message for a detailed review"' : ""}
  helperText="Local example; no model or transport is connected."
/>`,
    {
      react: "useState",
      setup: `const [value, setValue] = useState(${JSON.stringify(initial)});\nconst [busy, setBusy] = useState(${state === "busy"});`,
    },
  );
}
family("ai-composer", {
  default: composerExample("default"),
  busy: composerExample("busy"),
  error: composerExample("error"),
  disabled: composerExample("disabled"),
  "long-content": composerExample("long"),
});

family("ai-conversation", {
  default: example(
    "AIConversation, AIMessage",
    `<AIConversation>
  <AIMessage author="You">What should I build first?</AIMessage>
  <AIMessage author="Assistant">Start with one useful flow.</AIMessage>
</AIConversation>`,
  ),
  "long-conversation": example(
    "AIConversation, AIMessage",
    `<AIConversation viewportClassName="max-h-64">
  {Array.from({ length: 20 }, (_, index) => (
    <AIMessage key={index} author={index % 2 ? "Assistant" : "You"}>
      Sample message {index + 1}. {"Readable content. ".repeat(8)}
    </AIMessage>
  ))}
</AIConversation>`,
  ),
});
family("ai-message", {
  default: example(
    "AIMessage",
    `<ol className="max-w-xl list-none">
  <AIMessage author="Assistant">A fixed example. Your application supplies the content.</AIMessage>
</ol>`,
  ),
  "long-content": example(
    "AIMessage",
    `<ol className="max-w-xl list-none">
  <AIMessage author="Assistant">{"Long_unbroken_message_".repeat(30)}</AIMessage>
</ol>`,
  ),
});
function messageActionsExample(
  state: "default" | "error" | "disabled",
): string {
  return example(
    "AIMessageActions",
    `<AIMessageActions
  value="Sample text"
  onCopy={${state === "error" ? 'async () => { throw new Error("Simulated failure"); }' : "(text) => navigator.clipboard.writeText(text)"}}${state === "disabled" ? "\n  disabled" : ""}
/>`,
    { client: true },
  );
}
family("ai-message-actions", {
  default: messageActionsExample("default"),
  error: messageActionsExample("error"),
  disabled: messageActionsExample("disabled"),
});

function settingsFormExample(initialSubmitted: boolean): string {
  return example(
    "Alert, AlertDescription, Button, Input, Textarea",
    `<form
  className="max-w-md space-y-4"
  noValidate
  onSubmit={(event) => {
    event.preventDefault();
    setSubmitted(true);
  }}
>
  <Input
    label="Workspace name"
    value={name}
    onChange={(event) => {
      setName(event.target.value);
      setSubmitted(false);
    }}
    required
    error={error}
  />
  <Textarea
    label="Review notes"
    value={notes}
    onChange={(event) => {
      setNotes(event.target.value);
      setSubmitted(false);
    }}
    helperText="Synthetic local example; nothing is sent or stored."
  />
  <Button type="submit">Save locally</Button>
  {submitted && !error ? (
    <Alert variant="success" ariaLive="polite">
      <AlertDescription>Example saved in this preview only.</AlertDescription>
    </Alert>
  ) : null}
</form>`,
    {
      react: "useState",
      setup: `const [name, setName] = useState("");
const [notes, setNotes] = useState("");
const [submitted, setSubmitted] = useState(${initialSubmitted});
const error = submitted && !name.trim() ? "Enter a workspace name." : undefined;`,
    },
  );
}
examples["compositions-settings-form--default"] = settingsFormExample(false);
examples["compositions-settings-form--validation-error"] =
  settingsFormExample(true);

const legacyStories: Record<string, string> = {
  buttons: "button--variants",
  cards: "card--composition",
  checkboxes: "checkbox--states",
  badges: "badge--variants",
  inputs: "input--states",
  skeletons: "skeleton--default",
  "empty-states": "empty-state--with-action",
  alerts: "alert--variants",
  dialogs: "dialog--default",
  separators: "separator--default",
  sheets: "sheet--default",
  "dropdown-menus": "dropdown-menu--default",
  "tab-sets": "tabs--default",
  toasts: "toast--default",
  "pagination-link-composition": "pagination--link-composition",
  "pagination-controls": "pagination--default",
  tables: "table--rows-and-empty-section",
  textareas: "textarea--states",
  "password-inputs": "password-input--default",
};

function consumerAttributes(
  args: Record<string, unknown>,
  names: readonly string[],
): string {
  return names
    .flatMap((name) => {
      const value = args[name];
      if (typeof value === "boolean") return [`${name}={${value}}`];
      if (typeof value === "string")
        return [`${name}={${JSON.stringify(value)}}`];
      if (typeof value === "number" && Number.isFinite(value))
        return [`${name}={${value}}`];
      return [];
    })
    .join("\n  ");
}

function textChild(value: unknown, fallback: string): string {
  return `{${JSON.stringify(typeof value === "string" || typeof value === "number" ? value : fallback)}}`;
}

/** Reflect Controls without serializing event handlers, elements or arbitrary objects. */
function controlledExample(
  storyId: string,
  args: Record<string, unknown>,
): string | undefined {
  if (storyId === "components-button--default")
    return example(
      "Button",
      `<Button\n  type="button"\n  ${consumerAttributes(args, ["variant", "size", "disabled"])}\n>\n  ${textChild(args.children, "Save changes")}\n</Button>`,
    );
  if (storyId === "components-badge--default")
    return example(
      "Badge",
      `<Badge\n  ${consumerAttributes(args, ["variant", "size"])}\n>\n  ${textChild(args.children, "Active")}\n</Badge>`,
    );
  if (
    storyId === "components-input--default" ||
    storyId === "components-textarea--default"
  ) {
    const component =
      storyId === "components-input--default" ? "Input" : "Textarea";
    const attributes = consumerAttributes(args, [
      "label",
      "placeholder",
      "size",
      "disabled",
      "readOnly",
      "required",
      "error",
      "helperText",
      "defaultValue",
      ...(component === "Input" ? ["type"] : ["resize"]),
    ]);
    return example(component, `<${component}\n  ${attributes}\n/>`);
  }
  if (storyId === "components-alert--default")
    return example(
      alertNames,
      `<Alert\n  ${consumerAttributes(args, ["variant", "ariaLive"])}\n  className="max-w-xl"\n>
  <AlertTitle>Workspace updated</AlertTitle>
  <AlertDescription>Your changes have been saved.</AlertDescription>
</Alert>`,
    );
  return undefined;
}

/** Story-specific examples use the same public exports as consuming apps. */
export function getConsumerExample(
  storyId: string,
  args?: Record<string, unknown>,
): string | undefined {
  const legacy =
    legacyStories[storyId.replace(/^ui-public-component-surface--/, "")];
  const canonicalId =
    typeof legacy === "string" ? `components-${legacy}` : storyId;
  const code =
    (args ? controlledExample(canonicalId, args) : undefined) ??
    examples[canonicalId];
  return typeof code === "string" ? code : undefined;
}

/** Enables coverage checks without executing stories or importing private code. */
export const consumerExampleIds = Object.freeze(Object.keys(examples).sort());
