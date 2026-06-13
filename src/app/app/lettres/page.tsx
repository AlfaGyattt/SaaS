import { Mail } from "lucide-react";
import { PageStub } from "@/components/app/page-stub";

export default function LettresPage() {
  return (
    <PageStub
      icon={Mail}
      title="Lettres de motivation"
      subtitle="Générez une lettre structurée à la française (Vous-Moi-Nous) à partir d'une offre, en quelques secondes."
      cta={{ label: "Créer une lettre", href: "/app/postuler" }}
    />
  );
}
