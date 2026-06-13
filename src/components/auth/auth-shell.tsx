import Link from "next/link";
import { Star, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/brand/logo";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Form */}
      <div className="flex flex-col justify-center px-6 py-10 sm:px-12">
        <div className="mx-auto w-full max-w-sm">
          <Logo />
          <h1 className="mt-8 text-2xl font-bold">{title}</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <p className="mt-6 text-center text-sm text-muted-foreground">{footer}</p>
          <p className="mt-8 text-center text-xs text-muted-foreground">
            En continuant, vous acceptez nos{" "}
            <Link href="/cgu" className="underline hover:text-foreground">
              CGU
            </Link>{" "}
            et notre{" "}
            <Link href="/confidentialite" className="underline hover:text-foreground">
              politique de confidentialité
            </Link>
            .
          </p>
        </div>
      </div>

      {/* Aside */}
      <div className="relative hidden overflow-hidden bg-primary lg:block">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative flex h-full flex-col justify-center px-12 text-primary-foreground">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-5 fill-accent text-accent" />
            ))}
          </div>
          <blockquote className="mt-6 max-w-md text-2xl font-semibold leading-snug">
            « J&apos;ai adapté mon CV à 12 offres en une soirée. Trois entretiens décrochés en
            deux semaines. »
          </blockquote>
          <p className="mt-4 text-sm text-primary-foreground/70">
            Karim B. — Développeur web, Lyon
          </p>
          <div className="mt-10 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
            <ShieldCheck className="size-4" /> Données hébergées en France · RGPD
          </div>
        </div>
      </div>
    </div>
  );
}

export function GoogleButton() {
  return (
    <button className="flex h-11 w-full items-center justify-center gap-2.5 rounded-md border border-border bg-surface text-sm font-medium transition-colors hover:bg-muted">
      <svg className="size-4" viewBox="0 0 24 24" aria-hidden>
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z"
        />
      </svg>
      Continuer avec Google
    </button>
  );
}
