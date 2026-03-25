/**
 * pages/diagnostics.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Diagnostic History page.
 *
 * Fetches the paginated list from GET /api/v1/diagnostics and renders each
 * DiagnosticSummary as a card. Clicking a card loads the full report via
 * GET /api/v1/diagnostic/{id} and renders it in a slide-in detail panel using
 * the existing DiagnosticResults component.
 *
 * State:
 *   summaries     – DiagnosticSummary[]  from listDiagnostics()
 *   listStatus    – "idle" | "loading" | "success" | "error"
 *   listError     – string | null
 *   selectedId    – number | null        (which card is expanded)
 *   detail        – DiagnosticResponse  (full report for selectedId)
 *   detailStatus  – "idle" | "loading" | "success" | "error"
 *   detailError   – string | null
 *   page          – current page index (0-based)
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Building2,
  Calendar,
  ChevronDown,
  ChevronUp,
  Loader2,
  RefreshCw,
  Search,
} from "lucide-react";
import Nav from "../components/layout/Nav";
import Footer from "../components/layout/Footer";
import Card from "../components/ui/Card";
import DiagnosticResults from "../components/diagnostic/DiagnosticResults";
import { getDiagnostic, listDiagnostics } from "../services/diagnosticService";

// ─── Constants ─────────────────────────────────────────────────────────────────

const PAGE_SIZE = 10;

// ─── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Format ISO timestamp to a readable local date string.
 * e.g. "25 Mar 2026, 14:32"
 */
const formatDate = (iso) => {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
};

/**
 * Returns Bootstrap badge colour + label for a health score.
 */
const scoreBadge = (score) => {
  if (score === null || score === undefined) return { cls: "secondary", label: "Pending" };
  if (score >= 75) return { cls: "success", label: `${score} — Strong` };
  if (score >= 50) return { cls: "warning", label: `${score} — Moderate` };
  return { cls: "danger", label: `${score} — Needs Attention` };
};

/**
 * Capitalise first letter of a business_type string.
 */
const formatType = (t) =>
  t ? t.charAt(0).toUpperCase() + t.slice(1) : "—";

// ─── Sub-components ────────────────────────────────────────────────────────────

const LoadingSpinner = ({ label = "Loading…" }) => (
  <div className="d-flex flex-column align-items-center justify-content-center py-5 gap-3">
    <Loader2
      size={40}
      className="text-primary"
      style={{ animation: "spin 1s linear infinite" }}
    />
    <p className="text-muted mb-0">{label}</p>
    <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
  </div>
);

const ErrorAlert = ({ message, onRetry }) => (
  <div className="alert alert-danger d-flex align-items-start gap-3" role="alert">
    <AlertCircle size={20} className="flex-shrink-0 mt-1" />
    <div className="flex-grow-1">
      <div className="fw-semibold mb-1">Something went wrong</div>
      <div className="small">{message}</div>
    </div>
    {onRetry && (
      <button
        type="button"
        className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
        onClick={onRetry}
      >
        <RefreshCw size={14} /> Retry
      </button>
    )}
  </div>
);

// ─── Summary card ──────────────────────────────────────────────────────────────

