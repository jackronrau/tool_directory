import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link href="/tools" className="text-sm text-muted-foreground hover:text-primary">Tools</Link></li>
              <li><Link href="/collections" className="text-sm text-muted-foreground hover:text-primary">Collections</Link></li>
              <li><Link href="/explore" className="text-sm text-muted-foreground hover:text-primary">Explore</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/resources" className="text-sm text-muted-foreground hover:text-primary">Documentation</Link></li>
              <li><Link href="/resources" className="text-sm text-muted-foreground hover:text-primary">Guides</Link></li>
              <li><Link href="/resources" className="text-sm text-muted-foreground hover:text-primary">Best Practices</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              <li><Link href="/community" className="text-sm text-muted-foreground hover:text-primary">Submit Tool</Link></li>
              <li><Link href="/community" className="text-sm text-muted-foreground hover:text-primary">Contribute</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary">Updates</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} DevTools Hub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}