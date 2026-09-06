import { ComplianceStatus } from "./ComplianceStatus"
import TrafficLight from "./TrafficLight"

export default function ComplianceBanner({
  status,
  onStatusChange,
}: {
  status: ComplianceStatus
  onStatusChange: (s: ComplianceStatus) => void
}) {
  const cfg = {
    compliant: {
      bg: "rgba(46,125,82,0.07)",
      border: "rgba(46,125,82,0.18)",
      labelColor: "#1a5c38",
      label: "Compliant",
      desc: "All QCO checks passed. Document ready for tender issuance.",
    },
    partial: {
      bg: "rgba(154,114,0,0.06)",
      border: "rgba(154,114,0,0.18)",
      labelColor: "#624800",
      label: "Under Review",
      desc: "QCO order detected. Verify bidder licence before issuance.",
    },
    "non-compliant": {
      bg: "rgba(155,53,53,0.06)",
      border: "rgba(155,53,53,0.16)",
      labelColor: "#7c1d1d",
      label: "Non-Compliant",
      desc: "Specification gaps identified. Revision required.",
    },
  }[status]

  return (
    <div className="relative">
       {/*coming soon overlay */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-10 max-w-md p-6 mx-auto rounded-xl bg-white/30 backdrop-blur-md border border-white/20 shadow-lg opacity-90">
          <p className="mt-2 black">
            COMING SOON
          </p>
        </div>
    <div
    className="flex items-center gap-3 px-4 py-3 rounded-xl border"
    style={{ background: cfg.bg, borderColor: cfg.border }}
    >    
      <TrafficLight status={status} />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{
              color: cfg.labelColor,
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.09em",
            }}
            >
            QCO Status
          </span>
          <span className="text-sm font-bold text-slate-800">{cfg.label}</span>
        </div>
        <p className="text-xs text-slate-500 mt-0.5 leading-snug">{cfg.desc}</p>
      </div>
      <div className="flex flex-col gap-1.5 shrink-0">
        {(["compliant", "partial", "non-compliant"] as ComplianceStatus[]).map(
          (s) => (
            <button
            key={s}
            onClick={() => onStatusChange(s)}
            className="px-2.5 py-1 rounded-lg text-xs font-medium transition-all"
            style={{
              background: status === s ? "#1e3a5f" : "rgba(0,0,0,0.04)",
              color: status === s ? "white" : "#64748b",
              border: status === s ? "none" : "1px solid rgba(0,0,0,0.08)",
            }}
            >
              {s === "compliant"
                ? "Compliant"
                : s === "partial"
                ? "Partial"
                : "Non-Compliant"}
            </button>
          ),
        )}
      </div>
    </div>
    </div>
  )
}