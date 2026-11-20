import type { Metadata } from "next";
import { alternateLanguages, localizedHref, ogLocale } from "./config";

/**
 * Shared metadata for a localized page: canonical + hreflang alternates,
 * OpenGraph and Twitter, all in the given locale. Used by both the English
 * root route and its `/[locale]/…` twin so hreflang stays reciprocal.
 */
export function pageMetadata({
  path,
  locale,
  title,
  description,
  keywords,
  noindex,
}: {
  path: string;
  locale: string;
  title: string;
  description: string;
  keywords?: string;
  noindex?: boolean;
}): Metadata {
  const url = localizedHref(path, locale);
  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
    alternates: {
      canonical: url,
      languages: alternateLanguages(path),
    },
    // openGraph/twitter replace the site defaults wholesale, so repeat the image.
    openGraph: { title, description, url, locale: ogLocale(locale), images: ["/og-image.jpg"] },
    twitter: { title, description, images: ["/og-image.jpg"] },
  };
}
