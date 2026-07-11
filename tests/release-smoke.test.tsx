import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import * as ui from '../src/index.js';

const exported = ui as Record<string, unknown>;

describe('@pycolors/ui release smoke coverage', () => {
  it('exports the public package surface', () => {
    const expectedExports = [
      'Alert',
      'AlertContent',
      'AlertDescription',
      'AlertIndicator',
      'AlertTitle',
      'Badge',
      'Button',
      'Card',
      'CardContent',
      'CardDescription',
      'CardFooter',
      'CardHeader',
      'CardTitle',
      'Checkbox',
      'CheckboxContent',
      'CheckboxDescription',
      'CheckboxField',
      'CheckboxLabel',
      'Dialog',
      'DialogClose',
      'DialogContent',
      'DialogDescription',
      'DialogFooter',
      'DialogHeader',
      'DialogTitle',
      'DialogTrigger',
      'DropdownMenu',
      'DropdownMenuCheckboxItem',
      'DropdownMenuContent',
      'DropdownMenuGroup',
      'DropdownMenuItem',
      'DropdownMenuLabel',
      'DropdownMenuPortal',
      'DropdownMenuRadioGroup',
      'DropdownMenuRadioItem',
      'DropdownMenuSeparator',
      'DropdownMenuShortcut',
      'DropdownMenuSub',
      'DropdownMenuSubContent',
      'DropdownMenuSubTrigger',
      'DropdownMenuTrigger',
      'EmptyState',
      'Input',
      'Pagination',
      'PaginationContent',
      'PaginationEllipsis',
      'PaginationItem',
      'PaginationLink',
      'PaginationNext',
      'PaginationPrevious',
      'PasswordInput',
      'Separator',
      'Sheet',
      'SheetClose',
      'SheetContent',
      'SheetDescription',
      'SheetFooter',
      'SheetHeader',
      'SheetTitle',
      'SheetTrigger',
      'Skeleton',
      'Table',
      'TableBody',
      'TableCaption',
      'TableCell',
      'TableEmpty',
      'TableHead',
      'TableHeader',
      'TableLoading',
      'TableRow',
      'Tabs',
      'TabsContent',
      'TabsList',
      'TabsTrigger',
      'Textarea',
      'Toast',
      'ToastClose',
      'ToastDescription',
      'ToastProvider',
      'ToastTitle',
      'ToastViewport',
      'alertVariants',
      'badgeVariants',
      'buildPaginationRange',
      'buttonVariants',
      'cardVariants',
      'cn',
      'inputVariants',
      'textareaVariants',
    ];

    expectedExports.forEach((exportName) => {
      expect(exported[exportName], exportName).toBeDefined();
    });
  });

  it('renders Button variants without changing variant class output', () => {
    const cases = [
      ['default', 'bg-primary'],
      ['destructive', 'bg-destructive'],
      ['outline', 'border-border'],
      ['secondary', 'bg-secondary'],
      ['ghost', 'bg-transparent'],
      ['link', 'underline-offset-4'],
    ] as const;

    cases.forEach(([variant, expectedClass]) => {
      render(
        <ui.Button variant={variant} size="lg">
          {variant}
        </ui.Button>,
      );

      const button = screen.getByRole('button', { name: variant });

      expect(button).toHaveAttribute('data-slot', 'button');
      expect(button).toHaveClass(expectedClass);
      expect(button).toHaveClass('h-10');
    });
  });

  it('wires Input label, helper text, and error attributes', () => {
    render(
      <ui.Input
        id="email"
        label="Email"
        helperText="Use your work email"
        required
      />,
    );

    const input = screen.getByLabelText('Email*');

    expect(input).toHaveAttribute('id', 'email');
    expect(input).toHaveAttribute('aria-describedby', 'email-helper');
    expect(input).toHaveAttribute('aria-required', 'true');
    expect(input).toHaveAttribute('aria-invalid', 'false');
    expect(screen.getByText('Use your work email')).toHaveAttribute(
      'id',
      'email-helper',
    );

    render(
      <ui.Input
        id="email-error"
        label="Email"
        error="Email is required"
      />,
    );

    const invalidInput = screen.getByLabelText('Email');

    expect(invalidInput).toHaveAttribute('aria-invalid', 'true');
    expect(invalidInput).toHaveAttribute(
      'aria-describedby',
      'email-error-error',
    );
    expect(invalidInput).toHaveAttribute(
      'aria-errormessage',
      'email-error-error',
    );
  });

  it('wires Textarea label, helper text, and error attributes', () => {
    render(
      <ui.Textarea
        id="message"
        label="Message"
        helperText="Keep it concise"
        required
      />,
    );

    const textarea = screen.getByLabelText('Message*');

    expect(textarea).toHaveAttribute('id', 'message');
    expect(textarea).toHaveAttribute(
      'aria-describedby',
      'message-helper',
    );
    expect(textarea).toHaveAttribute('aria-required', 'true');
    expect(textarea).toHaveAttribute('aria-invalid', 'false');

    render(
      <ui.Textarea
        id="message-error"
        label="Message"
        error="Message is required"
      />,
    );

    const invalidTextarea = screen.getByLabelText('Message');

    expect(invalidTextarea).toHaveAttribute('aria-invalid', 'true');
    expect(invalidTextarea).toHaveAttribute(
      'aria-describedby',
      'message-error-error',
    );
    expect(invalidTextarea).toHaveAttribute(
      'aria-errormessage',
      'message-error-error',
    );
  });

  it('toggles PasswordInput visibility without changing the public field API', () => {
    render(<ui.PasswordInput id="password" label="Password" />);

    const input = screen.getByLabelText('Password');
    const showButton = screen.getByRole('button', {
      name: 'Show password',
    });

    expect(input).toHaveAttribute('type', 'password');
    expect(showButton).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(showButton);

    expect(input).toHaveAttribute('type', 'text');
    expect(
      screen.getByRole('button', { name: 'Hide password' }),
    ).toHaveAttribute('aria-pressed', 'true');
  });

  it('renders Table primitives, empty state, and loading state', () => {
    render(
      <ui.Table>
        <ui.TableCaption>Projects</ui.TableCaption>
        <ui.TableHeader>
          <ui.TableRow>
            <ui.TableHead scope="col">Name</ui.TableHead>
            <ui.TableHead scope="col">Status</ui.TableHead>
          </ui.TableRow>
        </ui.TableHeader>
        <ui.TableBody>
          <ui.TableRow>
            <ui.TableCell>Website</ui.TableCell>
            <ui.TableCell>Live</ui.TableCell>
          </ui.TableRow>
          <ui.TableEmpty colSpan={2} title="No projects" />
          <ui.TableLoading colSpan={2} />
        </ui.TableBody>
      </ui.Table>,
    );

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: 'Name' }),
    ).toHaveAttribute('scope', 'col');
    expect(
      screen.getByRole('cell', { name: 'Website' }),
    ).toBeInTheDocument();
    expect(screen.getByText('No projects')).toBeInTheDocument();
    expect(screen.getByText(/Loading/)).toBeInTheDocument();
  });
});
