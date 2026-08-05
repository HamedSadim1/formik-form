import { FC } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FormValues } from "../utils/formUtils";

interface LiveValuesProps {
  values: FormValues;
}

const LiveValues: FC<LiveValuesProps> = ({ values }) => {
  return (
    <details className="group mt-6 rounded-xl border border-white/10 bg-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm">
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10 [&::-webkit-details-marker]:hidden">
        Huidige waarden
        <FaChevronDown
          className="text-white/60 transition-transform duration-200 group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <dl className="space-y-2.5 border-t border-white/10 px-4 py-3 text-sm">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-white/60">Naam</dt>
          <dd className="truncate text-white/90">{values.name || "—"}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-white/60">E-mail</dt>
          <dd className="truncate text-white/90">{values.email || "—"}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-white/60">Lang</dt>
          <dd className="text-white/90">{values.isTall ? "Ja" : "Nee"}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-white/60">Koekjes</dt>
          <dd className="flex flex-wrap justify-end gap-1.5">
            {values.cookies.length > 0 ? (
              values.cookies.map((cookie) => (
                <span
                  key={cookie}
                  className="rounded-full bg-primary-500/15 px-2.5 py-0.5 text-xs text-primary-200"
                >
                  {cookie}
                </span>
              ))
            ) : (
              <span className="text-white/50">—</span>
            )}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-white/60">Yoghurt</dt>
          <dd className="text-white/90">{values.yoghurt || "—"}</dd>
        </div>
      </dl>
    </details>
  );
};

export default LiveValues;
