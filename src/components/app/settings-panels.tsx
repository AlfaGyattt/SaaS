"use client";

import * as React from "react";
import {
  User as UserIcon,
  CreditCard,
  ShieldCheck,
  Palette,
  Download,
  Trash2,
  Check,
  Loader2,
  Sun,
  Moon,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  updateProfile,
  upgradePlan,
  exportUserData,
  deleteAccount,
} from "@/server/actions/user";

type Plan = "FREE" | "PASS" | "PRO" | "CARRIERE";

const PLAN_LABEL: Record<Plan, string> = {
  FREE: "Gratuit",
  PASS: "Pass Campagne",
  PRO: "Pro",
  CARRIERE: "Carrière",
};

const OFFERS: {
  plan: Exclude<Plan, "FREE">;
  name: string;
  price: string;
  period: string;
  desc: string;
}[] = [
  {
    plan: "PASS",
    name: "Pass Campagne",
    price: "14,90 €",
    period: "30 jours",
    desc: "Idéal pour une recherche intensive et limitée dans le temps.",
  },
  {
    plan: "PRO",
    name: "Pro",
    price: "9,90 €",
    period: "par mois",
    desc: "L'essentiel pour postuler sereinement au quotidien.",
  },
  {
    plan: "CARRIERE",
    name: "Carrière",
    price: "19,90 €",
    period: "par mois",
    desc: "Tout Postulo, dont la simulation d'entretien par IA.",
  },
];

