import { MessageSquare } from "lucide-react";
import { PageStub } from "@/components/app/page-stub";

export default function EntretienPage() {
  return (
    <PageStub
      icon={MessageSquare}
      title="Préparer l'entretien"
      subtitle="Entraînez-vous avec une simulation d'entretien par IA, adaptée à votre métier. Disponible avec l'offre Carrière."
      cta={{ label: "Découvrir Carrière", href: "/app/parametres/facturation" }}
    />
  );
}
