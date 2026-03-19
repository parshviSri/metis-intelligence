import Link from "next/link";
import CaseStudyCard from "../case-studies/CaseStudyCard";
import { caseStudies } from "../../data/caseStudies";

const CaseStudies = () => {
  return (
    <section className="py-5 bg-white">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-dark mb-4">
            Real Business Insights from Data
          </h2>
          <p className="lead text-muted mx-auto" style={{ maxWidth: "760px" }}>
            A portfolio of analytical problem-solving across profitability,
            retention, and marketing performance.
          </p>
        </div>

        <div className="row g-4">
          {caseStudies.map((caseStudy) => (
            <div key={caseStudy.slug} className="col-12 col-md-4">
              <CaseStudyCard caseStudy={caseStudy} />
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <Link href="/case-studies" className="btn btn-custom-primary">
            Explore All Case Studies
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
