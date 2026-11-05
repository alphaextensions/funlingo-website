import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { I18nProvider } from "@/app/i18n/I18nProvider";
import { getDictionary } from "@/app/i18n/dictionaries";
import { LOCALES, getLocaleMeta } from "@/app/i18n/config";
import RootShell from "@/app/_components/RootShell";
import { siteMetadata } from "@/app/siteMetadata";

// Root layout for every language page (/fr, /nl/netflix …), so the HTML is
// built with that language's <html lang> and dir instead of English.
export const metadata: Metadata = siteMetadata;

// Static export: only the prefixed (non-English) locales are pre-rendered.
export function generateStaticParams() {
  return LOCALES.map((l) => ({ locale: l.code }));
}

export const dynamicParams = false;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!LOCALES.some((l) => l.code === locale)) notFound();
  const dict = getDictionary(locale);
  const meta = getLocaleMeta(locale);
  return (
    <RootShell lang={meta.hreflang} dir={meta.dir}>
      <I18nProvider locale={locale} dict={dict}>
        {children}
      </I18nProvider>
    </RootShell>
  );
}
