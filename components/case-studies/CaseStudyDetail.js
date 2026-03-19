import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  BarChart3,
  Database,
  Lightbulb,
  Target,
} from "lucide-react";
import Card from "../ui/Card";

const toneClasses = {
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
};

const SectionTitle = ({ icon: Icon, label }) => (
  <div className="d-flex align-items-center gap-2 mb-3">
    <Icon size={20} className="text-primary" />
    <h2 className="h4 fw-bold text-dark mb-0">{label}</h2>
  </div>
);

const CaseStudyDetail = ({ caseStudy }) => {
  return (
    <div className="container py-5">
      <div className="mb-4">
        <Link
          href="/case-studies"
          className="text-decoration-none fw-semibold"
          style={{ color: "#0096c7" }}
        >
          <ArrowLeft size={18} className="me-2" />
          Back to Case Studies
        </Link>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <span className="badge rounded-pill text-bg-light border px-3 py-2 mb-3">
            {caseStudy.category}
          </span>
          <h1 className="display-5 fw-bold text-dark mb-4">{caseStudy.title}</h1>
          <p className="lead text-muted mb-0">{caseStudy.description}</p>
        </div>
        <div className="col-12 col-lg-4">
          <Card className="border-0 shadow-sm h-100">
            <div className="fw-semibold text-dark mb-3">Case Study Focus</div>
            <div className="d-flex flex-column gap-3">
              <div className="rounded-3 bg-light p-3">
                <div className="small text-uppercase text-muted fw-bold mb-1">
                  Category
                </div>
                <div className="fw-semibold text-dark">{caseStudy.category}</div>
              </div>
              <div className="rounded-3 bg-light p-3">
                <div className="small text-uppercase text-muted fw-bold mb-1">
                  Outcome Type
                </div>
                <div className="fw-semibold text-dark">
                  Structured business diagnosis
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="row g-4 mt-2">
        <div className="col-12 col-lg-7">
          <Card className="border-0 shadow-sm mb-4">
            <SectionTitle icon={AlertCircle} label="Problem" />
            <p className="text-muted mb-0">{caseStudy.problem}</p>
          </Card>

          <Card className="border-0 shadow-sm mb-4">
            <SectionTitle icon={Database} label="Data" />
            <ul className="text-muted ps-3 mb-0">
              {caseStudy.data.map((item) => (
                <li key={item} className="mb-2">
                  {item}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="border-0 shadow-sm mb-4">
            <SectionTitle icon={BarChart3} label="Analysis" />
            <ul className="text-muted ps-3 mb-0">
              {caseStudy.analysis.map((item) => (
                <li key={item} className="mb-2">
                  {item}
                </li>
              ))}
            </ul>
          </Card>

          <Card
            className="border-0 shadow-sm mb-4"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,150,199,0.10) 0%, rgba(255,255,255,1) 100%)",
            }}
          >
            <SectionTitle icon={Lightbulb} label="Key Insight" />
            <div className="rounded-3 border-start border-4 border-primary ps-3">
              <p className="text-dark fw-semibold mb-0">{caseStudy.keyInsight}</p>
            </div>
          </Card>

          <Card className="border-0 shadow-sm">
            <SectionTitle icon={Target} label="Recommendation" />
            <ul className="text-muted ps-3 mb-0">
              {caseStudy.recommendations.map((item) => (
                <li key={item} className="mb-2">
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="col-12 col-lg-5">
          <Card className="border-0 shadow-sm h-100">
            <div className="d-flex align-items-center gap-2 mb-3">
              <BarChart3 size={20} className="text-primary" />
              <h2 className="h4 fw-bold text-dark mb-0">
                {caseStudy.chart.title}
              </h2>
            </div>
            <p className="text-muted">
              Visual placeholder for the type of analytical output Metis
              Intelligence would present to a founder.
            </p>
            <div className="d-flex flex-column gap-3 mt-3">
              {caseStudy.chart.bars.map((bar) => (
                <div key={bar.label}>
                  <div className="d-flex justify-content-between small text-muted mb-2">
                    <span>{bar.label}</span>
                    <span>{bar.value}</span>
                  </div>
                  <div className="progress" style={{ height: "12px" }}>
                    <div
                      className={`progress-bar ${toneClasses[bar.tone]}`}
                      role="progressbar"
                      style={{ width: `${bar.value}%` }}
                      aria-valuenow={bar.value}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-3 bg-light p-3 mt-4">
              <div className="small text-uppercase text-muted fw-bold mb-2">
                Consulting lens
              </div>
              <div className="text-muted">
                The focus is not only reporting metrics. It is identifying where
                growth breaks, why it breaks, and what should be done next.
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyDetail;
