/**
 * Gedeelde UI-styling (Tailwind class-strings), zodat knoppen en glazen
 * panelen in alle componenten één bron van waarheid hebben. Grootte- en
 * layoutvariaties blijven per gebruik.
 */
import { cn } from "@/utils/helpers";

/**
 * Primaire gradient-knop (volle breedte): gebruikt door de submit-knop én de
 * acties op het succes-scherm. Eén padding-set, zodat de varianten niet
 * ongemerkt kunnen afwijken. `group` zit erin voor de icon-hover-animaties.
 * De gradient zelf is de primary-gradient-utility uit index.css (SSOT).
 */
export const primaryButton =
  "group flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 primary-gradient px-4 py-3.5 font-semibold text-white shadow-lg shadow-primary-950/50 transition duration-200 primary-gradient-hover hover:shadow-xl hover:shadow-primary-800/50 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-400/30 disabled:cursor-not-allowed disabled:opacity-50";

/** Sectielabels: veldlabels, groeps-legends en sectiekopjes (uppercase-stijl). */
export const sectionLabel = "text-xs font-semibold uppercase tracking-wider text-white/60";

/** Gevaar-variant — de retry-knop in de foutbanner. */
export const dangerButton =
  "inline-flex items-center gap-2 rounded-xl border border-danger-400/40 bg-danger-500/20 px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-danger-500/30 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger-400/40 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-danger-500/20";

/** Secundaire glas-variant — de sluit-knop in de foutbanner. */
export const secondaryButton =
  "rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/80 transition duration-200 hover:bg-white/20 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50";

/** Steviger glas-variant — de reset-knop op het succes-scherm. */
export const secondaryButtonStrong =
  "w-full rounded-xl border border-white/40 bg-white/30 px-6 py-3 font-semibold text-white backdrop-blur-sm transition duration-200 hover:bg-white/40 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70";

/** Glazen paneel-achtergrond (border + tint + inset highlight). */
export const glassPanel =
  "rounded-xl border border-white/10 bg-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]";

/** Glazen paneel met backdrop-blur — gebruikt voor panels boven de achtergrond. */
export const glassPanelBlur = cn(glassPanel, "backdrop-blur-sm");

/** Interactief glazen paneel (hover-staten) — gebruikt voor klikbare rijen. */
export const glassPanelHover = cn(
  glassPanel,
  "transition-all duration-200 hover:border-white/25 hover:bg-white/10",
);

/* ===== Optiegroepen ===== */

/** Aantal kolommen voor een checkbox-optiegroep (vanaf het sm-breakpoint). */
export type OptionColumns = 1 | 2 | 3;

/**
 * Grid-klassen per kolom-aantal voor checkbox-optiegroepen. Op mobiel altijd
 * één kolom, zodat labels niet in smalle chips klemmen; vanaf het
 * sm-breakpoint wordt het opgegeven aantal kolommen gebruikt.
 */
export const optionColumnClasses: Record<OptionColumns, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-3",
};