const SummaryCard = ({ summary, isExpanded, onToggle, detail, detailStatus, detailError }) => {
  const { cls: badgeCls, label: badgeLabel } = scoreBadge(summary.health_score);

  return (
    <div className="mb-3">
      {/* ── Clickable header row ── */}
      <button
        type="button"
        className={`w-100 text-start btn p-0 border-0 bg-transparent`}
        onClick={() => onToggle(summary.diagnostic_id)}
        aria-expanded={isExpanded}
      >
        <Card
          className={`border shadow-sm mb-0 ${
            isExpanded ? "border-primary" : ""
          }`}
          style={{ transition: "border-color 0.2s" }}
        >
          <div className="d-flex align-items-start align-items-md-center flex-column flex-md-row gap-3">
            {/* Icon */}
            <div
              className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
              style={{ width: 48, height: 48, backgroundColor: "rgba(0,150,199,0.1)" }}
            >
              <Building2 size={22} className="text-primary" />
            </div>

            {/* Name + meta */}
            <div className="flex-grow-1">
              <div className="d-flex flex-wrap align-items-center gap-2 mb-1">
                <span className="fw-bold text-dark">{summary.business_name}</span>
                <span className="badge text-bg-light border small">
                  {formatType(summary.business_type)}
                </span>
              </div>
              <div className="d-flex flex-wrap gap-3 text-muted small">
                <span className="d-flex align-items-center gap-1">
                  <Calendar size={12} />
                  {formatDate(summary.created_at)}
                </span>
                <span className="d-flex align-items-center gap-1">
                  <Search size={12} />
                  ID #{summary.diagnostic_id}
                </span>
              </div>
            </div>

            {/* Health score badge */}
            <div className="d-flex align-items-center gap-3 ms-md-auto flex-shrink-0">
              <span className={`badge text-bg-${badgeCls} px-3 py-2 fs-6`}>
                {badgeLabel}
              </span>
              {isExpanded ? (
                <ChevronUp size={20} className="text-muted" />
              ) : (
                <ChevronDown size={20} className="text-muted" />
              )}
            </div>
          </div>
        </Card>
      </button>

      {/* ── Expanded detail panel ── */}
      {isExpanded && (
        <div className="border border-top-0 border-primary rounded-bottom-3 p-3 p-md-4 bg-white">
          {detailStatus === "loading" && (
            <LoadingSpinner label="Fetching full report…" />
          )}
          {detailStatus === "error" && (
            <ErrorAlert message={detailError} />
          )}
          {detailStatus === "success" && detail && (
            <DiagnosticResults
              result={detail}
              onRetry={() => onToggle(null)}
            />
          )}
        </div>
      )}
    </div>
  );
};

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function DiagnosticsHistory() {
  const [summaries, setSummaries] = useState([]);
  const [listStatus, setListStatus] = useState("idle");
  const [listError, setListError] = useState(null);

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [selectedId, setSelectedId] = useState(null);
  const [detail, setDetail] = useState(null);
  const [detailStatus, setDetailStatus] = useState("idle");
  const [detailError, setDetailError] = useState(null);

  // ── Fetch list ──────────────────────────────────────────────────────────────

  const fetchList = useCallback(async (pageIndex) => {
    setListStatus("loading");
    setListError(null);

    const { data, error } = await listDiagnostics({
      skip: pageIndex * PAGE_SIZE,
      limit: PAGE_SIZE,
    });

    if (error) {
      setListStatus("error");
      setListError(error);
      return;
    }

    setSummaries(data ?? []);
    setHasMore((data ?? []).length === PAGE_SIZE);
    setListStatus("success");
  }, []);

  useEffect(() => {
    fetchList(page);
  }, [fetchList, page]);

  // ── Toggle detail ───────────────────────────────────────────────────────────

  const handleToggle = useCallback(
    async (id) => {
      // Collapse if already open
      if (selectedId === id) {
        setSelectedId(null);
        setDetail(null);
        setDetailStatus("idle");
        setDetailError(null);
        return;
      }

      setSelectedId(id);
      setDetail(null);
      setDetailStatus("loading");
      setDetailError(null);

      const { data, error } = await getDiagnostic(id);

      if (error) {
        setDetailStatus("error");
        setDetailError(error);
        return;
      }

      setDetail(data);
      setDetailStatus("success");
    },
    [selectedId]
  );

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div className="min-vh-100 bg-white" id="top">
      <Nav />
      <main>
        {/* ── Hero banner ── */}
        <section
          className="py-5"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,150,199,0.08) 0%, rgba(255,255,255,1) 74%)",
          }}
        >
          <div className="container py-4">
            <div className="row justify-content-center text-center">
              <div className="col-12 col-lg-8">
                <span className="badge rounded-pill text-bg-light border px-3 py-2 mb-3">
                  <BarChart3 size={13} className="me-1" />
                  Diagnostic History
                </span>
                <h1 className="display-4 fw-bold text-dark mb-3">
                  All Submitted Diagnostics
                </h1>
                <p className="lead text-muted mb-0">
                  Browse every diagnostic submitted through the platform. Click
                  any row to expand the full health report.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Content ── */}
        <section className="py-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-xl-10">

                {/* Action bar */}
                <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
                  <div className="text-muted small">
                    {listStatus === "success" && (
                      <>
                        Showing{" "}
                        <strong>{summaries.length}</strong> result
                        {summaries.length !== 1 ? "s" : ""} (page {page + 1})
                      </>
                    )}
                  </div>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1"
                      onClick={() => fetchList(page)}
                      disabled={listStatus === "loading"}
                    >
                      <RefreshCw size={14} /> Refresh
                    </button>
                    <Link href="/diagnostic" className="btn btn-custom-primary btn-sm">
                      + New Diagnostic
                    </Link>
                  </div>
                </div>

                {/* Loading */}
                {listStatus === "loading" && (
                  <LoadingSpinner label="Loading diagnostics…" />
                )}

                {/* Error */}
                {listStatus === "error" && (
                  <ErrorAlert
                    message={listError}
                    onRetry={() => fetchList(page)}
                  />
                )}

                {/* Empty state */}
                {listStatus === "success" && summaries.length === 0 && (
                  <Card className="border-0 shadow-sm text-center py-5">
                    <BarChart3 size={48} className="text-muted mb-3" />
                    <h3 className="h5 fw-bold text-dark mb-2">
                      No diagnostics yet
                    </h3>
                    <p className="text-muted mb-4">
                      Submit your first diagnostic to see results here.
                    </p>
                    <Link href="/diagnostic" className="btn btn-custom-primary">
                      Start a Diagnostic
                    </Link>
                  </Card>
                )}

                {/* List */}
                {listStatus === "success" && summaries.length > 0 && (
                  <>
                    {summaries.map((summary) => (
                      <SummaryCard
                        key={summary.diagnostic_id}
                        summary={summary}
                        isExpanded={selectedId === summary.diagnostic_id}
                        onToggle={handleToggle}
                        detail={detail}
                        detailStatus={
                          selectedId === summary.diagnostic_id
                            ? detailStatus
                            : "idle"
                        }
                        detailError={
                          selectedId === summary.diagnostic_id
                            ? detailError
                            : null
                        }
                      />
                    ))}

                    {/* Pagination */}
                    <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                      <button
                        className="btn btn-outline-dark d-flex align-items-center gap-2"
                        onClick={() => {
                          setSelectedId(null);
                          setPage((p) => Math.max(p - 1, 0));
                        }}
                        disabled={page === 0 || listStatus === "loading"}
                      >
                        <ArrowLeft size={16} /> Previous
                      </button>
                      <span className="text-muted small">Page {page + 1}</span>
                      <button
                        className="btn btn-outline-dark d-flex align-items-center gap-2"
                        onClick={() => {
                          setSelectedId(null);
                          setPage((p) => p + 1);
                        }}
                        disabled={!hasMore || listStatus === "loading"}
                      >
                        Next <ArrowRight size={16} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
