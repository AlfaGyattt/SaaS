import { requireUser } from "@/server/auth";
import { SettingsPanels } from "@/components/app/settings-panels";

export default async function ParametresPage() {
  const user = await requireUser();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Paramètres</h1>
        <p className="text-sm text-muted-foreground">
          Profil, abonnement et gestion de vos données personnelles (RGPD).
        </p>
      </div>
      <SettingsPanels
        user={{ name: user.name ?? "", email: user.email, plan: user.plan }}
      />
    </div>
  );
}
