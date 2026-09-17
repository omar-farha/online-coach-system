import { notFound } from "next/navigation";
import { getClientById } from "@/lib/data/clients";
import { getNutritionPlanByClientId } from "@/lib/data/nutrition";
import { NutritionBuilder } from "@/components/dashboard/nutrition-builder";
import { getTranslator } from "@/lib/i18n/server";

export default async function NutritionBuilderPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = await params;
  const [client, { t }] = await Promise.all([getClientById(clientId), getTranslator()]);
  if (!client) notFound();

  const plan = await getNutritionPlanByClientId(clientId);

  return (
    <div>
      <p className="mb-6 text-sm text-muted">
        {t("nutrition.buildingFor")} <span className="text-foreground">{client.full_name}</span>
      </p>
      <NutritionBuilder clientId={clientId} initialPlan={plan} />
    </div>
  );
}
