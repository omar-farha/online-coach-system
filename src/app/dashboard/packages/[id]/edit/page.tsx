import { notFound } from "next/navigation";
import { getPackageById } from "@/lib/data/packages";
import { PackageForm } from "@/components/dashboard/package-form";
import { updatePackageAction } from "../../actions";
import { getTranslator } from "@/lib/i18n/server";

export default async function EditPackagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [pkg, { t }] = await Promise.all([getPackageById(id), getTranslator()]);
  if (!pkg) notFound();

  const boundAction = updatePackageAction.bind(null, id);

  return (
    <div>
      <PackageForm action={boundAction} initial={pkg} submitLabel={t("packagesAdmin.editPackage")} />
    </div>
  );
}
