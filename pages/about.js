import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CircleDollarSign,
  Compass,
  Gauge,
  Lightbulb,
  LineChart,
  RefreshCw,
  Search,
  Target,
  Users,
} from "lucide-react";
import Nav from "../components/layout/Nav";
import Footer from "../components/layout/Footer";
import Card from "../components/ui/Card";

const founderTimeline = [
  {
    year: "01",
    title: "Founders were growing without clarity",
    description:
      "Across early-stage businesses, the same pattern appeared: revenue moved, spend increased, but the numbers did not explain what was truly driving profit.",
  },
  {
    year: "02",
    title: "Too many decisions were based on intuition",
    description:
      "Marketing budgets, retention bets, and product moves were often made without a simple way to connect growth with business health.",
  },
  {
    year: "03",
    title: "Patterns repeated across businesses",
    description:
      "The issues were not random. Founders consistently struggled with acquisition cost, repeat behavior, profitability, and clarity in core metrics.",
  },
  {
    year: "04",
    title: "PULSE became the structured answer",
    description:
      "Metis Intelligence was built around a framework that turns scattered business data into a clear diagnostic of what is working, what is leaking, and what to do next.",
  },
];

const founderProblems = [
  {
    title: "Growing revenue but not profit",
    description:
      "Sales can rise while contribution margin and payback quietly deteriorate.",
    icon: CircleDollarSign,
  },
  {
    title: "High marketing spend, unclear ROI",
    description:
      "Teams keep spending, but cannot confidently explain which channels are actually creating value.",
    icon: BarChart3,
  },
  {
    title: "Low repeat customers",
    description:
      "Acquisition may be working, but weak retention prevents the business from compounding.",
    icon: RefreshCw,
  },
  {
    title: "Lack of clarity in business metrics",
    description:
      "Founders often have data, but not a structured way to interpret what it means.",
    icon: Search,
  },
];

const pulseAreas = [
  {
    letter: "P",
    title: "Performance",
    description: "Revenue, margin, unit economics, and customer profitability.",
    icon: CircleDollarSign,
    color: "#0d6efd",
  },
  {
    letter: "U",
    title: "User Acquisition",
    description: "CAC, channel mix, conversion quality, and acquisition efficiency.",
    icon: Users,
    color: "#198754",
  },
  {
    letter: "L",
    title: "Lifecycle",
    description: "Retention, repeat purchase behavior, churn, and lifetime value.",
    icon: RefreshCw,
    color: "#0dcaf0",
  },
  {
    letter: "S",
    title: "Strategy",
    description: "How spend, pricing, and growth priorities are aligned.",
    icon: Target,
    color: "#ffc107",
  },
  {
    letter: "E",
    title: "Experiments",
    description: "The tests and learning loops that drive systematic improvement.",
    icon: Lightbulb,
    color: "#dc3545",
  },
];

const steps = [
  {
    number: "01",
    title: "Answer a few questions",
    description:
      "Founders share a simple set of inputs about revenue, spend, customer behavior, and growth.",
    icon: Compass,
  },
  {
    number: "02",
    title: "Analyze your business",
    description:
      "Metis Intelligence maps those inputs across the PULSE framework to identify where growth breaks.",
    icon: Search,
  },
  {
    number: "03",
    title: "Get your health score",
    description:
      "The diagnostic turns scattered numbers into a clearer view of business health.",
    icon: Gauge,
  },
  {
    number: "04",
    title: "Identify growth opportunities",
    description:
      "Founders get focused insight into what needs attention first and where leverage exists.",
    icon: LineChart,
  },
];

const differentiators = [
  {
    title: "Simple",
    description:
      "No dashboard overload. The goal is clarity, not complexity.",
    icon: Search,
  },
  {
    title: "Structured",
    description:
      "The PULSE framework gives every business a consistent way to diagnose growth.",
    icon: Target,
  },
  {
    title: "Actionable",
    description:
      "Insights are designed to support real decisions around spend, retention, and profitability.",
    icon: Lightbulb,
  },
  {
    title: "Founder-first",
    description:
      "Built for real businesses that need direction, not enterprise analytics overhead.",
    icon: Users,
  },
];

const audiences = [
  "D2C founders",
  "Small business owners",
  "First-time entrepreneurs",
  "Women-led startups",
];

