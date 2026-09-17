import { notFound } from "next/navigation";
import { getClientById } from "@/lib/data/clients";
import { getAllPackages } from "@/lib/data/packages";
import { ClientForm } from "@/components/dashboard/client-form";
import { updateClientAction } from "../../actions";
import { getTranslator } from "@/lib/i18n/server";

export default async function EditClientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [client, packages, { t }] = await Promise.all([
    getClientById(id),
    getAllPackages(),
    getTranslator(),
  ]);

  if (!client) notFound();

  const boundAction = updateClientAction.bind(null, id);

  return (
    <div>
      <ClientForm
        action={boundAction}
        packages={packages}
        initial={client}
        submitLabel={t("clients.saveChanges")}
      />
    </div>
  );
}
