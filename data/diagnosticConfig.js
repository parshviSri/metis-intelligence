import {
  BarChart3,
  CircleDollarSign,
  FlaskConical,
  RefreshCw,
  Users,
} from "lucide-react";

export const basicInfoFields = [
  {
    name: "businessName",
    label: "Business Name",
    type: "text",
    required: true,
    placeholder: "e.g. Bloom Skincare",
  },
  {
    name: "businessType",
    label: "Business Type",
    type: "select",
    required: true,
    options: [
      { value: "d2c", label: "D2C / Ecommerce" },
      { value: "saas", label: "SaaS / Product" },
      { value: "services", label: "Services Business" },
      { value: "agency", label: "Agency / Consulting" },
      { value: "other", label: "Other" },
    ],
  },
  {
    name: "products",
    label: "Products",
    type: "text",
    required: true,
    placeholder: "What do you sell?",
  },
  {
    name: "aov",
    label: "Average Order Value (AOV)",
    type: "number",
    required: true,
    placeholder: "e.g. 2500",
  },
];

export const coreMetricFields = [
  {
    name: "grossMargin",
    label: "Gross Margin (%)",
    type: "number",
    required: true,
    placeholder: "e.g. 55",
  },
  {
    name: "monthlyMarketingSpend",
    label: "Monthly Marketing Spend",
    type: "number",
    required: true,
    placeholder: "e.g. 150000",
  },
  {
    name: "cac",
    label: "Customer Acquisition Cost (CAC)",
    type: "number",
    required: true,
    placeholder: "e.g. 900",
  },
  {
    name: "repeatPurchaseRate",
    label: "Repeat Purchase Rate (%)",
    type: "number",
    required: true,
    placeholder: "e.g. 28",
  },
];

export const focusAreas = [
  {
    key: "profitability",
    title: "Profitability",
    description: "Understand margin quality, contribution, and revenue mix.",
    icon: CircleDollarSign,
    color: "#0d6efd",
    fields: [
      {
        name: "contributionMargin",
        label: "Contribution Margin (%)",
        type: "number",
        placeholder: "e.g. 24",
      },
      {
        name: "productProfitability",
        label: "Product Profitability",
        type: "textarea",
        placeholder: "Which products are most or least profitable?",
      },
      {
        name: "revenueBreakdown",
        label: "Revenue Breakdown",
        type: "textarea",
        placeholder: "Share your revenue split by product, category, or channel.",
      },
    ],
  },
  {
    key: "acquisition",
    title: "Customer Acquisition",
    description: "Inspect how channels, conversion, and CAC vary by source.",
    icon: Users,
    color: "#198754",
    fields: [
      {
        name: "channels",
        label: "Channels",
        type: "textarea",
        placeholder: "Which channels currently drive acquisition?",
      },
      {
        name: "conversionRate",
        label: "Conversion Rate (%)",
        type: "number",
        placeholder: "e.g. 2.8",
      },
      {
        name: "cacByChannel",
        label: "CAC by Channel",
        type: "textarea",
        placeholder: "Share CAC by Meta, Google, referrals, marketplaces, etc.",
      },
    ],
  },
  {
    key: "retention",
    title: "Retention & Lifecycle",
    description: "Explore repeat behavior, LTV, and customer lifecycle health.",
    icon: RefreshCw,
    color: "#0dcaf0",
    fields: [
      {
        name: "ltv",
        label: "Customer Lifetime Value (LTV)",
        type: "number",
        placeholder: "e.g. 3200",
      },
      {
        name: "timeBetweenPurchases",
        label: "Time Between Purchases",
        type: "text",
        placeholder: "e.g. 45 days",
      },
      {
        name: "cohortTracking",
        label: "Cohort Tracking",
        type: "textarea",
        placeholder: "How do you currently track customer retention over time?",
      },
    ],
  },
  {
    key: "growth",
    title: "Growth & Experiments",
    description: "Review testing, funnel health, and where users drop off.",
    icon: FlaskConical,
    color: "#dc3545",
    fields: [
      {
        name: "experiments",
        label: "Experiments",
        type: "textarea",
        placeholder: "What experiments or tests are you currently running?",
      },
      {
        name: "funnelMetrics",
        label: "Funnel Metrics",
        type: "textarea",
        placeholder: "What top-of-funnel and bottom-of-funnel metrics do you track?",
      },
      {
        name: "dropOffRates",
        label: "Drop-off Rates",
        type: "textarea",
        placeholder: "Where do users or customers drop off most often?",
      },
    ],
  },
];

/** Fields for the new Step 5 – Challenges (collects biggest_challenge for the API). */
export const challengesFields = [
  {
    name: "biggestChallenge",
    label: "What is your biggest business challenge right now?",
    type: "textarea",
    required: true,
    placeholder:
      "e.g. Our CAC has risen 40% in the last quarter and we can't find a sustainable channel to scale without margin erosion.",
  },
];

export const wizardStepLabels = [
  "Basic Business Info",
  "Core Metrics",
  "Focus Selection",
  "Dynamic Questions",
  "Smart Prompts",
  "Challenges",
  "Results",
];

export const resultsCategories = [
  {
    key: "profitability",
    label: "Profitability",
    icon: CircleDollarSign,
  },
  {
    key: "acquisition",
    label: "Customer Acquisition",
    icon: Users,
  },
  {
    key: "retention",
    label: "Retention & Lifecycle",
    icon: RefreshCw,
  },
  {
    key: "growth",
    label: "Growth & Experiments",
    icon: BarChart3,
  },
];