export default function About() {
  return (
    <div className="min-vh-100 bg-white">
      <Nav />
      <main>
        <section
          className="py-5"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,150,199,0.08) 0%, rgba(255,255,255,1) 72%)",
          }}
        >
          <div className="container py-4">
            <div className="row align-items-center g-5">
              <div className="col-12 col-lg-7">
                <span className="badge rounded-pill text-bg-light border px-3 py-2 mb-3">
                  About Metis Intelligence
                </span>
                <h1 className="display-4 fw-bold text-dark mb-4">
                  See What&apos;s Actually Happening Inside Your Business
                </h1>
                <p className="lead text-muted mb-4">
                  A founder-focused approach to understanding profitability,
                  growth, and customer behavior through simple analytics.
                </p>
                <Link href="/diagnostic" className="btn btn-custom-primary btn-lg">
                  Start Business Diagnostic <ArrowRight size={18} className="ms-2" />
                </Link>
              </div>
              <div className="col-12 col-lg-5">
                <Card
                  className="border-0 shadow-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(13,110,253,0.08) 0%, rgba(255,255,255,1) 100%)",
                  }}
                >
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "58px",
                        height: "58px",
                        backgroundColor: "rgba(0,150,199,0.12)",
                      }}
                    >
                      <Gauge className="text-primary" size={28} />
                    </div>
                    <div>
                      <div className="fw-bold text-dark">Founder-focused analytics</div>
                      <div className="text-muted small">
                        Clarity on profit, growth, and customer economics
                      </div>
                    </div>
                  </div>
                  <div className="row g-3">
                    <div className="col-6">
                      <div className="bg-white rounded-3 p-3 h-100 border">
                        <div className="fw-semibold text-dark mb-1">Profitability</div>
                        <div className="small text-muted">
                          Understand what revenue actually produces.
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="bg-white rounded-3 p-3 h-100 border">
                        <div className="fw-semibold text-dark mb-1">Growth</div>
                        <div className="small text-muted">
                          Spot the systems that slow scale.
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="bg-white rounded-3 p-3 h-100 border">
                        <div className="fw-semibold text-dark mb-1">Behavior</div>
                        <div className="small text-muted">
                          See why customers stay, churn, or return.
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="bg-white rounded-3 p-3 h-100 border">
                        <div className="fw-semibold text-dark mb-1">Action</div>
                        <div className="small text-muted">
                          Turn diagnosis into focused next steps.
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-5">
          <div className="container">
            <div className="row g-5 align-items-start">
              <div className="col-12 col-lg-6">
                <span className="text-uppercase small fw-bold text-primary">
                  Why I Started Metis Intelligence
                </span>
                <h2 className="display-6 fw-bold text-dark mt-2 mb-4">
                  Founders needed a clearer way to see the business behind the numbers
                </h2>
                <p className="text-muted fs-5">
                  Many founders are operating with fragmented information.
                  Revenue may be visible, spend may be visible, and customer
                  counts may be visible, but the story connecting them often is not.
                </p>
                <p className="text-muted fs-5 mb-0">
                  Metis Intelligence was built from the observation that the
                  same growth problems repeat across businesses. The answer was
                  not more dashboards. It was a structured framework that helps
                  founders understand profitability, customer behavior, and
                  growth with greater confidence.
                </p>
              </div>
              <div className="col-12 col-lg-6">
                <div className="d-flex flex-column gap-3">
                  {founderTimeline.map((item) => (
                    <Card key={item.year} className="border-0 shadow-sm">
                      <div className="d-flex gap-3">
                        <div
                          className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 fw-bold text-primary"
                          style={{
                            width: "48px",
                            height: "48px",
                            backgroundColor: "rgba(13,110,253,0.10)",
                          }}
                        >
                          {item.year}
                        </div>
                        <div>
                          <h3 className="h5 fw-bold text-dark mb-2">{item.title}</h3>
                          <p className="text-muted mb-0">{item.description}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-5 bg-light border-top border-bottom">
          <div className="container">
            <div className="text-center mb-5">
              <span className="text-uppercase small fw-bold text-primary">
                Why Most Founders Struggle
              </span>
              <h2 className="display-6 fw-bold text-dark mt-2 mb-3">
                Growth often looks healthy long before the business actually is
              </h2>
              <p className="lead text-muted mx-auto" style={{ maxWidth: "780px" }}>
                The challenge is rarely a lack of effort. It is a lack of clear,
                connected visibility across the parts of the business that drive
                sustainable growth.
              </p>
            </div>
            <div className="row g-4">
              {founderProblems.map((problem) => (
                <div key={problem.title} className="col-12 col-md-6 col-xl-3">
                  <Card className="border-0 shadow-sm h-100 card-hover">
                    <problem.icon className="text-primary mb-3" size={28} />
                    <h3 className="h5 fw-bold text-dark mb-3">{problem.title}</h3>
                    <p className="text-muted mb-0">{problem.description}</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-5">
          <div className="container">
            <div className="row g-4 align-items-center">
              <div className="col-12 col-lg-6">
                <span className="text-uppercase small fw-bold text-primary">
                  A Structured Way to Understand Your Business
                </span>
                <h2 className="display-6 fw-bold text-dark mt-2 mb-4">
                  Metis Intelligence simplifies analytics into a focused diagnostic
                </h2>
                <p className="text-muted fs-5">
                  Instead of expecting founders to decode raw dashboards, Metis
                  Intelligence organizes business analysis around the few systems
                  that actually determine growth and profitability.
                </p>
                <p className="text-muted fs-5 mb-0">
                  The result is a simpler path from business data to decision
                  quality: what is strong, what is leaking, and what should be
                  prioritized next.
                </p>
              </div>
              <div className="col-12 col-lg-6">
                <Card
                  className="border-0 shadow-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(25,135,84,0.08) 0%, rgba(255,255,255,1) 100%)",
                  }}
                >
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
                      <div className="fw-bold text-dark">What the diagnostic does</div>
                      <div className="text-muted small">
                        Turns scattered business inputs into decision-ready clarity
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-column gap-3">
                    <div className="bg-white border rounded-3 p-3">
                      <div className="fw-semibold text-dark">Find the real problem</div>
                      <div className="text-muted small">
                        Move beyond surface metrics to the economics underneath them.
                      </div>
                    </div>
                    <div className="bg-white border rounded-3 p-3">
                      <div className="fw-semibold text-dark">Create a business health view</div>
                      <div className="text-muted small">
                        See performance, acquisition, lifecycle, strategy, and experimentation together.
                      </div>
                    </div>
                    <div className="bg-white border rounded-3 p-3">
                      <div className="fw-semibold text-dark">Focus on next actions</div>
                      <div className="text-muted small">
                        Prioritize the growth opportunities that matter most right now.
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-5 bg-light">
          <div className="container">
            <div className="text-center mb-5">
              <span className="text-uppercase small fw-bold text-primary">
                PULSE Framework
              </span>
              <h2 className="display-6 fw-bold text-dark mt-2 mb-3">
                Used to diagnose growth across 5 core business systems
              </h2>
            </div>
            <div className="row g-3 align-items-stretch justify-content-center">
              {pulseAreas.map((area) => (
                <div key={area.letter} className="col-12 col-md-6 col-xl">
                  <Card className="border-0 shadow-sm h-100 text-center">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                      style={{
                        width: "64px",
                        height: "64px",
                        backgroundColor: `${area.color}18`,
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
                    <p className="text-muted mb-0">{area.description}</p>
                  </Card>
                </div>
              ))}
            </div>
            <div className="text-center mt-4 text-muted fw-semibold">
              P -&gt; U -&gt; L -&gt; S -&gt; E
            </div>
          </div>
        </section>

        <section className="py-5">
          <div className="container">
            <div className="text-center mb-5">
              <span className="text-uppercase small fw-bold text-primary">
                How It Works
              </span>
              <h2 className="display-6 fw-bold text-dark mt-2 mb-3">
                A simple process for founders who need clarity quickly
              </h2>
            </div>
            <div className="row g-4">
              {steps.map((step) => (
                <div key={step.number} className="col-12 col-md-6 col-xl-3">
                  <Card className="border-0 shadow-sm h-100">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <step.icon className="text-primary" size={24} />
                      <span className="small fw-bold text-muted">{step.number}</span>
                    </div>
                    <h3 className="h5 fw-bold text-dark mb-3">{step.title}</h3>
                    <p className="text-muted mb-0">{step.description}</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-5 bg-light border-top border-bottom">
          <div className="container">
            <div className="text-center mb-5">
              <span className="text-uppercase small fw-bold text-primary">
                Why Metis Intelligence
              </span>
              <h2 className="display-6 fw-bold text-dark mt-2 mb-3">
                Analytics designed for decision-making, not dashboard fatigue
              </h2>
            </div>
            <div className="row g-4">
              {differentiators.map((item) => (
                <div key={item.title} className="col-12 col-md-6 col-xl-3">
                  <Card className="border-0 shadow-sm h-100 card-hover">
                    <item.icon className="text-primary mb-3" size={28} />
                    <h3 className="h5 fw-bold text-dark mb-3">{item.title}</h3>
                    <p className="text-muted mb-0">{item.description}</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-5">
          <div className="container">
            <div className="row g-4 align-items-stretch">
              <div className="col-12 col-lg-7">
                <Card
                  className="border-0 shadow-sm h-100"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(0,150,199,0.06) 0%, rgba(255,255,255,1) 100%)",
                  }}
                >
                  <span className="text-uppercase small fw-bold text-primary">
                    Built for Founders Like You
                  </span>
                  <h2 className="display-6 fw-bold text-dark mt-2 mb-4">
                    Practical business clarity for teams building in the real world
                  </h2>
                  <div className="row g-3">
                    {audiences.map((audience) => (
                      <div key={audience} className="col-12 col-sm-6">
                        <div className="bg-white border rounded-3 p-3 h-100">
                          <div className="fw-semibold text-dark">{audience}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
              <div className="col-12 col-lg-5">
                <Card className="border-0 shadow-sm h-100">
                  <span className="text-uppercase small fw-bold text-primary">
                    Our Vision
                  </span>
                  <h2 className="display-6 fw-bold text-dark mt-2 mb-4">
                    Make analytics simple, accessible, and actionable
                  </h2>
                  <p className="text-muted fs-5 mb-0">
                    To make business analytics simple, accessible, and
                    actionable for every founder.
                  </p>
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
                  Understand Your Business Today
                </h2>
                <p className="lead text-muted mb-4">
                  Start the diagnostic and get a clearer view of profitability,
                  growth, and customer behavior.
                </p>
                <Link href="/diagnostic" className="btn btn-custom-primary btn-lg">
                  Start Business Diagnostic <ArrowRight size={18} className="ms-2" />
                </Link>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
