import { notFound } from "next/navigation";
import { getClientById } from "@/lib/data/clients";
import { getWorkoutPlanByClientId } from "@/lib/data/workouts";
import { WorkoutBuilder } from "@/components/dashboard/workout-builder";
import { getTranslator } from "@/lib/i18n/server";

export default async function WorkoutBuilderPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = await params;
  const [client, { t }] = await Promise.all([getClientById(clientId), getTranslator()]);
  if (!client) notFound();

  const plan = await getWorkoutPlanByClientId(clientId);

  return (
    <div>
      <p className="mb-6 text-sm text-muted">
        {t("workouts.buildingFor")} <span className="text-foreground">{client.full_name}</span>
      </p>
      <WorkoutBuilder clientId={clientId} initialPlan={plan} />
    </div>
  );
}
