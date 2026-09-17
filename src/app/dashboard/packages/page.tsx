import { Plus, Check } from "lucide-react";
import { getAllPackages } from "@/lib/data/packages";
import { ButtonLink } from "@/components/ui/button";
import { PackageActions } from "@/components/dashboard/package-actions";
import { formatCurrency } from "@/lib/utils";
import { getTranslator } from "@/lib/i18n/server";

export default async function PackagesPage() {
  const [packages, { t, locale }] = await Promise.all([getAllPackages(), getTranslator()]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-end">
        <ButtonLink href="/dashboard/packages/new" size="sm" className="gap-2">
          <Plus size={16} /> {t("packagesAdmin.createPackage")}
        </ButtonLink>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {packages.map((pkg) => (
          <div key={pkg.id} className="flex flex-col rounded-2xl border border-border bg-surface p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display text-xl">{pkg.name}</h3>
                <p className="text-xs text-muted">{pkg.duration_label}</p>
              </div>
              <p className="font-display text-2xl text-accent">{formatCurrency(pkg.price, locale)}</p>
            </div>

            {pkg.description && (
              <p className="mt-3 text-sm text-muted">{pkg.description}</p>
            )}

            <ul className="mt-4 flex-1 space-y-2">
              {pkg.features.slice(0, 4).map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs text-foreground/80">
                  <Check size={13} className="mt-0.5 shrink-0 text-accent" /> {f}
                </li>
              ))}
            </ul>

            <div className="mt-5 border-t border-border pt-4">
              <PackageActions packageId={pkg.id} packageName={pkg.name} isActive={pkg.is_active} />
            </div>
          </div>
        ))}

        {packages.length === 0 && (
          <p className="col-span-full py-12 text-center text-sm text-muted">
            {t("packagesAdmin.noPackagesYet")}
          </p>
        )}
      </div>
    </div>
  );
}