export function SettingsPanels({
  user,
}: {
  user: { name: string; email: string; plan: string };
}) {
  const [plan, setPlan] = React.useState<Plan>(user.plan as Plan);
  const [savingProfile, startProfile] = React.useTransition();
  const [profileSaved, setProfileSaved] = React.useState(false);
  const [pendingPlan, setPendingPlan] = React.useState<Plan | null>(null);
  const [, startPlan] = React.useTransition();
  const [exporting, setExporting] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);

  function onSubmitProfile(formData: FormData) {
    startProfile(async () => {
      await updateProfile(formData);
      setProfileSaved(true);
      toast.success("Profil mis à jour.");
    });
  }

  function changePlan(next: Plan) {
    setPendingPlan(next);
    startPlan(async () => {
      await upgradePlan(next);
      setPlan(next);
      setPendingPlan(null);
      toast.success("Votre plan a été mis à jour.");
    });
  }

  async function exportData() {
    setExporting(true);
    try {
      const json = await exportUserData();
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "postulo-donnees.json";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Export téléchargé.");
    } catch {
      toast.error("L'export a échoué. Réessayez.");
    } finally {
      setExporting(false);
    }
  }

  function removeAccount() {
    setDeleting(true);
    // deleteAccount redirige tout seul vers "/".
    void deleteAccount();
  }

  return (
    <div className="space-y-6">
      {/* Profil */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2.5">
            <div className="grid size-9 place-items-center rounded-lg bg-primary-50 text-primary">
              <UserIcon className="size-4.5" />
            </div>
            <div>
              <CardTitle>Profil</CardTitle>
              <CardDescription>
                Vos informations personnelles.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form action={onSubmitProfile} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-sm font-medium">
                Nom complet
              </label>
              <Input
                id="name"
                name="name"
                defaultValue={user.name}
                placeholder="Votre nom"
                onChange={() => setProfileSaved(false)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm font-medium">
                Adresse e-mail
              </label>
              <Input id="email" value={user.email} disabled />
              <p className="text-xs text-muted-foreground">
                L&apos;adresse e-mail ne peut pas être modifiée.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button type="submit" disabled={savingProfile}>
                {savingProfile ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : null}
                Enregistrer
              </Button>
              {profileSaved && !savingProfile && (
                <span className="inline-flex items-center gap-1.5 text-xs text-success">
                  <Check className="size-3.5" /> Enregistré
                </span>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Abonnement */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="grid size-9 place-items-center rounded-lg bg-primary-50 text-primary">
                <CreditCard className="size-4.5" />
              </div>
              <div>
                <CardTitle>Abonnement</CardTitle>
                <CardDescription>
                  Votre formule actuelle&nbsp;:{" "}
                  <Badge variant={plan === "FREE" ? "muted" : "accent"}>
                    {PLAN_LABEL[plan]}
                  </Badge>
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            {OFFERS.map((offer) => {
              const current = plan === offer.plan;
              const busy = pendingPlan === offer.plan;
              return (
                <div
                  key={offer.plan}
                  className={cn(
                    "flex flex-col rounded-xl border bg-surface p-4 transition-all",
                    current
                      ? "border-primary ring-2 ring-primary/30"
                      : "border-border",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{offer.name}</span>
                    {current && (
                      <Badge variant="success">
                        <Check className="size-3" /> Actif
                      </Badge>
                    )}
                  </div>
                  <p className="mt-2">
                    <span className="text-xl font-bold">{offer.price}</span>{" "}
                    <span className="text-xs text-muted-foreground">
                      · {offer.period}
                    </span>
                  </p>
                  <p className="mt-1.5 flex-1 text-xs text-muted-foreground">
                    {offer.desc}
                  </p>
                  <Button
                    variant={current ? "outline" : "accent"}
                    size="sm"
                    className="mt-4"
                    disabled={current || busy}
                    onClick={() => changePlan(offer.plan)}
                  >
                    {busy ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : null}
                    {current ? "Formule actuelle" : "Activer"}
                  </Button>
                </div>
              );
            })}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs text-muted-foreground">
              Changement instantané — démo, sans paiement réel.
            </p>
            {plan !== "FREE" && (
              <Button
                variant="ghost"
                size="sm"
                disabled={pendingPlan === "FREE"}
                onClick={() => changePlan("FREE")}
              >
                {pendingPlan === "FREE" ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : null}
                Revenir au gratuit
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Données & confidentialité */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2.5">
            <div className="grid size-9 place-items-center rounded-lg bg-primary-50 text-primary">
              <ShieldCheck className="size-4.5" />
            </div>
            <div>
              <CardTitle>Données &amp; confidentialité</CardTitle>
              <CardDescription>
                Vos droits RGPD&nbsp;: portabilité et effacement.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-bg-subtle p-4">
            <div className="max-w-md">
              <p className="text-sm font-medium">Exporter mes données</p>
              <p className="text-xs text-muted-foreground">
                Téléchargez l&apos;ensemble de vos données (profil, CV, lettres,
                candidatures) au format JSON.
              </p>
            </div>
            <Button variant="outline" onClick={exportData} disabled={exporting}>
              {exporting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Download className="size-4" />
              )}
              Exporter mes données
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-danger/30 bg-danger/5 p-4">
            <div className="max-w-md">
              <p className="text-sm font-medium text-danger">
                Supprimer mon compte
              </p>
              <p className="text-xs text-muted-foreground">
                Suppression définitive de votre compte et de toutes vos données.
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="size-4" /> Supprimer mon compte
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Supprimer définitivement votre compte ?</DialogTitle>
                  <DialogDescription>
                    Cette action est irréversible. Toutes vos données (CV,
                    lettres, candidatures et offres) seront immédiatement et
                    définitivement effacées. Vous serez déconnecté.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Annuler</Button>
                  </DialogClose>
                  <Button
                    variant="destructive"
                    onClick={removeAccount}
                    disabled={deleting}
                  >
                    {deleting ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Trash2 className="size-4" />
                    )}
                    Supprimer définitivement
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Apparence */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2.5">
            <div className="grid size-9 place-items-center rounded-lg bg-primary-50 text-primary">
              <Palette className="size-4.5" />
            </div>
            <div>
              <CardTitle>Apparence</CardTitle>
              <CardDescription>Thème clair ou sombre.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 rounded-xl border border-border bg-bg-subtle p-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Sun className="size-4" />
              <Moon className="size-4" />
            </span>
            <p>
              Utilisez le bouton de thème dans la barre du haut pour basculer
              entre le mode clair et le mode sombre. Votre préférence est
              mémorisée sur cet appareil.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
