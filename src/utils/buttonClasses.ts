/**
 * Gedeelde button-styling (Tailwind class-strings), zodat primaire/danger/
 * secundaire knoppen in SubmitButton, SuccessMessage en de foutbanner één
 * bron van waarheid hebben. Grootte- en layoutvariaties blijven per gebruiker.
 */

/**
 * Primaire gradient-knop (volle breedte): gebruikt door de submit-knop én de
 * acties op het succes-scherm. Eén padding-set, zodat de varianten niet
 * ongemerkt kunnen afwijken. `group` zit erin voor de icon-hover-animaties.
 */
export const primaryButton =
  "group flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-linear-to-r from-accent-500 via-primary-500 to-primary-600 px-4 py-3.5 font-semibold text-white shadow-lg shadow-primary-950/50 transition duration-200 hover:from-accent-600 hover:via-primary-600 hover:to-primary-700 hover:shadow-xl hover:shadow-primary-800/50 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-400/30 disabled:cursor-not-allowed disabled:opacity-50";

/** Gevaar-variant — "Opnieuw proberen" in de foutbanner. */
export const dangerButton =
  "inline-flex items-center gap-2 rounded-xl border border-danger-400/40 bg-danger-500/20 px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-danger-500/30 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger-400/40";

/** Secundaire glas-variant — "Sluiten" in de foutbanner. */
export const secondaryButton =
  "rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/80 transition duration-200 hover:bg-white/20 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50";

/** Steviger glas-variant — "Opnieuw invullen" op het succes-scherm. */
export const secondaryButtonStrong =
  "w-full rounded-xl border border-white/40 bg-white/30 px-6 py-3 font-semibold text-white backdrop-blur-sm transition duration-200 hover:bg-white/40 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70";
