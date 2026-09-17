import { PackageForm } from "@/components/dashboard/package-form";
import { createPackageAction } from "../actions";
import { getTranslator } from "@/lib/i18n/server";

export default async function NewPackagePage() {
  const { t } = await getTranslator();

  return (
    <div>
      <PackageForm action={createPackageAction} submitLabel={t("packagesAdmin.createPackage")} />
    </div>
  );
}
