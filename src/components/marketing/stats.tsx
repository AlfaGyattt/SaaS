import { Container } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";
import { STATS } from "@/lib/constants";

export function Stats() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="grid divide-y divide-border overflow-hidden rounded-3xl border border-border bg-card shadow-sm sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
            {STATS.map((stat, i) => (
              <Reveal
                key={stat.label}
                delay={i * 80}
                className="flex flex-col items-center gap-2 px-6 py-8 text-center sm:[&:nth-child(even)]:border-l sm:[&:nth-child(even)]:border-border sm:[&:nth-child(n+3)]:border-t sm:[&:nth-child(n+3)]:border-border lg:[&:nth-child(n+3)]:border-t-0"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-primary-50 text-primary">
                  <stat.icon className="size-5" />
                </span>
                <span className="font-mono text-3xl font-bold tracking-tight tabular-nums sm:text-4xl">
                  {stat.value}
                </span>
                <span className="text-sm text-muted-foreground text-balance">
                  {stat.label}
                </span>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
