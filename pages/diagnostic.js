import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import Nav from "../components/layout/Nav";
import Footer from "../components/layout/Footer";
import Card from "../components/ui/Card";
import ProgressBar from "../components/diagnostic/ProgressBar";
import DiagnosticResults from "../components/diagnostic/DiagnosticResults";
import {
  basicInfoFields,
  coreMetricFields,
  focusAreas,
  resultsCategories,
  wizardStepLabels,
} from "../data/diagnosticConfig";

const initialResponses = {
  businessType: "",
  products: "",
  aov: "",
  grossMargin: "",
  monthlyMarketingSpend: "",
  cac: "",
  repeatPurchaseRate: "",
  focusAreas: [],
  contributionMargin: "",
  productProfitability: "",
  revenueBreakdown: "",
  channels: "",
  conversionRate: "",
  cacByChannel: "",
  ltv: "",
  timeBetweenPurchases: "",
  cohortTracking: "",
  experiments: "",
  funnelMetrics: "",
  dropOffRates: "",
};

const numericValue = (value) => {
  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : 0;
};

const clampScore = (value) => Math.max(0, Math.min(100, Math.round(value)));

const average = (values) => {
  if (!values.length) {
    return 0;
  }

  return values.reduce((sum, value) => sum + value, 0) / values.length;
};

