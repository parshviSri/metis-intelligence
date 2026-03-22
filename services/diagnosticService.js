/**
 * diagnosticService.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Single-responsibility API layer for the Metis Intelligence diagnostic form.
 *
 * Responsibilities:
 *  1. Normalise / clean raw form state into the exact JSON shape the backend expects.
 *  2. Send POST /api/v1/diagnostic/submit with proper headers & error handling.
 *  3. Return a structured result object  { data, error } – never throws.
 *
 * Keep this file free of any React or UI concerns.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** Base URL reads from Next.js public env var; falls back to localhost for dev. */
const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const ENDPOINT = `${API_BASE}/api/v1/diagnostic/submit`;

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
 * Accepts:  array, comma-separated string, or single string.
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
 * Transforms the raw multi-step form state object into the clean JSON payload
 * that POST /api/v1/diagnostic/submit expects.
 *
 * Field mapping:
 *   responses.businessName          → business_name        (string)
 *   responses.businessType          → business_type        (string)
 *   responses.products              → products             (string)
 *   responses.aov                   → aov                  (number)
 *   responses.grossMargin           → margin               (number, %)
 *   responses.monthlyMarketingSpend → marketing_spend      (number)
 *   responses.cac                   → cac                  (number)
 *   responses.repeatPurchaseRate    → repeat_purchase_rate (number, %)
 *   responses.channels              → channels             (string[])
 *   responses.conversionRate        → conversion_rate      (number, %)
 *   responses.biggestChallenge      → biggest_challenge    (string)
 *   everything else                 → additional_inputs    (dict)
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
    // Capture everything else for additional_inputs
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

    // ── Catch-all for optional/dynamic fields ─────────────────────────────
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
 * Returns an array of human-readable error strings.
 * Empty array means the payload is valid.
 *
 * @param  {object} payload  Normalised payload from normalisePayload()
 * @returns {string[]}       Validation error messages
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

// ─── API Call ─────────────────────────────────────────────────────────────────

/**
 * submitDiagnostic(responses)
 *
 * Main entry point called by the UI.
 *
 * Normalises → validates → sends POST → returns { data | error }.
 * Never throws so callers can safely do:
 *
 *   const { data, error } = await submitDiagnostic(responses);
 *
 * @param  {object} responses  Raw form state from the wizard
 * @returns {Promise<{ data: object|null, error: string|null }>}
 */
export const submitDiagnostic = async (responses) => {
  // 1. Normalise
  const payload = normalisePayload(responses);

  // 2. Client-side validation
  const validationErrors = validatePayload(payload);
  if (validationErrors.length > 0) {
    return { data: null, error: validationErrors.join(" ") };
  }

  // 3. Send to backend
  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    // 4a. Non-2xx → extract detail from FastAPI error body
    if (!response.ok) {
      let detail = `Server error (${response.status})`;
      try {
        const errBody = await response.json();
        // FastAPI validation errors come back as { detail: [ {msg, loc}, … ] }
        if (typeof errBody.detail === "string") {
          detail = errBody.detail;
        } else if (Array.isArray(errBody.detail)) {
          detail = errBody.detail
            .map((e) => `${e.loc?.slice(-1)[0] ?? "field"}: ${e.msg}`)
            .join("; ");
        }
      } catch {
        // ignore parse failure – keep status-based message
      }
      return { data: null, error: detail };
    }

    // 4b. Success – parse JSON
    const data = await response.json();
    return { data, error: null };

  } catch (networkError) {
    // Network failure, CORS, timeout, etc.
    const message =
      networkError instanceof TypeError
        ? "Unable to reach the server. Please check your connection and try again."
        : `An unexpected error occurred: ${networkError.message}`;
    return { data: null, error: message };
  }
};
