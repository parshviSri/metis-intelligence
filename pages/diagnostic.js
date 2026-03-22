/**
 * pages/diagnostic.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Multi-step business diagnostic wizard for Metis Intelligence.
 *
 * Step flow (keys):
 *  basic → core → focus → dynamic → [smart] → challenges → results
 *
 * State & API submission are fully owned by useDiagnostic().
 * All field definitions come from data/diagnosticConfig.js.
 * All API logic lives in services/diagnosticService.js.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  Loader2,
  Sparkles,
  XCircle,
} from "lucide-react";
import Nav from "../components/layout/Nav";
import Footer from "../components/layout/Footer";
import Card from "../components/ui/Card";
import ProgressBar from "../components/diagnostic/ProgressBar";
import DiagnosticResults from "../components/diagnostic/DiagnosticResults";
import useDiagnostic from "../hooks/useDiagnostic";
import {
  basicInfoFields,
  challengesFields,
  coreMetricFields,
  focusAreas,
  resultsCategories,
  wizardStepLabels,
} from "../data/diagnosticConfig";

// ─── Field renderer ──────────────────────────────────────────────────────────

const renderField = (field, responses, handleChange) => {
  if (field.type === "select") {
    return (
      <select
        id={field.name}
        name={field.name}
        className="form-select form-select-lg"
        value={responses[field.name] ?? ""}
        onChange={handleChange}
      >
        <option value="" disabled>
          Select an option
        </option>
        {field.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === "textarea") {
    return (
      <textarea
        id={field.name}
        name={field.name}
        rows="4"
        className="form-control"
        value={responses[field.name] ?? ""}
        onChange={handleChange}
        placeholder={field.placeholder}
      />
    );
  }

  return (
    <input
      id={field.name}
      name={field.name}
      type={field.type}
      className="form-control form-control-lg"
      value={responses[field.name] ?? ""}
      onChange={handleChange}
      placeholder={field.placeholder}
    />
  );
};

// ─── Loading overlay ─────────────────────────────────────────────────────────

const LoadingOverlay = () => (
  <Card className="border-0 shadow-sm text-center py-5">
    <div className="d-flex flex-column align-items-center gap-3">
      {/* Animated spinner using lucide Loader2 + CSS spin */}
      <Loader2
        size={48}
        className="text-primary"
        style={{ animation: "spin 1s linear infinite" }}
      />
      <h3 className="h4 fw-bold text-dark mb-1">Analysing your business…</h3>
      <p className="text-muted mb-0">
        Our engine is crunching your metrics and building a personalised report.
        <br />
        This usually takes a few seconds.
      </p>
    </div>
    {/* Inline keyframe for spinner */}
    <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
  </Card>
);

// ─── Error banner ─────────────────────────────────────────────────────────────

const ErrorBanner = ({ message, onRetry }) => (
  <Card className="border-0 shadow-sm">
    <div className="alert alert-danger d-flex align-items-start gap-3 mb-4">
      <XCircle size={22} className="flex-shrink-0 mt-1" />
      <div>
        <div className="fw-semibold mb-1">Something went wrong</div>
        <div className="small">{message}</div>
      </div>
    </div>
    <div className="text-center">
      <button
        type="button"
        className="btn btn-custom-primary"
        onClick={onRetry}
      >
        Try Again
      </button>
    </div>
  </Card>
);

// ─── Helper: get business-type label ─────────────────────────────────────────

const getBusinessTypeLabel = (value) =>
  basicInfoFields
    .find((f) => f.name === "businessType")
    ?.options?.find((o) => o.value === value)?.label || value;

// ─── Main page ────────────────────────────────────────────────────────────────

