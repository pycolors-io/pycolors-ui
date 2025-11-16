import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">PyColors UI</h1>
      <p className="mt-4 text-muted-foreground">
        Design system, UI kit & templates pour développeurs modernes.
      </p>

      <div className="mt-6 flex gap-4">
        <Button>Get started</Button>
        <Button variant="outline">
          <Link href="/docs">View docs</Link>
        </Button>
      </div>
    </main>
  );
}
