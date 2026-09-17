import { UserPlus } from "lucide-react";
import { getClients } from "@/lib/data/clients";
import { ClientsTable } from "@/components/dashboard/clients-table";
import { ButtonLink } from "@/components/ui/button";
import { getTranslator } from "@/lib/i18n/server";

export default async function ClientsPage() {
  const [clients, { t }] = await Promise.all([getClients(), getTranslator()]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-end">
        <ButtonLink href="/dashboard/clients/new" size="sm" className="gap-2">
          <UserPlus size={16} /> {t("clients.addClient")}
        </ButtonLink>
      </div>
      <ClientsTable clients={clients} />
    </div>
  );
}
