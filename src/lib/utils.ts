import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names while resolving Tailwind conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number as a compact French string (e.g. 50000 -> "50 000"). */
export function formatFr(n: number) {
  return new Intl.NumberFormat("fr-FR").format(n);
}
