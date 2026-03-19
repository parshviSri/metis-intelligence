import Link from "next/link";
import Card from "../ui/Card";

const categoryStyles = {
  Profitability: "text-primary bg-primary bg-opacity-10",
  Retention: "text-success bg-success bg-opacity-10",
  Marketing: "text-warning bg-warning bg-opacity-25",
};

const CaseStudyCard = ({ caseStudy }) => {
  const tagStyle =
    categoryStyles[caseStudy.category] || "text-dark bg-light border";

  return (
    <Card className="border-0 shadow-sm h-100 card-hover">
      <div className="d-flex flex-column h-100">
        <div className="mb-3">
          <span
            className={`badge rounded-pill px-3 py-2 fw-semibold ${tagStyle}`}
          >
            {caseStudy.category}
          </span>
        </div>
        <h3 className="h4 fw-bold text-dark mb-3">{caseStudy.title}</h3>
        <p className="text-muted flex-grow-1 mb-4">{caseStudy.description}</p>
        <Link
          href={`/case-studies/${caseStudy.slug}`}
          className="fw-semibold text-decoration-none"
          style={{ color: "#0096c7" }}
        >
          View Case Study -&gt;
        </Link>
      </div>
    </Card>
  );
};

export default CaseStudyCard;
