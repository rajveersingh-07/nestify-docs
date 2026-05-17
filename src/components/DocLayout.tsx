import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Menu, X, Github, ExternalLink, Package } from "lucide-react";
import { DocSidebar } from "./DocSidebar";
import { ThemeToggle } from "./ThemeToggle";

export function DocLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [version, setVersion] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://registry.npmjs.org/nestify-cli/latest")
      .then((res) => res.json())
      .then((data) => {
        setVersion(data.version);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch package version:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <button
            className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          <div className="mr-4 hidden md:flex">
            <a className="mr-6 flex items-center space-x-2" href="/">
              <span className="hidden font-bold sm:inline-block text-xl">
                Nestify
              </span>
            </a>
            {!loading && version && (
              <span className="hidden md:inline-flex items-center rounded-md bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                v{version}
              </span>
            )}
          </div>

          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <div className="flex items-center space-x-2">
                <span className="inline-block md:hidden font-bold text-xl">
                  Nestify
                </span>
                {!loading && version && (
                  <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground md:hidden">
                    v{version}
                  </span>
                )}
              </div>
            </div>
            <nav className="flex items-center space-x-2">
              <ThemeToggle />
              <a
                href="https://github.com/mugabodannyshafi/nestify"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://www.npmjs.com/package/nestify-cli"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground group relative"
              >
                <Package className="h-5 w-5" />
                <span className="sr-only">NPM</span>
                {!loading && version && (
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 hidden group-hover:inline-block whitespace-nowrap rounded bg-popover px-2 py-1 text-xs text-popover-foreground">
                    v{version}
                  </span>
                )}
              </a>
            </nav>
          </div>
        </div>
      </header>

      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside
          className={`fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block ${
            sidebarOpen ? "block" : "hidden"
          } md:block`}
        >
          <div className="h-full py-6 pr-6 lg:py-8">
            <DocSidebar />
          </div>
        </aside>

        {sidebarOpen && (
          <div
            className="fixed inset-0 top-14 z-20 bg-background/80 backdrop-blur-sm md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <aside className="fixed left-0 top-14 z-30 h-[calc(100vh-3.5rem)] w-[80vw] max-w-64 shrink-0 border-r border-border bg-background p-6">
              <DocSidebar />
            </aside>
          </div>
        )}

        <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
          <div className="mx-auto w-full min-w-0">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
