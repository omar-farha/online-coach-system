import { getAllPackages } from "@/lib/data/packages";
import { ClientForm } from "@/components/dashboard/client-form";
import { createClientAction } from "../actions";
import { getTranslator } from "@/lib/i18n/server";

export default async function NewClientPage() {
  const [packages, { t }] = await Promise.all([getAllPackages(), getTranslator()]);

  return (
    <div>
      <p className="mb-6 max-w-2xl text-sm text-muted">{t("clients.addClientHint")}</p>
      <ClientForm
        action={createClientAction}
        packages={packages}
        submitLabel={t("clients.addClient")}
      />
    </div>
  );
}
