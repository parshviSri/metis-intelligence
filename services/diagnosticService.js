/**
 * diagnosticService.js
 * ─────────────────────────────────────────────────────────────────────────────
 * API layer for the Metis Intelligence diagnostic platform.
 *
 * Endpoints covered:
 *  POST   /api/v1/diagnostic/submit          → submitDiagnostic()
 *  GET    /api/v1/diagnostic/{diagnostic_id} → getDiagnostic()
 *  GET    /api/v1/diagnostics                → listDiagnostics()
 *  GET    /health                            → checkHealth()
 *
 * All public functions return { data, error } – they never throw.
 * Keep this file free of any React or UI concerns.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** Base URL reads from Next.js public env var; falls back to localhost for dev. */
export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// ─── Shared fetch helper ──────────────────────────────────────────────────────

/**
 * apiFetch(path, options)
 *
 * Thin wrapper around fetch that:
 *  - Prepends API_BASE
 *  - Sets JSON Accept/Content-Type headers
 *  - Parses FastAPI error bodies into a human-readable string
 *  - Never throws – always returns { data, error }
 *
 * @param  {string}  path     e.g. "/health" or "/api/v1/diagnostics"
 * @param  {object}  options  Standard fetch options (method, body, etc.)
 * @returns {Promise<{ data: any|null, error: string|null }>}
 */
const apiFetch = async (path, options = {}) => {
  const url = `${API_BASE}${path}`;
  const defaultHeaders = { Accept: "application/json" };

  // Only add Content-Type for requests with a body
  if (options.body) {
    defaultHeaders["Content-Type"] = "application/json";
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers: { ...defaultHeaders, ...options.headers },
    });

    if (!response.ok) {
      let detail = `Server error (${response.status})`;
      try {
        const errBody = await response.json();
        // FastAPI validation errors: { detail: string | [{msg, loc}, …] }
        if (typeof errBody.detail === "string") {
          detail = errBody.detail;
        } else if (Array.isArray(errBody.detail)) {
          detail = errBody.detail
            .map((e) => `${e.loc?.slice(-1)[0] ?? "field"}: ${e.msg}`)
            .join("; ");
        }
      } catch {
        // ignore JSON parse failure
      }
      return { data: null, error: detail };
    }

    const data = await response.json();
    return { data, error: null };
  } catch (networkError) {
    const message =
      networkError instanceof TypeError
        ? "Unable to reach the server. Please check your connection and try again."
        : `An unexpected error occurred: ${networkError.message}`;
    return { data: null, error: message };
  }
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Safely convert a value to a finite number.
 * Returns null (not 0) when the value is empty so the backend can distinguish
 * "not provided" from "explicitly zero".
 */
const toNumber = (value) => {
  if (value === "" || value === null || value === undefined) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
};

/**
 * Convert the channels field to a clean string array.
 * Accepts: array, comma-separated string, or single string.
 */
const toChannelsArray = (value) => {
  if (Array.isArray(value)) {
    return value.map((c) => String(c).trim()).filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);
  }
  return [];
};

// ─── Normaliser ───────────────────────────────────────────────────────────────

/**
 * normalisePayload(responses)
 *
 * Transforms the raw multi-step form state into the JSON payload that
 * POST /api/v1/diagnostic/submit expects.
 *
 * Field mapping (camelCase form → snake_case API):
 *   businessName          → business_name
 *   businessType          → business_type
 *   products              → products
 *   aov                   → aov
 *   grossMargin           → margin
 *   monthlyMarketingSpend → marketing_spend
 *   cac                   → cac
 *   repeatPurchaseRate    → repeat_purchase_rate
 *   channels              → channels
 *   conversionRate        → conversion_rate
 *   biggestChallenge      → biggest_challenge
 *   everything else       → additional_inputs
 *
 * @param  {object} responses  Raw form state from the wizard
 * @returns {object}           Clean payload ready to JSON.stringify
 */
export const normalisePayload = (responses) => {
  const {
    businessName,
    businessType,
    products,
    aov,
    grossMargin,
    monthlyMarketingSpend,
    cac,
    repeatPurchaseRate,
    channels,
    conversionRate,
    biggestChallenge,
    // Optional / additional_inputs fields
    focusAreas,
    contributionMargin,
    productProfitability,
    revenueBreakdown,
    cacByChannel,
    ltv,
    timeBetweenPurchases,
    cohortTracking,
    experiments,
    funnelMetrics,
    dropOffRates,
    ...rest
  } = responses;

  return {
    // ── Core required fields ──────────────────────────────────────────────
    business_name: (businessName || "").trim(),
    business_type: (businessType || "").trim(),
    products: (products || "").trim(),
    aov: toNumber(aov),
    margin: toNumber(grossMargin),
    marketing_spend: toNumber(monthlyMarketingSpend),
    cac: toNumber(cac),
    repeat_purchase_rate: toNumber(repeatPurchaseRate),
    channels: toChannelsArray(channels),
    conversion_rate: toNumber(conversionRate),
    biggest_challenge: (biggestChallenge || "").trim(),

    // ── Optional context forwarded to the LLM ────────────────────────────
    additional_inputs: {
      focus_areas: Array.isArray(focusAreas) ? focusAreas : [],
      contribution_margin: toNumber(contributionMargin),
      product_profitability: (productProfitability || "").trim(),
      revenue_breakdown: (revenueBreakdown || "").trim(),
      cac_by_channel: (cacByChannel || "").trim(),
      ltv: toNumber(ltv),
      time_between_purchases: (timeBetweenPurchases || "").trim(),
      cohort_tracking: (cohortTracking || "").trim(),
      experiments: (experiments || "").trim(),
      funnel_metrics: (funnelMetrics || "").trim(),
      drop_off_rates: (dropOffRates || "").trim(),
      ...rest,
    },
  };
};

