import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CopyCommand({
  command,
  size = "lg",
}: {
  command: string;
  size?: "md" | "lg";
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* noop */
    }
  };

  const sizeCls = size === "lg" ? "text-base sm:text-lg py-4 px-5" : "text-sm py-3 px-4";

  return (
    <button
      onClick={copy}
      className={`group glass-strong rounded-2xl ${sizeCls} font-mono inline-flex items-center gap-4 ring-glow hover:scale-[1.02] transition-all w-full max-w-2xl justify-between`}
      style={{ fontFamily: "var(--font-mono)" }}
    >
      <span className="flex items-center gap-3 truncate">
        <span className="text-gradient font-bold">$</span>
        <span className="truncate">{command}</span>
      </span>
      <span className="shrink-0 p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition">
        {copied ? (
          <Check className="h-5 w-5 text-emerald-300" />
        ) : (
          <Copy className="h-5 w-5" />
        )}
      </span>
    </button>
  );
}
