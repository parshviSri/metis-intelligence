/**
 * useDiagnostic.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Central state hook for the Metis Intelligence diagnostic wizard.
 *
 * Owns:
 *  • responses  – single source of truth for all form field values
 *  • status     – "idle" | "loading" | "success" | "error"
 *  • result     – the parsed API response on success
 *  • error      – human-readable error string on failure
 *
 * Exposes helpers consumed by diagnostic.js and its sub-components:
 *  • handleChange(event)         – generic onChange for text/select/number inputs
 *  • toggleFocusArea(key)        – toggle a focus-area chip
 *  • setResponses(updater)       – direct escape-hatch (e.g. addRetentionFocus)
 *  • submit()                    – normalise → validate → POST → update status
 *  • reset()                     – start fresh (retry flow)
 *
 * All API logic is delegated to services/diagnosticService.js.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useCallback, useState } from "react";
import { submitDiagnostic } from "../services/diagnosticService";

// ─── Initial state ─────────────────────────────────────────────────────────

/**
 * Mirrors the full flat form state used by the wizard.
 * Keeps every field at the top level so handleChange works without nesting.
 */
const INITIAL_RESPONSES = {
  // Step 1 – Business Basics
  businessName: "",
  businessType: "",
  products: "",

  // Step 2 – Core Metrics (Revenue & Profit + CAC)
  aov: "",
  grossMargin: "",
  monthlyMarketingSpend: "",
  cac: "",
  repeatPurchaseRate: "",

  // Step 3 – Focus Selection
  focusAreas: [],

  // Step 4 – Dynamic Questions (acquisition)
  channels: "",
  conversionRate: "",
  cacByChannel: "",

  // Step 4 – Dynamic Questions (profitability)
  contributionMargin: "",
  productProfitability: "",
  revenueBreakdown: "",

  // Step 4 – Dynamic Questions (retention)
  ltv: "",
  timeBetweenPurchases: "",
  cohortTracking: "",

  // Step 4 – Dynamic Questions (growth)
  experiments: "",
  funnelMetrics: "",
  dropOffRates: "",

  // Step 5 – Challenges (new step)
  biggestChallenge: "",
};

// ─── Hook ──────────────────────────────────────────────────────────────────

/**
 * @returns {{
 *   responses: object,
 *   status: "idle"|"loading"|"success"|"error",
 *   result: object|null,
 *   error: string|null,
 *   handleChange: (event: Event) => void,
 *   toggleFocusArea: (key: string) => void,
 *   setResponses: React.Dispatch,
 *   submit: () => Promise<void>,
 *   reset: () => void,
 * }}
 */
const useDiagnostic = () => {
  const [responses, setResponses] = useState(INITIAL_RESPONSES);

  /**
   * status lifecycle:
   *   "idle"    → form is being filled in
   *   "loading" → POST in flight
   *   "success" → API returned a valid report
   *   "error"   → validation failure or API error
   */
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // ── Handlers ────────────────────────────────────────────────────────────

  /** Generic onChange for <input>, <select>, <textarea>. */
  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setResponses((prev) => ({ ...prev, [name]: value }));
  }, []);

  /** Toggle a focus-area key in the focusAreas array. */
  const toggleFocusArea = useCallback((key) => {
    setResponses((prev) => {
      const already = prev.focusAreas.includes(key);
      return {
        ...prev,
        focusAreas: already
          ? prev.focusAreas.filter((k) => k !== key)
          : [...prev.focusAreas, key],
      };
    });
  }, []);

  // ── Submission ──────────────────────────────────────────────────────────

  /**
   * submit()
   *
   * Called when the user reaches the Results step and clicks "Get My Report".
   * Delegates all normalisation, validation, and network logic to
   * diagnosticService.submitDiagnostic().
   */
  const submit = useCallback(async () => {
    setStatus("loading");
    setError(null);
    setResult(null);

    const { data, error: apiError } = await submitDiagnostic(responses);

    if (apiError) {
      setStatus("error");
      setError(apiError);
      return;
    }

    setResult(data);
    setStatus("success");
  }, [responses]);

  // ── Reset ────────────────────────────────────────────────────────────────

  /**
   * reset()
   *
   * Clears submission state so the user can retry without reloading the page.
   * Preserves form responses so they don't have to re-fill everything.
   */
  const reset = useCallback(() => {
    setStatus("idle");
    setError(null);
    setResult(null);
  }, []);

  return {
    responses,
    status,
    result,
    error,
    handleChange,
    toggleFocusArea,
    setResponses,
    submit,
    reset,
  };
};

export default useDiagnostic;