// ─── Validator ────────────────────────────────────────────────────────────────

/**
 * validatePayload(payload)
 *
 * Client-side guard before sending to the API.
 * Returns an array of human-readable error strings (empty = valid).
 *
 * @param  {object} payload  Normalised payload from normalisePayload()
 * @returns {string[]}
 */
export const validatePayload = (payload) => {
  const errors = [];

  if (!payload.business_name)
    errors.push("Business name is required.");
  if (!payload.business_type)
    errors.push("Business type is required.");
  if (!payload.products)
    errors.push("Products / services description is required.");
  if (payload.aov === null || payload.aov <= 0)
    errors.push("Average Order Value must be a positive number.");
  if (payload.margin === null || payload.margin < 0 || payload.margin > 100)
    errors.push("Gross margin must be between 0 and 100.");
  if (payload.marketing_spend === null || payload.marketing_spend < 0)
    errors.push("Monthly marketing spend must be a non-negative number.");
  if (payload.cac === null || payload.cac < 0)
    errors.push("Customer Acquisition Cost must be a non-negative number.");
  if (
    payload.repeat_purchase_rate === null ||
    payload.repeat_purchase_rate < 0 ||
    payload.repeat_purchase_rate > 100
  )
    errors.push("Repeat purchase rate must be between 0 and 100.");
  if (!Array.isArray(payload.channels) || payload.channels.length === 0)
    errors.push("At least one marketing channel is required.");
  if (
    payload.conversion_rate === null ||
    payload.conversion_rate < 0 ||
    payload.conversion_rate > 100
  )
    errors.push("Conversion rate must be between 0 and 100.");
  if (!payload.biggest_challenge)
    errors.push("Please describe your biggest business challenge.");

  return errors;
};

// ─── API Calls ────────────────────────────────────────────────────────────────

/**
 * submitDiagnostic(responses)
 *
 * POST /api/v1/diagnostic/submit
 *
 * Normalises → validates → sends → returns { data: DiagnosticResponse | null, error }.
 *
 * @param  {object} responses  Raw form state from the wizard
 * @returns {Promise<{ data: object|null, error: string|null }>}
 */
export const submitDiagnostic = async (responses) => {
  const payload = normalisePayload(responses);

  const validationErrors = validatePayload(payload);
  if (validationErrors.length > 0) {
    return { data: null, error: validationErrors.join(" ") };
  }

  return apiFetch("/api/v1/diagnostic/submit", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

/**
 * getDiagnostic(diagnosticId)
 *
 * GET /api/v1/diagnostic/{diagnostic_id}
 *
 * Retrieves the full DiagnosticResponse for a previously submitted diagnostic.
 * Returns 404-derived error if the ID does not exist or has no report yet.
 *
 * @param  {number|string} diagnosticId
 * @returns {Promise<{ data: object|null, error: string|null }>}
 */
export const getDiagnostic = async (diagnosticId) => {
  if (!diagnosticId) {
    return { data: null, error: "A diagnostic ID is required." };
  }
  return apiFetch(`/api/v1/diagnostic/${diagnosticId}`);
};

/**
 * listDiagnostics(options)
 *
 * GET /api/v1/diagnostics
 *
 * Returns a paginated list of DiagnosticSummary objects (newest first).
 * Each item: { diagnostic_id, business_name, business_type, health_score, created_at }
 *
 * @param  {{ skip?: number, limit?: number }} options
 * @returns {Promise<{ data: object[]|null, error: string|null }>}
 */
export const listDiagnostics = async ({ skip = 0, limit = 20 } = {}) => {
  const params = new URLSearchParams({ skip, limit }).toString();
  return apiFetch(`/api/v1/diagnostics?${params}`);
};

/**
 * checkHealth()
 *
 * GET /health
 *
 * Liveness / readiness probe. Returns { status: "ok" } on success.
 *
 * @returns {Promise<{ data: object|null, error: string|null }>}
 */
export const checkHealth = async () => {
  return apiFetch("/health");
};
