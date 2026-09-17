import { notFound } from "next/navigation";
import { getClientBySlug } from "@/lib/data/clients";
import { ClientPortalNav } from "@/components/client-portal/nav";

export default async function ClientPortalLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const client = await getClientBySlug(slug);
  if (!client) notFound();

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <ClientPortalNav slug={slug} />
      <main className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-12">{children}</main>
    </div>
  );
}
