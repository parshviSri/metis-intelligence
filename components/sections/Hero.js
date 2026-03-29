import Link from "next/link";
import Button from "../ui/Button";
import { useAuthContext } from "../../context/AuthContext";

const Hero = () => {
  const { session } = useAuthContext();

  return (
    <section className="mb-5 py-5 bg-gradient-primary text-white">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h1 className="display-4 fw-bold mb-4">
              See What's Actually Happening Inside Your Business
            </h1>
            <p className="lead mb-4">
              Diagnose profitability, customer acquisition, and growth using the
              PULSE analytics framework.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3">
              <Link href="/signup" passHref>
                <Button variant="primary" className="btn-hover">
                  Start Free Diagnostic →
                </Button>
              </Link>
              {!session && (
                <Link href="/login" passHref>
                  <Button variant="secondary" className="btn-hover">
                    Sign in
                  </Button>
                </Link>
              )}
            </div>
          </div>
          <div className="col-lg-6">
            <div
              className="card shadow-lg border-0 card-hover"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="card-body p-4">
                <h3 className="h4 fw-bold text-dark mb-4 text-center">
                  Business Snapshot
                </h3>

                {/* Revenue Trend Chart */}
                <div className="mb-4">
                  <h6 className="text-muted mb-3 fw-semibold">Revenue Trend</h6>
                  <div className="d-flex justify-content-center">
                    <svg
                      width="280"
                      height="120"
                      viewBox="0 0 280 120"
                      className="text-success"
                    >
                      {/* Grid lines */}
                      <line
                        x1="30"
                        y1="20"
                        x2="30"
                        y2="90"
                        stroke="#e9ecef"
                        strokeWidth="1"
                      />
                      <line
                        x1="30"
                        y1="90"
                        x2="250"
                        y2="90"
                        stroke="#e9ecef"
                        strokeWidth="1"
                      />

                      {/* Horizontal grid lines */}
                      <line
                        x1="30"
                        y1="30"
                        x2="250"
                        y2="30"
                        stroke="#f8f9fa"
                        strokeWidth="1"
                      />
                      <line
                        x1="30"
                        y1="50"
                        x2="250"
                        y2="50"
                        stroke="#f8f9fa"
                        strokeWidth="1"
                      />
                      <line
                        x1="30"
                        y1="70"
                        x2="250"
                        y2="70"
                        stroke="#f8f9fa"
                        strokeWidth="1"
                      />

                      {/* Y-axis labels */}
                      <text
                        x="25"
                        y="25"
                        textAnchor="end"
                        className="text-muted"
                        style={{ fontSize: "10px" }}
                      >
                        50K
                      </text>
                      <text
                        x="25"
                        y="45"
                        textAnchor="end"
                        className="text-muted"
                        style={{ fontSize: "10px" }}
                      >
                        40K
                      </text>
                      <text
                        x="25"
                        y="65"
                        textAnchor="end"
                        className="text-muted"
                        style={{ fontSize: "10px" }}
                      >
                        30K
                      </text>
                      <text
                        x="25"
                        y="85"
                        textAnchor="end"
                        className="text-muted"
                        style={{ fontSize: "10px" }}
                      >
                        20K
                      </text>

                      {/* X-axis labels */}
                      <text
                        x="60"
                        y="105"
                        textAnchor="middle"
                        className="text-muted"
                        style={{ fontSize: "9px" }}
                      >
                        Jan
                      </text>
                      <text
                        x="100"
                        y="105"
                        textAnchor="middle"
                        className="text-muted"
                        style={{ fontSize: "9px" }}
                      >
                        Feb
                      </text>
                      <text
                        x="140"
                        y="105"
                        textAnchor="middle"
                        className="text-muted"
                        style={{ fontSize: "9px" }}
                      >
                        Mar
                      </text>
                      <text
                        x="180"
                        y="105"
                        textAnchor="middle"
                        className="text-muted"
                        style={{ fontSize: "9px" }}
                      >
                        Apr
                      </text>
                      <text
                        x="220"
                        y="105"
                        textAnchor="middle"
                        className="text-muted"
                        style={{ fontSize: "9px" }}
                      >
                        May
                      </text>

                      {/* Data bars */}
                      <rect
                        x="50"
                        y="50"
                        width="20"
                        height="40"
                        fill="#28a745"
                        opacity="0.8"
                      />
                      <rect
                        x="90"
                        y="40"
                        width="20"
                        height="50"
                        fill="#28a745"
                        opacity="0.8"
                      />
                      <rect
                        x="130"
                        y="35"
                        width="20"
                        height="55"
                        fill="#28a745"
                        opacity="0.8"
                      />
                      <rect
                        x="170"
                        y="30"
                        width="20"
                        height="60"
                        fill="#28a745"
                        opacity="0.8"
                      />
                      <rect
                        x="210"
                        y="25"
                        width="20"
                        height="65"
                        fill="#28a745"
                        opacity="0.8"
                      />

                      {/* Trend line */}
                      <polyline
                        fill="none"
                        stroke="#20c997"
                        strokeWidth="3"
                        points="60,70 100,60 140,55 180,50 220,45"
                      />

                      {/* Data points */}
                      <circle
                        cx="60"
                        cy="70"
                        r="4"
                        fill="#20c997"
                        stroke="white"
                        strokeWidth="2"
                      />
                      <circle
                        cx="100"
                        cy="60"
                        r="4"
                        fill="#20c997"
                        stroke="white"
                        strokeWidth="2"
                      />
                      <circle
                        cx="140"
                        cy="55"
                        r="4"
                        fill="#20c997"
                        stroke="white"
                        strokeWidth="2"
                      />
                      <circle
                        cx="180"
                        cy="50"
                        r="4"
                        fill="#20c997"
                        stroke="white"
                        strokeWidth="2"
                      />
                      <circle
                        cx="220"
                        cy="45"
                        r="4"
                        fill="#20c997"
                        stroke="white"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="row g-3 mb-4">
                  <div className="col-6">
                    <div className="bg-light rounded p-3 text-center h-100">
                      <div className="d-flex align-items-center justify-content-center mb-1">
                        <span className="me-2">📈</span>
                        <span className="h5 fw-bold text-success mb-0">
                          $45,230
                        </span>
                      </div>
                      <div className="text-muted">Monthly Revenue</div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="bg-light rounded p-3 text-center h-100">
                      <div className="d-flex align-items-center justify-content-center mb-1">
                        <span className="me-2">🎯</span>
                        <span className="h5 fw-bold text-warning mb-0">
                          $125
                        </span>
                      </div>
                      <div className="text-muted">Customer CAC</div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="bg-light rounded p-3 text-center h-100">
                      <div className="d-flex align-items-center justify-content-center mb-1">
                        <span className="me-2">🔁</span>
                        <span className="h5 fw-bold text-info mb-0">68%</span>
                      </div>
                      <div className="text-muted">Retention Rate</div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="bg-light rounded p-3 text-center h-100">
                      <div className="d-flex align-items-center justify-content-center mb-1">
                        <span className="me-2">💰</span>
                        <span className="h5 fw-bold text-primary mb-0">
                          23%
                        </span>
                      </div>
                      <div className="text-muted">Profit Margin</div>
                    </div>
                  </div>
                </div>

                {/* Insight Section */}
                <div className="border-top pt-3">
                  <h6 className="text-muted mb-2 fw-semibold">💡 Insight</h6>
                  <p className="text-muted mb-0">
                    Your retention rate is strong, but CAC could be optimized
                    for better profitability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
