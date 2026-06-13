"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { APP_NAV, APP_NAV_SECONDARY } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Sidebar({ plan = "FREE" }: { plan?: string }) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/app" ? pathname === "/app" : pathname.startsWith(href);

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-surface lg:flex">
      <div className="flex h-16 items-center border-b border-border px-5">
        <Logo href="/app" />
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {APP_NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              isActive(item.href)
                ? "bg-primary-50 text-primary-700"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <item.icon className="size-[18px]" />
            {item.label}
          </Link>
        ))}

        <div className="mt-auto flex flex-col gap-1">
          {APP_NAV_SECONDARY.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "bg-primary-50 text-primary-700"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <item.icon className="size-[18px]" />
              {item.label}
            </Link>
          ))}

          {plan === "FREE" && (
            <div className="mt-2 rounded-xl border border-primary/20 bg-primary-50/60 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary-700">
                <Sparkles className="size-4" /> Passer Pro
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Candidatures illimitées et adaptation à l&apos;offre.
              </p>
              <Link
                href="/app/parametres"
                className="mt-3 inline-flex text-xs font-medium text-primary hover:underline"
              >
                Voir les offres →
              </Link>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
}
