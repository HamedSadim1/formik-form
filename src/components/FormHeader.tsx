import { FC } from "react";
import { PAGE_TITLE_ID } from "../utils/constants";

interface FormHeaderProps {
  /** Badge-tekst boven de titel (bijv. "Registratie"). */
  badge: string;
  /** Paginatitel; draagt het id dat de main-landmark als naam gebruikt. */
  title: string;
  /** Korte toelichting onder de titel. */
  subtitle: string;
}

/**
 * Kopblok van de pagina: badge, titel en toelichting. De h1 draagt het
 * PAGE_TITLE_ID dat via aria-labelledby aan de main-landmark (App.tsx) is
 * gekoppeld, zodat de titel als toegankelijke naam van de landmark geldt.
 */
const FormHeader: FC<FormHeaderProps> = ({ badge, title, subtitle }) => (
  <div className="mb-8 text-center">
    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-400/40 bg-primary-500/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-300">
      <span className="size-1.5 animate-pulse rounded-full bg-primary-400" aria-hidden="true" />
      {badge}
    </span>
    <h1
      id={PAGE_TITLE_ID}
      className="mb-2 bg-linear-to-r from-white via-white to-white/60 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl"
    >
      {title}
    </h1>
    <p className="text-sm text-white/60">{subtitle}</p>
  </div>
);

export default FormHeader;
