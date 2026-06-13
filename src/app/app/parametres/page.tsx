import { Settings } from "lucide-react";
import { PageStub } from "@/components/app/page-stub";

export default function ParametresPage() {
  return (
    <PageStub
      icon={Settings}
      title="Paramètres"
      subtitle="Profil, facturation, notifications et gestion de vos données personnelles (RGPD)."
    />
  );
}