const renderField = (field, responses, handleChange) => {
  if (field.type === "select") {
    return (
      <select
        id={field.name}
        name={field.name}
        className="form-select form-select-lg"
        value={responses[field.name]}
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
        value={responses[field.name]}
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
      value={responses[field.name]}
      onChange={handleChange}
      placeholder={field.placeholder}
    />
  );
};

const getBusinessTypeLabel = (value) => {
  return (
    basicInfoFields
      .find((field) => field.name === "businessType")
      ?.options.find((option) => option.value === value)?.label || value
  );
};

const calculateSectionScores = (responses) => {
  const aov = numericValue(responses.aov);
  const grossMargin = numericValue(responses.grossMargin);
  const cac = numericValue(responses.cac);
  const repeatPurchaseRate = numericValue(responses.repeatPurchaseRate);
  const contributionMargin = numericValue(responses.contributionMargin);
  const conversionRate = numericValue(responses.conversionRate);
  const ltv = numericValue(responses.ltv);
  const experimentsPresent = responses.experiments.trim().length > 0 ? 1 : 0;
  const funnelPresent = responses.funnelMetrics.trim().length > 0 ? 1 : 0;
  const dropOffPresent = responses.dropOffRates.trim().length > 0 ? 1 : 0;

  const profitability = clampScore(
    grossMargin * 0.7 +
      (aov > 0 && cac > 0 ? Math.max(0, ((aov - cac) / aov) * 45) : 12) +
      contributionMargin * 0.35,
  );

  const acquisition = clampScore(
    (aov > 0 && cac > 0 ? Math.max(0, ((aov - cac) / aov) * 55) : 15) +
      conversionRate * 12 +
      (responses.channels.trim() ? 18 : 0) +
      (responses.cacByChannel.trim() ? 15 : 0),
  );

  const retention = clampScore(
    repeatPurchaseRate * 1.6 +
      (ltv > 0 && cac > 0 ? Math.min(35, (ltv / cac) * 10) : 10) +
      (responses.cohortTracking.trim() ? 15 : 0),
  );

  const growth = clampScore(
    experimentsPresent * 30 +
      funnelPresent * 30 +
      dropOffPresent * 25 +
      (conversionRate > 0 ? Math.min(15, conversionRate * 3) : 0),
  );

  return {
    profitability,
    acquisition,
    retention,
    growth,
  };
};

const buildInsights = (responses, sectionScores) => {
  const insights = [];
  const aov = numericValue(responses.aov);
  const grossMargin = numericValue(responses.grossMargin);
  const cac = numericValue(responses.cac);
  const repeatPurchaseRate = numericValue(responses.repeatPurchaseRate);
  const ltv = numericValue(responses.ltv);
  const selectedFocusAreas = responses.focusAreas;

  if (grossMargin > 0 && grossMargin < 45) {
    insights.push({
      title: "Margin pressure may be limiting growth quality",
      description:
        "Your gross margin appears relatively tight, which means inefficient spend or discounting can reduce profitability quickly.",
    });
  }

  if (aov > 0 && cac > 0 && cac >= aov * 0.5) {
    insights.push({
      title: "Acquisition cost looks heavy relative to order value",
      description:
        "If CAC is consuming too much of first-order revenue, the business may be depending on retention or upsells to recover profitability.",
    });
  }

  if (repeatPurchaseRate > 0 && repeatPurchaseRate < 30) {
    insights.push({
      title: "Retention deserves deeper attention",
      description:
        "A low repeat purchase rate suggests customer value may not be compounding. Improving lifecycle performance could unlock stronger economics.",
    });
  }

  if (
    selectedFocusAreas.includes("retention") &&
    ltv > 0 &&
    cac > 0 &&
    ltv < cac * 2
  ) {
    insights.push({
      title: "LTV may not be comfortably outrunning CAC",
      description:
        "If lifetime value remains close to acquisition cost, channel scaling becomes riskier and payback can slow down.",
    });
  }

  if (
    selectedFocusAreas.includes("growth") &&
    !responses.experiments.trim()
  ) {
    insights.push({
      title: "Growth experimentation may be underdeveloped",
      description:
        "Without clear experiments, it becomes harder to improve funnel performance systematically or learn what really drives growth.",
    });
  }

  const lowestSection = Object.entries(sectionScores).sort((a, b) => a[1] - b[1])[0];

  if (lowestSection) {
    const sectionLabel =
      resultsCategories.find((item) => item.key === lowestSection[0])?.label ||
      lowestSection[0];

    insights.push({
      title: `${sectionLabel} is the biggest current opportunity`,
      description:
        "This area scored lowest in the diagnostic, which makes it the strongest candidate for immediate analysis and action.",
    });
  }

  if (!insights.length) {
    insights.push({
      title: "Your inputs suggest a relatively balanced operating picture",
      description:
        "The next step is to dig deeper into section-level detail to confirm where the strongest growth leverage actually sits.",
    });
  }

  return insights.slice(0, 4);
};

export default function Diagnostic() {
  const [responses, setResponses] = useState(initialResponses);
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});

  const repeatPurchaseRate = numericValue(responses.repeatPurchaseRate);
  const showRetentionPrompt =
    repeatPurchaseRate > 0 &&
    repeatPurchaseRate < 30 &&
    !responses.focusAreas.includes("retention");

  const visibleSteps = useMemo(() => {
    const stepKeys = [
      "basic",
      "core",
      "focus",
      "dynamic",
      ...(showRetentionPrompt ? ["smart"] : []),
      "results",
    ];

    return stepKeys.map((key) => ({
      key,
      label:
        key === "smart"
          ? "Smart Prompts"
          : wizardStepLabels[
              ["basic", "core", "focus", "dynamic", "smart", "results"].indexOf(
                key,
              )
            ],
    }));
  }, [showRetentionPrompt]);

  const currentStepKey = visibleSteps[currentStep]?.key;
  const selectedFocusAreas = focusAreas.filter((area) =>
    responses.focusAreas.includes(area.key),
  );

  const sectionScores = useMemo(
    () => calculateSectionScores(responses),
    [responses],
  );

  const displayedSectionScores = useMemo(() => {
    const focusKeys =
      responses.focusAreas.length > 0
        ? responses.focusAreas
        : resultsCategories.map((item) => item.key);

    return resultsCategories
      .filter((item) => focusKeys.includes(item.key))
      .map((item) => ({
        ...item,
        score: sectionScores[item.key],
      }));
  }, [responses.focusAreas, sectionScores]);

  const overallScore = clampScore(
    average(displayedSectionScores.map((item) => item.score)),
  );

  const insights = useMemo(
    () => buildInsights(responses, sectionScores),
    [responses, sectionScores],
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setResponses((current) => ({
      ...current,
      [name]: value,
    }));
    setErrors((current) => ({
      ...current,
      [name]: "",
      focusAreas: "",
    }));
  };

  const toggleFocusArea = (areaKey) => {
    setResponses((current) => {
      const isSelected = current.focusAreas.includes(areaKey);

      return {
        ...current,
        focusAreas: isSelected
          ? current.focusAreas.filter((item) => item !== areaKey)
          : [...current.focusAreas, areaKey],
      };
    });
    setErrors((current) => ({
      ...current,
      focusAreas: "",
    }));
  };

  const validateStep = () => {
    const nextErrors = {};

    if (currentStepKey === "basic") {
      basicInfoFields.forEach((field) => {
        if (!responses[field.name]) {
          nextErrors[field.name] = "This field is required.";
        }
      });
    }

    if (currentStepKey === "core") {
      coreMetricFields.forEach((field) => {
        if (!responses[field.name]) {
          nextErrors[field.name] = "This field is required.";
        }
      });
    }

    if (currentStepKey === "focus" && responses.focusAreas.length === 0) {
      nextErrors.focusAreas = "Select at least one area to analyze.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStepKey !== "dynamic" && currentStepKey !== "smart") {
      if (!validateStep()) {
        return;
      }
    }

    setCurrentStep((step) => Math.min(step + 1, visibleSteps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((step) => Math.max(step - 1, 0));
  };

  const addRetentionFocus = () => {
    if (!responses.focusAreas.includes("retention")) {
      setResponses((current) => ({
        ...current,
        focusAreas: [...current.focusAreas, "retention"],
      }));
    }
    setCurrentStep(visibleSteps.findIndex((step) => step.key === "dynamic"));
  };

  return (
    <div className="min-vh-100 bg-white" id="top">
      <Nav />
      <main>
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

        <section className="py-5">
          <div className="container">
            <div className="row g-4 align-items-start">
              <div className="col-12 col-lg-8">
                <Card className="border-0 shadow-sm">
                  <ProgressBar
                    currentStep={currentStep}
                    totalSteps={visibleSteps.length}
                    labels={visibleSteps.map((step) => step.label)}
                  />

                  <div className="mt-5">
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

                    {currentStepKey === "focus" && (
                      <div>
                        <div className="mb-4">
                          <span className="text-uppercase small fw-bold text-primary">
                            Step 3
                          </span>
                          <h2 className="display-6 fw-bold text-dark mt-2 mb-3">
                            What would you like to analyze?
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
                                  className={`w-100 text-start btn p-0 border-0 bg-transparent`}
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
                                          <area.icon
                                            size={24}
                                            style={{ color: area.color }}
                                          />
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
                                retention threshold. Want to explore this
                                further?
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
                                  Continue to Results
                                </button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </div>
                    )}

                    {currentStepKey === "results" && (
                      <div>
                        <div className="mb-4">
                          <span className="text-uppercase small fw-bold text-primary">
                            Results
                          </span>
                          <h2 className="display-6 fw-bold text-dark mt-2 mb-3">
                            Your business diagnostic summary
                          </h2>
                          <p className="text-muted mb-0">
                            A directional view of overall business health and
                            the areas most worth investigating next.
                          </p>
                        </div>
                        <DiagnosticResults
                          overallScore={overallScore}
                          sectionScores={sectionScores}
                          insights={insights}
                          selectedResults={displayedSectionScores}
                        />
                      </div>
                    )}
                  </div>

                  {currentStepKey !== "results" && (
                    <div className="d-flex flex-column flex-sm-row justify-content-between gap-3 mt-5 pt-4 border-top">
                      <button
                        type="button"
                        className="btn btn-outline-dark"
                        onClick={handleBack}
                        disabled={currentStep === 0}
                      >
                        <ArrowLeft size={18} className="me-2" />
                        Back
                      </button>
                      {currentStepKey !== "smart" && (
                        <button
                          type="button"
                          className="btn btn-custom-primary"
                          onClick={handleNext}
                        >
                          {currentStep === visibleSteps.length - 2
                            ? "See Results"
                            : "Continue"}
                          <ArrowRight size={18} className="ms-2" />
                        </button>
                      )}
                    </div>
                  )}
                </Card>
              </div>

              <div className="col-12 col-lg-4">
                <div className="d-flex flex-column gap-4">
                  <Card
                    className="border-0 shadow-sm"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(25,135,84,0.08) 0%, rgba(255,255,255,1) 100%)",
                    }}
                  >
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <Sparkles className="text-success" size={20} />
                      <h2 className="h5 fw-bold text-dark mb-0">
                        What this tool does
                      </h2>
                    </div>
                    <ul className="text-muted ps-3 mb-0">
                      <li className="mb-2">
                        Collects the core numbers behind your business model
                      </li>
                      <li className="mb-2">
                        Adapts follow-up questions to the areas you care about
                      </li>
                      <li>
                        Produces focused, founder-friendly strategic insight
                      </li>
                    </ul>
                  </Card>

                  <Card className="border-0 shadow-sm">
                    <div className="small text-uppercase fw-bold text-primary mb-2">
                      Response snapshot
                    </div>
                    <div className="d-flex flex-column gap-3">
                      <div className="rounded-3 bg-light p-3">
                        <div className="small text-muted mb-1">Business Type</div>
                        <div className="fw-semibold text-dark">
                          {responses.businessType
                            ? getBusinessTypeLabel(responses.businessType)
                            : "Not answered yet"}
                        </div>
                      </div>
                      <div className="rounded-3 bg-light p-3">
                        <div className="small text-muted mb-1">Products</div>
                        <div className="fw-semibold text-dark">
                          {responses.products || "Not answered yet"}
                        </div>
                      </div>
                      <div className="rounded-3 bg-light p-3">
                        <div className="small text-muted mb-1">
                          Selected Focus Areas
                        </div>
                        <div className="d-flex flex-wrap gap-2">
                          {responses.focusAreas.length > 0 ? (
                            selectedFocusAreas.map((area) => (
                              <span
                                key={area.key}
                                className="badge rounded-pill text-bg-light border"
                              >
                                {area.title}
                              </span>
                            ))
                          ) : (
                            <span className="text-muted small">
                              None selected yet
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="border-0 shadow-sm">
                    <div className="small text-uppercase fw-bold text-primary mb-2">
                      Need help instead?
                    </div>
                    <p className="text-muted">
                      If you would rather talk through the numbers with us, we
                      can help you interpret the right questions faster.
                    </p>
                    <Link href="/contact" className="btn btn-outline-dark">
                      Contact Metis Intelligence
                    </Link>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
