import { Check, X, Minus } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/layout";
import { COMPARISON } from "@/lib/constants";
import { cn } from "@/lib/utils";

function Cell({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="mx-auto size-5 text-success" />;
  if (value === false) return <X className="mx-auto size-5 text-muted-foreground/50" />;
  return (
    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
      <Minus className="size-3" /> {value}
    </span>
  );
}

export function Comparison() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Comparatif honnête"
          title="Ce que les autres ne vous disent pas"
          description="Pas de reconduction cachée, pas de mauvaise surprise à l'export."
        />
        <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-bg-subtle">
                <th className="p-4 text-left font-medium text-muted-foreground"> </th>
                {COMPARISON.columns.map((c, i) => (
                  <th
                    key={c}
                    className={cn(
                      "p-4 text-center font-semibold",
                      i === 0 && "bg-primary-50 text-primary-700",
                    )}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON.rows.map((row) => (
                <tr key={row.label} className="border-t border-border">
                  <td className="p-4 font-medium">{row.label}</td>
                  {row.values.map((v, i) => (
                    <td
                      key={i}
                      className={cn("p-4 text-center", i === 0 && "bg-primary-50/50")}
                    >
                      <Cell value={v} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}
