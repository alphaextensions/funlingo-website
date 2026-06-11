import { notFound } from "next/navigation";
import { I18nProvider } from "@/app/i18n/I18nProvider";
import { getDictionary } from "@/app/i18n/dictionaries";
import { LOCALES } from "@/app/i18n/config";

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
  return (
    <I18nProvider locale={locale} dict={dict}>
      {children}
    </I18nProvider>
  );
}
