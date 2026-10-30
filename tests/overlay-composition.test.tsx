import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useState } from "react";
import { expect, it } from "vitest";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../src/index.js";

function MenuDialog() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Project actions</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          onCloseAutoFocus={(event) => {
            if (open) event.preventDefault();
          }}
        >
          <DropdownMenuItem onSelect={() => setOpen(true)}>
            Rename project
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>Rename project</DialogTitle>
          <DialogDescription>Update the project name.</DialogDescription>
          <DialogClose asChild>
            <Button>Cancel rename</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
}

it("restores page pointer interaction after a menu opens and closes a dialog", async () => {
  const originalPointerEvents = document.body.style.pointerEvents;
  render(<MenuDialog />);

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const trigger = screen.getByRole("button", { name: "Project actions" });
    trigger.focus();
    fireEvent.keyDown(trigger, { key: "Enter" });
    fireEvent.click(
      await screen.findByRole("menuitem", { name: "Rename project" }),
    );
    expect(
      await screen.findByRole("dialog", { name: "Rename project" }),
    ).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Cancel rename" }));
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      expect(document.body.style.pointerEvents).toBe(originalPointerEvents);
    });
  }
});
