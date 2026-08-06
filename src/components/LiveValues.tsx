import { FC } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FormValues } from "../utils/formUtils";
import SubmissionSummary from "./SubmissionSummary";

interface LiveValuesProps {
  values: FormValues;
}

const LiveValues: FC<LiveValuesProps> = ({ values }) => {
  return (
    <details className="group mt-6 rounded-xl border border-white/10 bg-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm">
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10 [&::-webkit-details-marker]:hidden">
        Huidige waarden
        <FaChevronDown
          className="text-white/70 transition-transform duration-200 group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <div className="border-t border-white/10 px-4 py-3">
        <SubmissionSummary values={values} />
      </div>
    </details>
  );
};

export default LiveValues;
