"use client";

import * as React from "react";
import { useT } from "@/app/i18n/I18nProvider";
import { navHref } from "@/app/i18n/config";

const logo = "/assets/logo.png";

const colTitle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 900,
  textTransform: "uppercase",
  letterSpacing: ".08em",
  color: "var(--text-dim2)",
  marginBottom: 15,
};

const linkStyle: React.CSSProperties = {
  textDecoration: "none",
  fontSize: 15,
  fontWeight: 600,
  color: "var(--text-dim)",
};

export const FooterSection = (): React.JSX.Element => {
  const { t, locale } = useT();

  const product = [
    { label: t("nav.home"), href: navHref("/", locale) },
    { label: t("nav.roadmap"), href: navHref("/roadmap", locale) },
    { label: t("footer.compare"), href: "/compare" },
  ];
  const company = [
    { label: t("nav.about"), href: navHref("/about", locale) },
    { label: t("nav.blog"), href: "/blog" },
    { label: t("footer.feedback"), href: "/feedback" },
  ];
  const follow = [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/getfunlingo/" },
    {
      label: "Instagram",
      href: "https://www.instagram.com/getfunlingo?igsh=MWVkcWQ5Nmh0YmZqdA==",
    },
    { label: t("footer.support"), href: navHref("/support", locale) },
  ];

  return (
    <footer
      className="w-full border-t"
      style={{ background: "var(--bg2)", borderColor: "var(--border)" }}
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-[34px] pt-[60px] pb-9 grid grid-cols-1 min-[560px]:grid-cols-2 min-[860px]:grid-cols-[1.6fr_1fr_1fr_1fr] gap-7 min-[860px]:gap-[34px]">
        {/* Brand */}
        <div>
          <img
            src={logo}
            alt="Funlingo"
            className="h-12 w-auto block mb-4"
          />
          <p
            className="text-[15px] leading-[1.55] font-medium m-0 max-w-[270px]"
            style={{ color: "var(--text-dim)" }}
          >
            {t("footer.tagline")}
          </p>
        </div>

        {/* Product */}
        <div>
          <div style={colTitle}>{t("footer.product")}</div>
          <div className="flex flex-col gap-3">
            {product.map((l, i) => (
              <a key={i} href={l.href} style={linkStyle} className="hover:opacity-80 transition-opacity">
                {l.label}
              </a>
            ))}
          </div>
        </div>

        {/* Company */}
        <div>
          <div style={colTitle}>{t("footer.company")}</div>
          <div className="flex flex-col gap-3">
            {company.map((l, i) => (
              <a key={i} href={l.href} style={linkStyle} className="hover:opacity-80 transition-opacity">
                {l.label}
              </a>
            ))}
          </div>
        </div>

        {/* Follow */}
        <div>
          <div style={colTitle}>{t("footer.follow")}</div>
          <div className="flex flex-col gap-3">
            {follow.map((l, i) => (
              <a
                key={i}
                href={l.href}
                style={linkStyle}
                className="hover:opacity-80 transition-opacity"
                {...(l.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="max-w-[1240px] mx-auto px-5 sm:px-[34px] pt-5 pb-10 border-t flex items-center justify-between gap-4 flex-wrap"
        style={{ borderColor: "var(--border)" }}
      >
        <span
          className="text-sm font-medium"
          style={{ color: "var(--text-dim2)" }}
        >
          {t("footer.rights")}
        </span>
        <span
          className="text-sm font-medium"
          style={{ color: "var(--text-dim2)" }}
        >
          <a
            href={navHref("/privacy-policy", locale)}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            {t("footer.privacy")}
          </a>{" "}
          ·{" "}
          <a
            href={navHref("/support", locale)}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            {t("footer.support")}
          </a>
        </span>
      </div>
    </footer>
  );
};
