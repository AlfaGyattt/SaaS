import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PageStub({
  icon: Icon,
  title,
  subtitle,
  cta,
}: {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  cta?: { label: string; href: string };
}) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="grid min-h-[50vh] place-items-center rounded-2xl border border-dashed border-border bg-bg-subtle">
        <div className="flex max-w-sm flex-col items-center gap-3 px-6 text-center">
          <div className="grid size-14 place-items-center rounded-2xl bg-primary-50 text-primary">
            <Icon className="size-7" />
          </div>
          <p className="text-lg font-semibold">{title}</p>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
          {cta && (
            <Button className="mt-2" asChild>
              <Link href={cta.href}>{cta.label}</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
