"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileStack, Send, KanbanSquare, User } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
  { label: "Accueil", href: "/app", icon: LayoutDashboard },
  { label: "CV", href: "/app/cv", icon: FileStack },
  { label: "Postuler", href: "/app/postuler", icon: Send, primary: true },
  { label: "Suivi", href: "/app/candidatures", icon: KanbanSquare },
  { label: "Profil", href: "/app/parametres", icon: User },
];

export function MobileNav() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/app" ? pathname === "/app" : pathname.startsWith(href);

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 backdrop-blur-md lg:hidden">
      <ul className="grid grid-cols-5">
        {ITEMS.map((item) => {
          if (item.primary) {
            return (
              <li key={item.href} className="relative">
                <Link
                  href={item.href}
                  className="absolute -top-5 left-1/2 grid size-14 -translate-x-1/2 place-items-center rounded-2xl bg-accent text-accent-foreground shadow-[var(--shadow-glow)]"
                  aria-label={item.label}
                >
                  <item.icon className="size-6" />
                </Link>
              </li>
            );
          }
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium",
                  isActive(item.href) ? "text-primary" : "text-muted-foreground",
                )}
              >
                <item.icon className="size-5" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
