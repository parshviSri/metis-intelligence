/**
 * DiagnosticResults.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Renders the structured API report returned by POST /api/v1/diagnostic/submit.
 *
 * Props:
 *  result  {object}  – the full DiagnosticResponse from the backend:
 *    {
 *      diagnostic_id: number,
 *      report_id:     number,
 *      health_score:  number (0-100),
 *      insights:      [{ category, text }, …],
 *      recommendations: [{ priority, action, rationale }, …],
 *      llm_response:  string (raw, not shown in UI),
 *    }
 *  onRetry {function} – called when the user wants to go back and edit
 * ─────────────────────────────────────────────────────────────────────────────
 */

import {
  AlertCircle,
  ArrowLeft,
  BarChart3,
  CheckCircle2,
  CircleDollarSign,
  Lightbulb,
  Sparkles,
  Target,
} from "lucide-react";
import Card from "../ui/Card";

// ─── Score helpers ─────────────────────────────────────────────────────────

/**
 * Returns Bootstrap text colour class + label based on the 0-100 health score.
 */
const scoreTone = (score) => {
  if (score >= 75) return { cls: "text-success", label: "Strong" };
  if (score >= 50) return { cls: "text-warning", label: "Moderate" };
  return { cls: "text-danger", label: "Needs Attention" };
};

/**
 * Converts numeric score to a Bootstrap progress-bar colour class.
 */
const progressColour = (score) => {
  if (score >= 75) return "bg-success";
  if (score >= 50) return "bg-warning";
  return "bg-danger";
};

// ─── Priority badge ────────────────────────────────────────────────────────

const PRIORITY_STYLES = {
  high:   { badge: "danger",  label: "High Priority" },
  medium: { badge: "warning", label: "Medium Priority" },
  low:    { badge: "info",    label: "Low Priority" },
};

const PriorityBadge = ({ priority }) => {
  const p = priority?.toLowerCase() || "medium";
  const style = PRIORITY_STYLES[p] || PRIORITY_STYLES.medium;
  return (
    <span className={`badge text-bg-${style.badge} me-2`}>
      {style.label}
    </span>
  );
};

// ─── Sub-components ────────────────────────────────────────────────────────

/**
 * Large circular score dial (pure CSS, no canvas).
 */
const ScoreDial = ({ score }) => {
  const { cls, label } = scoreTone(score);
  const circumference = 2 * Math.PI * 54; // r=54
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="d-flex flex-column align-items-center py-4">
      <div className="position-relative" style={{ width: 140, height: 140 }}>
        {/* Track */}
        <svg width="140" height="140" className="position-absolute top-0 start-0">
          <circle
            cx="70" cy="70" r="54"
            fill="none"
            stroke="#e9ecef"
            strokeWidth="10"
          />
          <circle
            cx="70" cy="70" r="54"
            fill="none"
            stroke={score >= 75 ? "#198754" : score >= 50 ? "#ffc107" : "#dc3545"}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 70 70)"
            style={{ transition: "stroke-dashoffset 1s ease" }}
          />
        </svg>
        {/* Centre text */}
        <div
          className="position-absolute top-50 start-50 translate-middle text-center"
        >
          <div className={`fw-bold ${cls}`} style={{ fontSize: "2rem", lineHeight: 1 }}>
            {score}
          </div>
          <div className="text-muted" style={{ fontSize: "0.7rem" }}>/ 100</div>
        </div>
      </div>
      <div className={`mt-2 fw-semibold ${cls}`}>{label}</div>
      <div className="text-muted small mt-1">Business Health Score</div>
    </div>
  );
};

/**
 * Single insight card.
 */
const InsightCard = ({ insight, index }) => (
  <div className="rounded-3 border-start border-4 border-primary bg-light p-3 mb-3">
    <div className="d-flex align-items-start gap-2">
      <Lightbulb size={16} className="text-primary mt-1 flex-shrink-0" />
      <div>
        <div className="fw-semibold text-dark mb-1">
          {insight.category}
        </div>
        <div className="text-muted small">{insight.text}</div>
      </div>
    </div>
  </div>
);

/**
 * Single recommendation card.
 */
const RecommendationCard = ({ rec, index }) => (
  <div className="rounded-3 border bg-white p-3 mb-3">
    <div className="d-flex align-items-start gap-2 mb-2">
      <Target size={16} className="text-primary mt-1 flex-shrink-0" />
      <div className="flex-grow-1">
        <div className="d-flex flex-wrap align-items-center gap-1 mb-1">
          <PriorityBadge priority={rec.priority} />
          <span className="fw-semibold text-dark">{rec.action}</span>
        </div>
        <div className="text-muted small">{rec.rationale}</div>
      </div>
    </div>
  </div>
);

