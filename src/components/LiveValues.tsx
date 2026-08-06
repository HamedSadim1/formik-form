import { FC } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FormValues, LABELS } from "@/utils/constants";
import { glassPanelBlur } from "@/utils/uiClasses";
import SubmissionSummary from "@/components/SubmissionSummary";

interface LiveValuesProps {
  values: FormValues;
}

const LiveValues: FC<LiveValuesProps> = ({ values }) => {
  return (
    <details className={`group mt-6 ${glassPanelBlur}`}>
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10 [&::-webkit-details-marker]:hidden">
        {LABELS.devPanel.heading}
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
