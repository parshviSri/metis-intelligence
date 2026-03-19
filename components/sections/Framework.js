import Card from "../ui/Card";
import Button from "../ui/Button";
import Link from "next/link";
import {
  DollarSign,
  Users,
  RotateCcw,
  CreditCard,
  FlaskRound,
} from "lucide-react";

const Framework = () => {
  const diagnosticSteps = [
    {
      number: 1,
      title: "Revenue Model",
      description:
        "How does your business make money? We trace the dollar from entry to profit.",
      icon: DollarSign,
      color: "bg-success",
      textColor: "text-success",
    },
    {
      number: 2,
      title: "Customer Acquisition",
      description: "How do you attract and acquire new customers?",
      icon: Users,
      color: "bg-primary",
      textColor: "text-primary",
    },
    {
      number: 3,
      title: "Customer Behavior",
      description:
        "What do customers do after they join? Where do they drop off or stay engaged?",
      icon: RotateCcw,
      color: "bg-info",
      textColor: "text-info",
    },
    {
      number: 4,
      title: "Marketing Efficiency",
      description: "How efficiently do you turn spend into growth?",
      icon: CreditCard,
      color: "bg-warning",
      textColor: "text-warning",
    },
    {
      number: 5,
      title: "Growth Experiments",
      description: "What experiments are you running to improve growth?",
      icon: FlaskRound,
      color: "bg-danger",
      textColor: "text-danger",
    },
  ];

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-dark mb-4">
            A Full Customer Economics Diagnostic
          </h2>
          <p className="lead text-muted mb-4">
            PULSE moves beyond surface-level metrics to analyze the entire
            growth system.
            <br />
            <span className="fw-semibold">
              The goal is not just more customers. The goal is sustainable and
              profitable growth.
            </span>
          </p>
          <div className="text-muted mb-4">
            <strong>Key Objective:</strong> "The goal is not just to see how you
            grow, but to identify exactly where growth breaks."
          </div>
        </div>

        {/* PULSE Framework Breakdown */}
        <div
          className="mt-5 pt-5 border-top"
          style={{
            background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
          }}
        >
          <div className="text-center mb-5">
            <h3 className="h2 fw-bold text-dark mb-3">The PULSE Framework</h3>
            <p className="lead text-muted mb-5">
              Used to diagnose growth across 5 core business systems.
            </p>
          </div>

          {/* Timeline Layout */}
          <div className="position-relative mb-5">
            {/* Connection Line */}

            <div className="d-flex justify-content-center align-items-center flex-wrap gap-3 gap-lg-4">
              {/* Performance */}
              <div className="text-center" style={{ minWidth: "120px" }}>
                <div
                  className="pulse-step-card mb-3 mx-auto"
                  style={{
                    width: "80px",
                    height: "80px",
                    backgroundColor: "#007bff",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 6px rgba(0, 123, 255, 0.1)",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                >
                  <div className="text-white">
                    <div className="fw-bold fs-5">P</div>
                  </div>
                </div>
                <h6 className="fw-bold text-dark mb-1">Performance</h6>
                <p className="text-muted small mb-0">Revenue & Profit</p>
              </div>

              {/* Arrow */}
              <div
                className="d-none d-lg-flex align-items-center justify-content-center"
                style={{ minWidth: "40px" }}
              >
                <div className="fs-2 text-muted">→</div>
              </div>

              {/* User Acquisition */}
              <div className="text-center" style={{ minWidth: "120px" }}>
                <div
                  className="pulse-step-card mb-3 mx-auto"
                  style={{
                    width: "80px",
                    height: "80px",
                    backgroundColor: "#28a745",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 6px rgba(40, 167, 69, 0.1)",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                >
                  <div className="text-white">
                    <div className="fw-bold fs-5">U</div>
                  </div>
                </div>
                <h6 className="fw-bold text-dark mb-1">User Growth</h6>
                <p className="text-muted small mb-0">Acquisition Channels</p>
              </div>

              {/* Arrow */}
              <div
                className="d-none d-lg-flex align-items-center justify-content-center"
                style={{ minWidth: "40px" }}
              >
                <div className="fs-2 text-muted">→</div>
              </div>

              {/* Lifecycle */}
              <div className="text-center" style={{ minWidth: "120px" }}>
                <div
                  className="pulse-step-card mb-3 mx-auto"
                  style={{
                    width: "80px",
                    height: "80px",
                    backgroundColor: "#17a2b8",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 6px rgba(23, 162, 184, 0.1)",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                >
                  <div className="text-white">
                    <div className="fw-bold fs-5">L</div>
                  </div>
                </div>
                <h6 className="fw-bold text-dark mb-1">Lifecycle</h6>
                <p className="text-muted small mb-0">Retention & LTV</p>
              </div>

              {/* Arrow */}
              <div
                className="d-none d-lg-flex align-items-center justify-content-center"
                style={{ minWidth: "40px" }}
              >
                <div className="fs-2 text-muted">→</div>
              </div>

              {/* Strategy */}
              <div className="text-center" style={{ minWidth: "120px" }}>
                <div
                  className="pulse-step-card mb-3 mx-auto"
                  style={{
                    width: "80px",
                    height: "80px",
                    backgroundColor: "#ffc107",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 6px rgba(255, 193, 7, 0.1)",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                >
                  <div className="text-white">
                    <div className="fw-bold fs-5">S</div>
                  </div>
                </div>
                <h6 className="fw-bold text-dark mb-1">Strategy</h6>
                <p className="text-muted small mb-0">Marketing ROI</p>
              </div>

              {/* Arrow */}
              <div
                className="d-none d-lg-flex align-items-center justify-content-center"
                style={{ minWidth: "40px" }}
              >
                <div className="fs-2 text-muted">→</div>
              </div>

              {/* Experiments */}
              <div className="text-center" style={{ minWidth: "120px" }}>
                <div
                  className="pulse-step-card mb-3 mx-auto"
                  style={{
                    width: "80px",
                    height: "80px",
                    backgroundColor: "#dc3545",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 6px rgba(220, 53, 69, 0.1)",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                >
                  <div className="text-white">
                    <div className="fw-bold fs-5">E</div>
                  </div>
                </div>
                <h6 className="fw-bold text-dark mb-1">Experiments</h6>
                <p className="text-muted small mb-0">Growth Testing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Framework;
