import { Container } from "@/components/ui/layout";

const PARTNERS = ["CFA Lyon", "ESG Paris", "IFSI Nantes", "Mission Locale", "Studi", "OpenClassrooms"];

export function TrustBar() {
  return (
    <section className="border-y border-border bg-bg-subtle py-8">
      <Container>
        <p className="text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Compatible avec les ATS utilisés en France · Recommandé par des écoles et CFA
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-70">
          {PARTNERS.map((p) => (
            <span key={p} className="font-display text-sm font-semibold text-muted-foreground">
              {p}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
