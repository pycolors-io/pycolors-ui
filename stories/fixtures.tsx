import type { PropsWithChildren } from "react";

export function StoryGrid({ children }: PropsWithChildren) {
  return (
    <div className="grid w-full max-w-4xl gap-4 sm:grid-cols-2">{children}</div>
  );
}
