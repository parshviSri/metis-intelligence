import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import Card from "../ui/Card";

const toneClass = (score) => {
  if (score >= 75) {
    return "text-success";
  }
  if (score >= 50) {
    return "text-warning";
  }
  return "text-danger";
};

const DiagnosticResults = ({
  overallScore,
  sectionScores,
  insights,
  selectedResults,
}) => {
  return (
    <div className="row g-4">
      <div className="col-12 col-lg-5">
        <Card
          className="border-0 shadow-lg h-100"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,150,199,0.08) 0%, rgba(255,255,255,1) 100%)",
          }}
        >
          <div className="small text-uppercase fw-bold text-primary mb-2">
            Business Health Score
          </div>
          <div className={`display-3 fw-bold mb-2 ${toneClass(overallScore)}`}>
            {overallScore}
          </div>
          <p className="text-muted mb-4">
            A directional score based on the business information, core metrics,
            and focus areas you chose to analyze.
          </p>
          <div className="d-flex flex-column gap-3">
            {selectedResults.map((section) => (
              <div
                key={section.key}
                className="d-flex align-items-center justify-content-between rounded-3 bg-white border p-3"
              >
                <div className="d-flex align-items-center gap-2">
                  <section.icon className="text-primary" size={18} />
                  <span className="fw-semibold text-dark">{section.label}</span>
                </div>
                <span className={`fw-bold ${toneClass(section.score)}`}>
                  {section.score}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="col-12 col-lg-7">
        <div className="d-flex flex-column gap-4">
          <Card className="border-0 shadow-sm">
            <div className="d-flex align-items-center gap-2 mb-3">
              <Sparkles className="text-primary" size={20} />
              <h2 className="h4 fw-bold text-dark mb-0">
                Personalized insights
              </h2>
            </div>
            <div className="d-flex flex-column gap-3">
              {insights.map((insight, index) => (
                <div
                  key={`${insight.title}-${index}`}
                  className="rounded-3 border-start border-4 border-primary bg-light p-3"
                >
                  <div className="fw-semibold text-dark mb-1">
                    {insight.title}
                  </div>
                  <div className="text-muted">{insight.description}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="border-0 shadow-sm">
            <div className="d-flex align-items-center gap-2 mb-3">
              <CheckCircle2 className="text-success" size={20} />
              <h2 className="h4 fw-bold text-dark mb-0">Suggested next steps</h2>
            </div>
            <ul className="text-muted ps-3 mb-0">
              <li className="mb-2">
                Focus on the lowest-scoring area first to improve business
                health faster.
              </li>
              <li className="mb-2">
                Use this result to prioritize where a founder diagnostic or
                consulting conversation should go deeper.
              </li>
              <li>
                Revisit the tool with updated inputs after key changes to see
                whether performance is improving.
              </li>
            </ul>
          </Card>

          <Card className="border-0 shadow-sm">
            <div className="d-flex align-items-center gap-2 mb-3">
              <AlertCircle className="text-warning" size={20} />
              <h2 className="h4 fw-bold text-dark mb-0">What this means</h2>
            </div>
            <p className="text-muted mb-0">
              This is a strategic diagnostic, not a financial audit. It is
              designed to surface likely growth constraints and guide smarter
              questions.
            </p>
            <div className="mt-4">
              <a href="#top" className="fw-semibold text-decoration-none">
                Review your responses <ArrowRight size={18} className="ms-1" />
              </a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticResults;