export default function Diagnostic() {
  // Central hook – owns all state, validation, and API submission
  const {
    responses,
    status,
    result,
    error,
    handleChange,
    toggleFocusArea,
    setResponses,
    submit,
    reset,
  } = useDiagnostic();

  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});

  // ── Computed ──────────────────────────────────────────────────────────────

  const repeatPurchaseRate = parseFloat(responses.repeatPurchaseRate) || 0;
  const showRetentionPrompt =
    repeatPurchaseRate > 0 &&
    repeatPurchaseRate < 30 &&
    !responses.focusAreas.includes("retention");

  /** Build the ordered list of wizard step keys dynamically. */
  const visibleSteps = useMemo(() => {
    const stepKeys = [
      "basic",
      "core",
      "focus",
      "dynamic",
      ...(showRetentionPrompt ? ["smart"] : []),
      "challenges",
      "results",
    ];
    return stepKeys.map((key) => ({
      key,
      label:
        key === "smart"
          ? "Smart Prompts"
          : key === "challenges"
          ? "Challenges"
          : wizardStepLabels[
              ["basic", "core", "focus", "dynamic", "smart", "challenges", "results"].indexOf(key)
            ],
    }));
  }, [showRetentionPrompt]);

  const currentStepKey = visibleSteps[currentStep]?.key;
  const selectedFocusAreas = focusAreas.filter((area) =>
    responses.focusAreas.includes(area.key)
  );

  // ── Per-step validation ──────────────────────────────────────────────────

  const validateStep = () => {
    const nextErrors = {};

    if (currentStepKey === "basic") {
      basicInfoFields.forEach((field) => {
        if (field.required && !responses[field.name]) {
          nextErrors[field.name] = "This field is required.";
        }
      });
    }

    if (currentStepKey === "core") {
      coreMetricFields.forEach((field) => {
        if (field.required && !responses[field.name]) {
          nextErrors[field.name] = "This field is required.";
        }
      });
    }

    if (currentStepKey === "focus" && responses.focusAreas.length === 0) {
      nextErrors.focusAreas = "Select at least one area to analyse.";
    }

    if (currentStepKey === "challenges") {
      if (!responses.biggestChallenge?.trim()) {
        nextErrors.biggestChallenge = "Please describe your biggest challenge.";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  // ── Navigation ────────────────────────────────────────────────────────────

  const handleNext = async () => {
    // dynamic & smart steps are optional – skip validation
    if (currentStepKey !== "dynamic" && currentStepKey !== "smart") {
      if (!validateStep()) return;
    }

    const nextIndex = currentStep + 1;
    const nextKey = visibleSteps[nextIndex]?.key;

    if (nextKey === "results") {
      // Trigger API call; the loading/error/success states handle the rest
      await submit();
    }

    setCurrentStep((s) => Math.min(s + 1, visibleSteps.length - 1));
  };

  const handleBack = () => {
    // If we're back on the Results step after a submit error, reset API state
    if (currentStepKey === "results") reset();
    setCurrentStep((s) => Math.max(s - 1, 0));
  };

  const addRetentionFocus = () => {
    if (!responses.focusAreas.includes("retention")) {
      setResponses((prev) => ({
        ...prev,
        focusAreas: [...prev.focusAreas, "retention"],
      }));
    }
    setCurrentStep(visibleSteps.findIndex((s) => s.key === "dynamic"));
  };

  // ── Retry after error ─────────────────────────────────────────────────────

  const handleRetry = () => {
    reset();
    // Go back to challenges step so user can review before resubmitting
    const challengesIndex = visibleSteps.findIndex((s) => s.key === "challenges");
    setCurrentStep(challengesIndex >= 0 ? challengesIndex : 0);
  };

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="min-vh-100 bg-white" id="top">
      <Nav />
      <main>
        {/* Hero banner */}
        <section
          className="py-5"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,150,199,0.08) 0%, rgba(255,255,255,1) 74%)",
          }}
        >
          <div className="container py-4">
            <div className="row justify-content-center text-center">
              <div className="col-12 col-lg-9">
                <span className="badge rounded-pill text-bg-light border px-3 py-2 mb-3">
                  Business Diagnostic Tool
                </span>
                <h1 className="display-4 fw-bold text-dark mb-4">
                  Diagnose growth with a guided, founder-friendly workflow
                </h1>
                <p className="lead text-muted mb-0">
                  Share a few business inputs, focus on the areas that matter
                  most, and get a directional view of business health without
                  dashboard overload.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Wizard */}
        <section className="py-5">
          <div className="container">
            <div className="row g-4 align-items-start">
              {/* ── Main form card ── */}
              <div className="col-12 col-lg-8">
                <Card className="border-0 shadow-sm">
                  <ProgressBar
                    currentStep={currentStep}
                    totalSteps={visibleSteps.length}
                    labels={visibleSteps.map((s) => s.label)}
                  />

                  <div className="mt-5">
                    {/* ════════════════ STEP: basic ════════════════ */}
                    {currentStepKey === "basic" && (
                      <div>
                        <div className="mb-4">
                          <span className="text-uppercase small fw-bold text-primary">
                            Step 1
                          </span>
                          <h2 className="display-6 fw-bold text-dark mt-2 mb-3">
                            Basic business info
                          </h2>
                          <p className="text-muted mb-0">
                            Start with the essentials so the diagnostic has the
                            right business context.
                          </p>
                        </div>
                        <div className="row g-3">
                          {basicInfoFields.map((field) => (
                            <div key={field.name} className="col-12">
                              <label
                                htmlFor={field.name}
                                className="form-label fw-semibold"
                              >
                                {field.label}
                              </label>
                              {renderField(field, responses, handleChange)}
                              {errors[field.name] && (
                                <div className="text-danger small mt-2">
                                  {errors[field.name]}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* ════════════════ STEP: core ════════════════ */}
                    {currentStepKey === "core" && (
                      <div>
                        <div className="mb-4">
                          <span className="text-uppercase small fw-bold text-primary">
                            Step 2
                          </span>
                          <h2 className="display-6 fw-bold text-dark mt-2 mb-3">
                            Core metrics
                          </h2>
                          <p className="text-muted mb-0">
                            These metrics anchor the diagnostic and help assess
                            business economics quickly.
                          </p>
                        </div>
                        <div className="row g-3">
                          {coreMetricFields.map((field) => (
                            <div key={field.name} className="col-12 col-md-6">
                              <label
                                htmlFor={field.name}
                                className="form-label fw-semibold"
                              >
                                {field.label}
                              </label>
                              {renderField(field, responses, handleChange)}
                              {errors[field.name] && (
                                <div className="text-danger small mt-2">
                                  {errors[field.name]}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* ════════════════ STEP: focus ════════════════ */}
                    {currentStepKey === "focus" && (
                      <div>
                        <div className="mb-4">
                          <span className="text-uppercase small fw-bold text-primary">
                            Step 3
                          </span>
                          <h2 className="display-6 fw-bold text-dark mt-2 mb-3">
                            What would you like to analyse?
                          </h2>
                          <p className="text-muted mb-0">
                            Choose one or more focus areas. The next step will
                            adapt to match your selection.
                          </p>
                        </div>
                        <div className="row g-3">
                          {focusAreas.map((area) => {
                            const selected = responses.focusAreas.includes(area.key);
                            return (
                              <div key={area.key} className="col-12 col-md-6">
                                <button
                                  type="button"
                                  className="w-100 text-start btn p-0 border-0 bg-transparent"
                                  onClick={() => toggleFocusArea(area.key)}
                                >
                                  <div
                                    className={`rounded-4 border p-4 h-100 ${
                                      selected
                                        ? "border-primary shadow-sm bg-primary bg-opacity-10"
                                        : "bg-white"
                                    }`}
                                  >
                                    <div className="d-flex align-items-start justify-content-between gap-3">
                                      <div>
                                        <div
                                          className="rounded-circle d-flex align-items-center justify-content-center mb-3"
                                          style={{
                                            width: "52px",
                                            height: "52px",
                                            backgroundColor: `${area.color}18`,
                                          }}
                                        >
                                          <area.icon size={24} style={{ color: area.color }} />
                                        </div>
                                        <h3 className="h5 fw-bold text-dark">
                                          {area.title}
                                        </h3>
                                        <p className="text-muted mb-0">
                                          {area.description}
                                        </p>
                                      </div>
                                      {selected && (
                                        <CheckCircle2
                                          className="text-primary flex-shrink-0"
                                          size={22}
                                        />
                                      )}
                                    </div>
                                  </div>
                                </button>
                              </div>
                            );
                          })}
                        </div>
                        {errors.focusAreas && (
                          <div className="text-danger small mt-3">
                            {errors.focusAreas}
                          </div>
                        )}
                      </div>
                    )}

                    {/* ════════════════ STEP: dynamic ════════════════ */}
                    {currentStepKey === "dynamic" && (
                      <div>
                        <div className="mb-4">
                          <span className="text-uppercase small fw-bold text-primary">
                            Step 4
                          </span>
                          <h2 className="display-6 fw-bold text-dark mt-2 mb-3">
                            Dynamic questions
                          </h2>
                          <p className="text-muted mb-0">
                            These follow-up questions are tailored to the areas
                            you selected.
                          </p>
                        </div>
                        <div className="d-flex flex-column gap-4">
                          {selectedFocusAreas.map((area) => (
                            <Card
                              key={area.key}
                              className="border shadow-sm"
                              style={{ borderColor: `${area.color}22` }}
                            >
                              <div className="d-flex align-items-center gap-3 mb-4">
                                <div
                                  className="rounded-circle d-flex align-items-center justify-content-center"
                                  style={{
                                    width: "52px",
                                    height: "52px",
                                    backgroundColor: `${area.color}18`,
                                  }}
                                >
                                  <area.icon size={24} style={{ color: area.color }} />
                                </div>
                                <div>
                                  <h3 className="h4 fw-bold text-dark mb-1">
                                    {area.title}
                                  </h3>
                                  <p className="text-muted mb-0">
                                    {area.description}
                                  </p>
                                </div>
                              </div>
                              <div className="row g-3">
                                {area.fields.map((field) => (
                                  <div key={field.name} className="col-12">
                                    <label
                                      htmlFor={field.name}
                                      className="form-label fw-semibold"
                                    >
                                      {field.label}
                                    </label>
                                    {renderField(field, responses, handleChange)}
                                  </div>
                                ))}
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* ════════════════ STEP: smart ════════════════ */}
                    {currentStepKey === "smart" && (
                      <div>
                        <div className="mb-4">
                          <span className="text-uppercase small fw-bold text-primary">
                            Step 5
                          </span>
                          <h2 className="display-6 fw-bold text-dark mt-2 mb-3">
                            Smart prompts
                          </h2>
                          <p className="text-muted mb-0">
                            We noticed something worth exploring based on your
                            earlier answers.
                          </p>
                        </div>
                        <Card
                          className="border-0 shadow-sm"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(13,110,253,0.08) 0%, rgba(255,255,255,1) 100%)",
                          }}
                        >
                          <div className="d-flex align-items-start gap-3">
                            <Lightbulb className="text-primary mt-1" size={22} />
                            <div>
                              <div className="h5 fw-bold text-dark mb-2">
                                You may have a retention issue
                              </div>
                              <p className="text-muted mb-3">
                                Your repeat purchase rate is currently below our
                                retention threshold. Want to explore this further?
                              </p>
                              <div className="d-flex flex-column flex-sm-row gap-3">
                                <button
                                  type="button"
                                  className="btn btn-custom-primary"
                                  onClick={addRetentionFocus}
                                >
                                  Add Retention Questions
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-outline-dark"
                                  onClick={handleNext}
                                >
                                  Skip — Continue to Challenges
                                </button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </div>
                    )}

                    {/* ════════════════ STEP: challenges ════════════════ */}
                    {currentStepKey === "challenges" && (
                      <div>
                        <div className="mb-4">
                          <span className="text-uppercase small fw-bold text-primary">
                            {visibleSteps.findIndex((s) => s.key === "challenges") + 1 > 0
                              ? `Step ${visibleSteps.findIndex((s) => s.key === "challenges") + 1}`
                              : "Final Step"}
                          </span>
                          <h2 className="display-6 fw-bold text-dark mt-2 mb-3">
                            Your biggest challenge
                          </h2>
                          <p className="text-muted mb-0">
                            Tell us what is holding back your growth right now.
                            The more specific you are, the sharper the
                            recommendations.
                          </p>
                        </div>
                        <div className="row g-3">
                          {challengesFields.map((field) => (
                            <div key={field.name} className="col-12">
                              <label
                                htmlFor={field.name}
                                className="form-label fw-semibold"
                              >
                                {field.label}
                              </label>
                              {renderField(field, responses, handleChange)}
                              {errors[field.name] && (
                                <div className="text-danger small mt-2">
                                  {errors[field.name]}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* ════════════════ STEP: results ════════════════ */}
                    {currentStepKey === "results" && (
                      <div>
                        {/* Loading */}
                        {status === "loading" && <LoadingOverlay />}

                        {/* Error */}
                        {status === "error" && (
                          <ErrorBanner message={error} onRetry={handleRetry} />
                        )}

                        {/* Success – render report */}
                        {status === "success" && result && (
                          <DiagnosticResults result={result} onRetry={handleRetry} />
                        )}

                        {/* Idle fallback – should not normally be visible, but shown
                            if the user somehow lands here without submitting */}
                        {status === "idle" && (
                          <div className="text-center py-4">
                            <p className="text-muted mb-3">
                              Click &ldquo;Get My Report&rdquo; to submit your
                              diagnostic.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* ── Navigation buttons ── */}
                  {currentStepKey !== "results" && (
                    <div className="d-flex justify-content-between mt-5 pt-4 border-top">
                      <button
                        type="button"
                        className="btn btn-outline-dark d-flex align-items-center gap-2"
                        onClick={handleBack}
                        disabled={currentStep === 0}
                      >
                        <ArrowLeft size={18} /> Back
                      </button>

                      {currentStepKey !== "smart" && (
                        <button
                          type="button"
                          className="btn btn-custom-primary d-flex align-items-center gap-2"
                          onClick={handleNext}
                        >
                          {visibleSteps[currentStep + 1]?.key === "results"
                            ? "Get My Report"
                            : "Next"}
                          <ArrowRight size={18} />
                        </button>
                      )}
                    </div>
                  )}

                  {/* Back button on results step for non-success states */}
                  {currentStepKey === "results" && status !== "success" && status !== "loading" && (
                    <div className="d-flex justify-content-start mt-4 pt-3 border-top">
                      <button
                        type="button"
                        className="btn btn-outline-dark d-flex align-items-center gap-2"
                        onClick={handleBack}
                      >
                        <ArrowLeft size={18} /> Back
                      </button>
                    </div>
                  )}
                </Card>
              </div>

              {/* ── Sidebar tips ── */}
              <div className="col-12 col-lg-4">
                <Card
                  className="border-0 shadow-sm"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(0,150,199,0.06) 0%, rgba(255,255,255,1) 100%)",
                  }}
                >
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <Sparkles className="text-primary" size={20} />
                    <h3 className="h5 fw-bold text-dark mb-0">How it works</h3>
                  </div>
                  <ul className="list-unstyled text-muted small mb-0 d-flex flex-column gap-3">
                    {[
                      {
                        icon: "①",
                        text: "Fill in your business basics and core metrics in Steps 1 & 2.",
                      },
                      {
                        icon: "②",
                        text: "Select the areas you want to analyse and answer the tailored follow-up questions.",
                      },
                      {
                        icon: "③",
                        text: "Describe your biggest challenge so the engine can personalise recommendations.",
                      },
                      {
                        icon: "④",
                        text: "Receive a Business Health Score, key insights, and prioritised recommendations instantly.",
                      },
                    ].map(({ icon, text }) => (
                      <li key={icon} className="d-flex align-items-start gap-2">
                        <span className="fw-bold text-primary flex-shrink-0">
                          {icon}
                        </span>
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Mini summary card – shows entered data as context */}
                {(responses.businessName || responses.businessType) && (
                  <Card className="border-0 shadow-sm mt-3">
                    <div className="small text-uppercase fw-bold text-muted mb-3">
                      Your Business
                    </div>
                    <ul className="list-unstyled small text-dark mb-0 d-flex flex-column gap-2">
                      {responses.businessName && (
                        <li>
                          <span className="text-muted">Name: </span>
                          {responses.businessName}
                        </li>
                      )}
                      {responses.businessType && (
                        <li>
                          <span className="text-muted">Type: </span>
                          {getBusinessTypeLabel(responses.businessType)}
                        </li>
                      )}
                      {responses.aov && (
                        <li>
                          <span className="text-muted">AOV: </span>₹
                          {Number(responses.aov).toLocaleString()}
                        </li>
                      )}
                      {responses.grossMargin && (
                        <li>
                          <span className="text-muted">Margin: </span>
                          {responses.grossMargin}%
                        </li>
                      )}
                      {responses.cac && (
                        <li>
                          <span className="text-muted">CAC: </span>₹
                          {Number(responses.cac).toLocaleString()}
                        </li>
                      )}
                    </ul>
                  </Card>
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
