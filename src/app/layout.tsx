import type { Metadata } from "next";
import { Anton, Inter, Cairo } from "next/font/google";
import { Toaster } from "sonner";
import { LocaleProvider } from "@/lib/i18n/context";
import { getLocale, getTranslator } from "@/lib/i18n/server";
import { dirForLocale } from "@/lib/i18n/config";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getTranslator();
  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await getLocale();
  const dir = dirForLocale(locale);

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${anton.variable} ${inter.variable} ${cairo.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <LocaleProvider initialLocale={locale}>
          {children}
          <Toaster theme="dark" position="top-right" richColors dir={dir} />
        </LocaleProvider>
      </body>
    </html>
  );
}
