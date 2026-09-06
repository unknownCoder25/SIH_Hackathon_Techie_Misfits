import { ComplianceStatus } from "./ComplianceStatus"
import ComplianceBanner from "./ComplianceBanner"
import QCOMandatoryBadge from "./QCOMandatoryBadge"
import ClauseOutputBox from "./ClauseOutputBox"
import ExportToolbar from "./ExportToolbar"
import { TieredStandardsBreakdown } from "./TieredStandardsCards"
import { ApiResponse } from "./TieredStandardsCards"
// ─── Right panel: Standards & Clause ─────────────────────────────────────────

export default function RightPanel({
  complianceStatus,
  onStatusChange,
  latestResponse,
}: {
  complianceStatus: ComplianceStatus
  onStatusChange: (s: ComplianceStatus) => void
  latestResponse: ApiResponse | null
}) {
  return (
    <div
      className="flex flex-col h-full overflow-hidden"
      style={{
        background: "rgba(250,252,255,0.93)",
        backdropFilter: "blur(24px)",
      }}
    >
      {/* Header */}
      <div
        className="px-5 py-2.5 shrink-0 flex items-center gap-2"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <rect
            x="1.5"
            y="1.5"
            width="9"
            height="9"
            rx="1.5"
            stroke="#94a3b8"
            strokeWidth="1.2"
          />
          <path
            d="M3.5 4.5h5M3.5 6.5h5M3.5 8.5h3"
            stroke="#94a3b8"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
        <span
          className="text-xs font-medium tracking-widest uppercase text-slate-400"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: "0.1em",
          }}
        >
          Standards Breakdown & Tender Clause
        </span>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto scrollbar-subtle px-4 py-4 flex flex-col gap-4">
        {/* QCO Compliance Banner */}
       
        <ComplianceBanner
          status={complianceStatus}
          onStatusChange={onStatusChange}
        />

        {latestResponse ? (
          <>
            {/* Red Statutory QCO Badge */}
            <QCOMandatoryBadge mandatory={latestResponse.qco_mandatory} />

            {/* Tiered Standards Breakdown */}
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2.5"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: "0.09em",
                }}
              >
                IS Standards Breakdown
              </p>
              <TieredStandardsBreakdown response={latestResponse} />
            </div>

            {/* Clause Output */}
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2.5"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: "0.09em",
                }}
              >
                Generated Tender Clause
              </p>
              <ClauseOutputBox clause={latestResponse.tender_clause} />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 gap-3 py-12">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background: "rgba(30,58,95,0.07)",
                border: "1px solid rgba(30,58,95,0.12)",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect
                  x="4"
                  y="3"
                  width="16"
                  height="18"
                  rx="2"
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                />
                <path
                  d="M8 8h8M8 12h8M8 16h5"
                  stroke="#94a3b8"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <p className="text-sm text-slate-400 text-center leading-relaxed max-w-xs">
              Enter a procurement specification in the chat to generate IS code
              recommendations and a tender clause.
            </p>
          </div>
        )}
      </div>

      {/* Export toolbar */}
      {latestResponse && (
        <div className="flex items-center gap-2 px-5 py-3 border-t border-slate-100/80 shrink-0">
          <ExportToolbar clause={latestResponse.tender_clause} />
        </div>
      )}
    </div>
  )
}