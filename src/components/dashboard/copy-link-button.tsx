"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/context";

export function CopyLinkButton({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const { t } = useLocale();

  async function handleCopy(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/client/${slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable — silently ignore, link is still visible via the URL bar
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-accent hover:text-accent",
        copied && "border-accent text-accent",
        className
      )}
    >
      {copied ? <Check size={13} /> : <Link2 size={13} />}
      {copied ? t("common.linkCopied") : t("common.copyLink")}
    </button>
  );
}
