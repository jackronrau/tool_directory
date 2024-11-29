import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container py-8">
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-4xl font-bold">Tool Not Found</h1>
        <p className="text-xl text-muted-foreground">
          The tool you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/tools">Back to Tools</Link>
        </Button>
      </div>
    </div>
  );
}