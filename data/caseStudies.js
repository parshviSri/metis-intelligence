export const caseStudies = [
  {
    slug: "d2c-brand-losing-money-despite-growing-sales",
    title: "Why This D2C Brand Is Losing Money Despite Growing Sales",
    description:
      "A deep dive into customer acquisition cost, contribution margin, and profitability.",
    category: "Profitability",
    problem:
      "Is the company actually making money from acquiring new customers, or is revenue growth hiding an unprofitable model?",
    data: [
      "Marketing spend",
      "Customers acquired",
      "Average order value",
      "Gross margin",
      "Repeat purchase rate",
    ],
    analysis: [
      "CAC = Rs900 per new customer.",
      "Average contribution margin from first order = Rs600.",
      "Repeat purchase rate was too low to recover acquisition cost quickly.",
      "The business was scaling top-line revenue while losing money on each new customer.",
    ],
    keyInsight:
      "The business is scaling unprofitable growth due to high acquisition costs and weak payback from customer retention.",
    recommendations: [
      "Increase AOV through bundles and higher-margin product mixes.",
      "Improve retention with reorder flows and lifecycle campaigns.",
      "Reduce paid spend on the highest-CAC campaigns until economics improve.",
    ],
    chart: {
      title: "Unit economics snapshot",
      bars: [
        { label: "CAC", value: 90, tone: "danger" },
        { label: "Contribution Margin", value: 60, tone: "primary" },
        { label: "Repeat Purchase Recovery", value: 35, tone: "success" },
      ],
    },
  },
  {
    slug: "hidden-retention-problem-growing-skincare-brand",
    title: "The Hidden Retention Problem in a Growing Skincare Brand",
    description:
      "Analyzing cohort behavior to understand why customers are not returning.",
    category: "Retention",
    problem:
      "Why are new customers converting, but long-term revenue staying weaker than expected?",
    data: [
      "Customer cohorts by month",
      "First-to-second purchase rate",
      "Purchase frequency",
      "Average reorder window",
      "Retention by acquisition source",
    ],
    analysis: [
      "First-purchase demand was healthy, but second-purchase conversion dropped sharply.",
      "Later cohorts were larger, yet retention quality was declining over time.",
      "Customers acquired through discount-led campaigns were least likely to return.",
      "Revenue looked healthy in aggregate, but lifetime value was flattening.",
    ],
    keyInsight:
      "The brand did not have a top-of-funnel problem. It had a weak post-purchase journey that limited LTV growth.",
    recommendations: [
      "Improve post-purchase education and replenishment reminders.",
      "Build segmented retention flows for high-intent and one-time buyers.",
      "Track retention by cohort and channel instead of only total sales.",
    ],
    chart: {
      title: "Cohort retention trend",
      bars: [
        { label: "Month 1", value: 78, tone: "primary" },
        { label: "Month 2", value: 49, tone: "warning" },
        { label: "Month 3", value: 28, tone: "danger" },
      ],
    },
  },
  {
    slug: "where-to-spend-marketing-budget",
    title: "Where This Brand Should Actually Spend Its Marketing Budget",
    description:
      "Comparing marketing channels to identify the most profitable acquisition sources.",
    category: "Marketing",
    problem:
      "Which acquisition channels are producing profitable customers, and which are simply consuming budget?",
    data: [
      "Channel-wise marketing spend",
      "Customers acquired by channel",
      "CAC by channel",
      "Gross profit contribution",
      "Repeat purchase behavior by source",
    ],
    analysis: [
      "Paid social delivered volume, but CAC had risen faster than gross profit.",
      "Search brought fewer customers, but they converted with stronger economics.",
      "Referral traffic showed the best blended profitability despite lower scale.",
      "Budget allocation was based on volume instead of contribution quality.",
    ],
    keyInsight:
      "The most scalable channel was not the most profitable one, and the current budget mix was depressing overall marketing efficiency.",
    recommendations: [
      "Reallocate budget toward higher-margin search and referral channels.",
      "Set channel goals using contribution margin, not just acquisitions.",
      "Run structured spend experiments before scaling any one channel further.",
    ],
    chart: {
      title: "Channel efficiency comparison",
      bars: [
        { label: "Paid Social", value: 42, tone: "danger" },
        { label: "Search", value: 74, tone: "success" },
        { label: "Referral", value: 81, tone: "primary" },
      ],
    },
  },
];

export const caseStudyCategories = [
  "All",
  "Profitability",
  "Retention",
  "Marketing",
];

export function getCaseStudyBySlug(slug) {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}
