import Image from "next/image";
import { cn } from "@/lib/utils";
import { initials } from "@/lib/utils";

export function Avatar({
  src,
  name,
  size = 40,
  className,
}: {
  src?: string | null;
  name: string;
  size?: number;
  className?: string;
}) {
  return (
    <div
      style={{ width: size, height: size }}
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent/15 text-accent",
        className
      )}
    >
      {src ? (
        <Image src={src} alt={name} fill className="object-cover" />
      ) : (
        <span className="text-xs font-semibold">{initials(name)}</span>
      )}
    </div>
  );
}
