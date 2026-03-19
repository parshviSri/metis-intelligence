import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Beaker,
  CircleDollarSign,
  Gauge,
  LineChart,
  RefreshCw,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import Nav from "../components/layout/Nav";
import Footer from "../components/layout/Footer";
import Card from "../components/ui/Card";

const frameworkAreas = [
  {
    letter: "P",
    title: "Performance",
    subtitle: "Financial health and business model strength",
    icon: CircleDollarSign,
    color: "#0d6efd",
    metrics: [
      "Revenue growth",
      "Gross margin",
      "Contribution margin",
      "Unit economics",
      "Customer profitability",
    ],
    purpose: "Understand whether your business model is actually profitable.",
  },
  {
    letter: "U",
    title: "User Acquisition",
    subtitle: "How customers discover and enter your business",
    icon: Users,
    color: "#198754",
    metrics: [
      "Customer acquisition cost (CAC)",
      "Traffic sources",
      "Conversion rate",
      "Marketing channels",
      "Channel ROI",
    ],
    purpose:
      "Identify which acquisition channels drive sustainable growth.",
  },
  {
    letter: "L",
    title: "Lifecycle",
    subtitle: "What happens after the first purchase",
    icon: RefreshCw,
    color: "#0dcaf0",
    metrics: [
      "Repeat purchase rate",
      "Customer lifetime value (LTV)",
      "Retention rate",
      "Customer churn",
      "Purchase frequency",
    ],
    purpose:
      "Determine whether customers return and create long-term value.",
  },
  {
    letter: "S",
    title: "Strategy",
    subtitle: "How spend and resources are allocated for growth",
    icon: Target,
    color: "#ffc107",
    metrics: [
      "Marketing efficiency",
      "Spend allocation",
      "Growth channels",
      "Pricing strategy",
    ],
    purpose:
      "Ensure marketing and operational spending produces strong returns.",
  },
  {
    letter: "E",
    title: "Experiments",
    subtitle: "Continuous improvement through structured testing",
    icon: Beaker,
    color: "#dc3545",
    metrics: [
      "A/B testing",
      "Growth experiments",
      "Conversion optimization",
      "Product improvements",
    ],
    purpose:
      "Enable systematic growth through data-driven experimentation.",
  },
];

const diagnosticOutputs = [
  "A business health score",
  "Key performance insights",
  "Growth opportunities",
  "Strategic recommendations",
];

const founderChallenges = [
  "profitability",
  "customer acquisition cost",
  "retention",
  "marketing efficiency",
];

