import Link from "next/link";
import Button from "../ui/Button";

const Footer = () => {
  return (
    <>
      {/* Pre-footer CTA */}
      <section
        className="py-5"
        style={{
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        }}
      >
        <div className="container text-center">
          <h3 className="h4 fw-bold text-dark mb-3">
            Get Your Business Health Score
          </h3>
          <p className="text-muted mb-4">
            Answer a few questions and discover your biggest growth opportunity.
          </p>
          <Link href="/diagnostic" passHref>
            <Button variant="primary">Start Diagnostic</Button>
          </Link>
        </div>
      </section>

      {/* Main Footer */}
      <footer
        className="py-5 text-light"
        style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)" }}
      >
        <div className="container">
          <div className="row g-4">
            {/* Brand Section */}
            <div className="col-12 col-md-6 col-lg-4">
              <img
                src="/logo.svg"
                alt="Metis Intelligence"
                className="mb-3"
                style={{ height: "32px", width: "auto" }}
              />
              <p className="text-light mb-3 fw-medium">
                Helping founders understand profitability, growth, and customer
                economics through simple analytics.
              </p>
              <p className="text-white small mb-0">
                Business clarity through data-driven insights.
              </p>
            </div>

            {/* Framework Section */}
            <div className="col-12 col-md-3 col-lg-2">
              <h5 className="text-white mb-3">Framework</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link
                    href="/framework"
                    className="text-white text-decoration-none"
                  >
                    PULSE Overview
                  </Link>
                </li>
                <li className="mb-2">
                  <a
                    href="#performance"
                    className="text-white text-decoration-none"
                  >
                    Performance
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#users" className="text-white text-decoration-none">
                    User Acquisition
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#lifecycle"
                    className="text-white text-decoration-none"
                  >
                    Lifecycle
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#strategy"
                    className="text-white text-decoration-none"
                  >
                    Strategy
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#experiments"
                    className="text-white text-decoration-none"
                  >
                    Experiments
                  </a>
                </li>
              </ul>
            </div>

            {/* Product Section */}
            <div className="col-12 col-md-3 col-lg-2">
              <h5 className="text-white mb-3">Product</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link
                    href="/diagnostic"
                    className="text-white text-decoration-none"
                  >
                    Business Diagnostic
                  </Link>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-white text-decoration-none">
                    Health Score
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-white text-decoration-none">
                    Growth Insights
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-white text-decoration-none">
                    Founder Toolkit
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources Section */}
            <div className="col-12 col-md-3 col-lg-2">
              <h5 className="text-white mb-3">Resources</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link
                    href="/case-studies"
                    className="text-white text-decoration-none"
                  >
                    Case Studies
                  </Link>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-white text-decoration-none">
                    Blog
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-white text-decoration-none">
                    Founder Guides
                  </a>
                </li>
              </ul>
            </div>

            {/* Built For Section */}
            <div className="col-12 col-md-3 col-lg-2">
              <h5 className="text-white mb-3">Built For</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <span className="text-white small">D2C Founders</span>
                </li>
                <li className="mb-2">
                  <span className="text-white small">
                    Small Business Owners
                  </span>
                </li>
                <li className="mb-2">
                  <span className="text-white small">
                    First-time Entrepreneurs
                  </span>
                </li>
                <li className="mb-2">
                  <span className="text-white small">Women-led Startups</span>
                </li>
              </ul>
            </div>

            {/* Connect Section */}
            <div className="col-12 col-md-6 col-lg-4">
              <h5 className="text-white mb-3">Connect</h5>
              <div className="d-flex flex-column gap-2">
                <a
                  href="#"
                  className="text-white text-decoration-none d-flex align-items-center"
                >
                  <svg
                    className="bi me-2"
                    width="18"
                    height="18"
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
                <a
                  href="#"
                  className="text-white text-decoration-none d-flex align-items-center"
                >
                  <svg
                    className="bi me-2"
                    width="18"
                    height="18"
                    fill="currentColor"
                  >
                    <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
                  </svg>
                  Twitter / X
                </a>
                <a
                  href="mailto:hello@metisintelligence.com"
                  className="text-white text-decoration-none d-flex align-items-center"
                >
                  <svg
                    className="bi me-2"
                    width="18"
                    height="18"
                    fill="currentColor"
                  >
                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                  </svg>
                  contacts@metisintelligence.com
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="row mt-5">
            <div className="col-12 col-md-8 col-lg-6 mx-auto">
              <div className="text-center">
                <h5 className="text-white mb-3">Founder Insights</h5>
                <p className="text-white small mb-4">
                  Get monthly insights on growth, retention, and business
                  analytics.
                </p>
                <div
                  className="input-group mb-3"
                  style={{ maxWidth: "400px", margin: "0 auto" }}
                >
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    aria-label="Email address"
                  />
                  <button className="btn btn-primary" type="button">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          <hr className="my-4" />
          <div className="text-center">
            <p className="text-white small mb-0">
              © 2026 Metis Intelligence. All rights reserved. | Business clarity
              through analytics.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
