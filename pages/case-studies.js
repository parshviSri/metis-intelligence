import { useMemo, useState } from "react";
import Nav from "../components/layout/Nav";
import Footer from "../components/layout/Footer";
import CaseStudyCard from "../components/case-studies/CaseStudyCard";
import {
  caseStudies,
  caseStudyCategories,
} from "../data/caseStudies";

export default function CaseStudiesPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredCaseStudies = useMemo(() => {
    if (activeFilter === "All") {
      return caseStudies;
    }

    return caseStudies.filter(
      (caseStudy) => caseStudy.category === activeFilter,
    );
  }, [activeFilter]);

  return (
    <div className="min-vh-100 bg-white">
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
                  Case Studies
                </span>
                <h1 className="display-4 fw-bold text-dark mb-4">
                  Real Business Insights from Data
                </h1>
                <p className="lead text-muted mb-0">
                  Explore how structured analytics can uncover growth
                  opportunities, improve profitability, and optimize marketing
                  performance.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-5">
          <div className="container">
            <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
              {caseStudyCategories.map((category) => {
                const isActive = category === activeFilter;

                return (
                  <button
                    key={category}
                    type="button"
                    className={`btn ${
                      isActive ? "btn-custom-primary" : "btn-outline-secondary"
                    }`}
                    onClick={() => setActiveFilter(category)}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <div className="row g-4">
              {filteredCaseStudies.map((caseStudy) => (
                <div key={caseStudy.slug} className="col-12 col-lg-4">
                  <CaseStudyCard caseStudy={caseStudy} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