const Framework = () => {
  return (
    <div className="min-vh-100 bg-white">
      <Nav />
      <main>
        <section
          className="py-5"
          style={{
            background:
              "linear-gradient(180deg, rgba(13,110,253,0.06) 0%, rgba(255,255,255,1) 72%)",
          }}
        >
          <div className="container py-4">
            <div className="row align-items-center g-5">
              <div className="col-12 col-lg-7">
                <span className="badge rounded-pill text-bg-light border text-primary mb-3 px-3 py-2">
                  The PULSE Framework
                </span>
                <h1 className="display-4 fw-bold text-dark mb-4">
                  A clear system for diagnosing business growth and
                  profitability
                </h1>
                <p className="lead text-muted mb-4">
                  The PULSE Framework is a structured approach used by Metis
                  Intelligence to diagnose business growth and profitability.
                </p>
                <p className="text-muted fs-5 mb-4">
                  It helps founders understand five critical areas of their
                  business: revenue and profitability, customer acquisition,
                  retention and lifecycle, marketing efficiency, and growth
                  experimentation. Together, these five systems determine
                  whether a business grows sustainably.
                </p>
                <div className="d-flex flex-column flex-sm-row gap-3">
                  <Link href="/diagnostic" className="btn btn-custom-primary">
                    Start Business Diagnostic
                  </Link>
                  <Link
                    href="/case-studies"
                    className="btn btn-outline-dark px-4 py-3"
                  >
                    See Example Outcomes
                  </Link>
                </div>
              </div>
              <div className="col-12 col-lg-5">
                <Card className="border-0 shadow-lg h-100">
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "56px",
                        height: "56px",
                        backgroundColor: "rgba(13,110,253,0.12)",
                      }}
                    >
                      <Gauge className="text-primary" size={28} />
                    </div>
                    <div>
                      <div className="fw-bold text-dark">What PULSE does</div>
                      <div className="text-muted small">
                        Maps business health across five connected systems
                      </div>
                    </div>
                  </div>
                  <div className="row g-3">
                    <div className="col-6">
                      <div className="bg-light rounded-3 p-3 h-100">
                        <div className="fw-semibold text-dark mb-1">
                          Diagnose
                        </div>
                        <div className="small text-muted">
                          Identify where growth is breaking down
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="bg-light rounded-3 p-3 h-100">
                        <div className="fw-semibold text-dark mb-1">
                          Prioritize
                        </div>
                        <div className="small text-muted">
                          Focus on the highest-leverage opportunities
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="bg-light rounded-3 p-3 h-100">
                        <div className="fw-semibold text-dark mb-1">Measure</div>
                        <div className="small text-muted">
                          Track economics, retention, and efficiency
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="bg-light rounded-3 p-3 h-100">
                        <div className="fw-semibold text-dark mb-1">Improve</div>
                        <div className="small text-muted">
                          Turn insight into systematic experimentation
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-5 bg-light border-top border-bottom">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="display-6 fw-bold text-dark mb-3">
                The five systems behind sustainable growth
              </h2>
              <p className="lead text-muted mx-auto" style={{ maxWidth: "820px" }}>
                Every successful business must understand these five systems.
                Weakness in any one of them can slow growth or reduce
                profitability.
              </p>
            </div>
            <div className="row g-3 align-items-stretch justify-content-center">
              {frameworkAreas.map((area, index) => (
                <div key={area.letter} className="col-12 col-md-6 col-xl">
                  <div className="d-flex align-items-center h-100">
                    <Card className="border-0 shadow-sm h-100 w-100">
                      <div className="text-center">
                        <div
                          className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                          style={{
                            width: "64px",
                            height: "64px",
                            backgroundColor: `${area.color}20`,
                          }}
                        >
                          <area.icon size={28} style={{ color: area.color }} />
                        </div>
                        <div
                          className="fw-bold small text-uppercase mb-1"
                          style={{ color: area.color, letterSpacing: "0.08em" }}
                        >
                          {area.letter}
                        </div>
                        <h3 className="h5 fw-bold text-dark">{area.title}</h3>
                        <p className="text-muted small mb-0">{area.subtitle}</p>
                      </div>
                    </Card>
                    {index < frameworkAreas.length - 1 && (
                      <div className="d-none d-xl-flex justify-content-center px-2">
                        <ArrowRight className="text-muted" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-5">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="display-6 fw-bold text-dark mb-3">
                A closer look at each PULSE component
              </h2>
              <p className="lead text-muted mx-auto" style={{ maxWidth: "860px" }}>
                PULSE gives founders a practical way to inspect where growth is
                strong, where value leaks, and where sharper decisions can
                improve profit.
              </p>
            </div>
            <div className="row g-4">
              {frameworkAreas.map((area) => (
                <div key={area.letter} className="col-12 col-lg-6">
                  <Card className="border-0 shadow-sm h-100 card-hover">
                    <div className="d-flex align-items-start gap-3 mb-4">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                        style={{
                          width: "58px",
                          height: "58px",
                          backgroundColor: `${area.color}20`,
                        }}
                      >
                        <area.icon size={26} style={{ color: area.color }} />
                      </div>
                      <div>
                        <div
                          className="fw-bold small text-uppercase mb-1"
                          style={{ color: area.color, letterSpacing: "0.08em" }}
                        >
                          {area.letter} - {area.title}
                        </div>
                        <p className="text-muted mb-0">{area.subtitle}</p>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="fw-semibold text-dark mb-2">
                        Key metrics analyzed
                      </div>
                      <ul className="text-muted mb-0 ps-3">
                        {area.metrics.map((metric) => (
                          <li key={metric} className="mb-1">
                            {metric}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div
                      className="rounded-3 p-3 mt-4"
                      style={{ backgroundColor: `${area.color}12` }}
                    >
                      <div className="fw-semibold text-dark mb-1">Purpose</div>
                      <div className="text-muted">{area.purpose}</div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-5 bg-light">
          <div className="container">
            <div className="row g-4 align-items-center">
              <div className="col-12 col-lg-6">
                <h2 className="display-6 fw-bold text-dark mb-3">
                  How the PULSE diagnostic works
                </h2>
                <p className="lead text-muted mb-4">
                  When founders complete the Metis Intelligence diagnostic,
                  their business is evaluated across all five PULSE systems.
                </p>
                <div className="row g-3">
                  {diagnosticOutputs.map((output) => (
                    <div key={output} className="col-12 col-sm-6">
                      <div className="bg-white rounded-3 shadow-sm border p-3 h-100">
                        <div className="d-flex align-items-start gap-2">
                          <Activity
                            className="text-primary flex-shrink-0 mt-1"
                            size={18}
                          />
                          <div className="text-dark fw-semibold">{output}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <Card className="border-0 shadow-lg">
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "56px",
                        height: "56px",
                        backgroundColor: "rgba(25,135,84,0.12)",
                      }}
                    >
                      <LineChart className="text-success" size={28} />
                    </div>
                    <div>
                      <div className="fw-bold text-dark">Framework diagram</div>
                      <div className="text-muted small">
                        A simple view of how business health is diagnosed
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-column gap-3">
                    <div className="bg-light rounded-3 p-3 text-center fw-bold text-dark">
                      Business Health
                    </div>
                    {frameworkAreas.map((area) => (
                      <div key={area.letter} className="text-center">
                        <div className="text-muted mb-2">↓</div>
                        <div
                          className="rounded-3 p-3 fw-semibold"
                          style={{
                            backgroundColor: `${area.color}15`,
                            color: "#212529",
                          }}
                        >
                          {area.title}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-5">
          <div className="container">
            <div className="row g-4">
              <div className="col-12 col-lg-7">
                <h2 className="display-6 fw-bold text-dark mb-3">
                  Why founders struggle without analytics
                </h2>
                <p className="lead text-muted mb-4">
                  Many founders focus only on sales or marketing. But
                  sustainable growth requires understanding the complete picture
                  of the business.
                </p>
                <div className="row g-3">
                  {founderChallenges.map((item) => (
                    <div key={item} className="col-12 col-sm-6">
                      <div className="border rounded-3 p-3 h-100 bg-white">
                        <div className="fw-semibold text-dark text-capitalize">
                          {item}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-muted fs-5 mt-4 mb-0">
                  The PULSE Framework helps founders move from isolated metrics
                  to a connected diagnosis of growth, efficiency, and profit.
                </p>
              </div>
              <div className="col-12 col-lg-5">
                <Card className="border-0 shadow-sm h-100">
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "56px",
                        height: "56px",
                        backgroundColor: "rgba(220,53,69,0.12)",
                      }}
                    >
                      <TrendingUp className="text-danger" size={28} />
                    </div>
                    <div>
                      <div className="fw-bold text-dark">
                        Example diagnostic insight
                      </div>
                      <div className="text-muted small">
                        What a founder can learn from the framework
                      </div>
                    </div>
                  </div>
                  <p className="text-muted">
                    A D2C brand had strong sales but low profitability. The
                    PULSE diagnostic revealed high customer acquisition cost and
                    low repeat purchase rate.
                  </p>
                  <div className="rounded-3 bg-light p-3 mb-3">
                    <div className="fw-semibold text-dark mb-2">
                      What changed
                    </div>
                    <ul className="text-muted mb-0 ps-3">
                      <li>Acquisition spend was redirected toward stronger channels.</li>
                      <li>Retention initiatives improved repeat purchase behavior.</li>
                    </ul>
                  </div>
                  <div
                    className="rounded-3 p-3"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(25,135,84,0.14) 0%, rgba(13,110,253,0.08) 100%)",
                    }}
                  >
                    <div className="small text-uppercase fw-bold text-success mb-1">
                      Outcome
                    </div>
                    <div className="h4 fw-bold text-dark mb-1">
                      Profit increased by 32%
                    </div>
                    <div className="text-muted">
                      after the business focused on retention instead of chasing
                      top-line growth alone.
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-5 border-top">
          <div className="container">
            <Card
              className="border-0 shadow-lg text-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(13,110,253,0.08) 0%, rgba(255,255,255,1) 60%)",
              }}
            >
              <div className="mx-auto" style={{ maxWidth: "760px" }}>
                <h2 className="display-6 fw-bold text-dark mb-3">
                  See your business through the PULSE Framework
                </h2>
                <p className="lead text-muted mb-4">
                  Answer a few questions and discover your biggest growth
                  opportunity.
                </p>
                <Link href="/diagnostic" className="btn btn-custom-primary btn-lg">
                  Start Business Diagnostic
                </Link>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Framework;