// ─── Main component ────────────────────────────────────────────────────────

const DiagnosticResults = ({ result, onRetry }) => {
  if (!result) return null;

  const {
    diagnostic_id,
    health_score,
    insights = [],
    recommendations = [],
  } = result;

  const { cls: scoreCls, label: scoreLabel } = scoreTone(health_score);

  return (
    <div className="animate-fade-in-up">
      {/* ── Header row ── */}
      <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
        <div>
          <span className="text-uppercase small fw-bold text-primary">
            Diagnostic Report
          </span>
          <h2 className="display-6 fw-bold text-dark mt-1 mb-0">
            Your Business Health Report
          </h2>
          {diagnostic_id && (
            <p className="text-muted small mb-0 mt-1">
              Report ID: #{diagnostic_id}
            </p>
          )}
        </div>
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2"
          onClick={onRetry}
        >
          <ArrowLeft size={16} /> Edit Responses
        </button>
      </div>

      <div className="row g-4">
        {/* ── Left column – Score dial + score bar ── */}
        <div className="col-12 col-lg-4">
          <Card
            className="border-0 shadow-lg h-100"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,150,199,0.08) 0%, rgba(255,255,255,1) 100%)",
            }}
          >
            <ScoreDial score={health_score} />

            {/* Score progress bar */}
            <div className="mt-2 px-2">
              <div className="progress" style={{ height: 8 }}>
                <div
                  className={`progress-bar ${progressColour(health_score)}`}
                  role="progressbar"
                  style={{ width: `${health_score}%`, transition: "width 1s ease" }}
                  aria-valuenow={health_score}
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
              <div className="d-flex justify-content-between text-muted small mt-1">
                <span>0</span>
                <span>50</span>
                <span>100</span>
              </div>
            </div>

            {/* Score legend */}
            <div className="mt-4 d-flex flex-column gap-2">
              {[
                { range: "75–100", label: "Strong", cls: "text-success" },
                { range: "50–74", label: "Moderate", cls: "text-warning" },
                { range: "0–49",  label: "Needs Attention", cls: "text-danger" },
              ].map(({ range, label, cls }) => (
                <div key={range} className="d-flex align-items-center gap-2">
                  <CheckCircle2
                    size={14}
                    className={`${cls} flex-shrink-0`}
                  />
                  <span className="text-muted small">
                    <strong>{range}</strong> — {label}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* ── Right column – Insights + Recommendations ── */}
        <div className="col-12 col-lg-8">
          {/* Insights */}
          <Card className="border-0 shadow-sm mb-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <Sparkles className="text-primary" size={20} />
              <h3 className="h4 fw-bold text-dark mb-0">Key Insights</h3>
              <span className="badge rounded-pill text-bg-light border ms-auto">
                {insights.length}
              </span>
            </div>
            {insights.length > 0 ? (
              insights.map((insight, i) => (
                <InsightCard key={i} insight={insight} index={i} />
              ))
            ) : (
              <p className="text-muted mb-0">No insights returned.</p>
            )}
          </Card>

          {/* Recommendations */}
          <Card className="border-0 shadow-sm">
            <div className="d-flex align-items-center gap-2 mb-3">
              <BarChart3 className="text-success" size={20} />
              <h3 className="h4 fw-bold text-dark mb-0">Recommendations</h3>
              <span className="badge rounded-pill text-bg-light border ms-auto">
                {recommendations.length}
              </span>
            </div>
            {recommendations.length > 0 ? (
              recommendations.map((rec, i) => (
                <RecommendationCard key={i} rec={rec} index={i} />
              ))
            ) : (
              <p className="text-muted mb-0">No recommendations returned.</p>
            )}
          </Card>
        </div>
      </div>

      {/* ── Disclaimer ── */}
      <Card className="border-0 shadow-sm mt-4">
        <div className="d-flex align-items-start gap-2">
          <AlertCircle size={18} className="text-warning mt-1 flex-shrink-0" />
          <p className="text-muted small mb-0">
            This is a strategic diagnostic, not a financial audit. It is designed to
            surface likely growth constraints and guide smarter questions — not replace
            professional financial advice.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default DiagnosticResults;
