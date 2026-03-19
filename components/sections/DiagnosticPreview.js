import Link from "next/link";

const DiagnosticPreview = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container text-center">
        <h2 className="display-4 fw-bold text-dark mb-4">
          Get Your Business Health Score
        </h2>
        <p className="lead text-muted mb-4">
          Answer a few questions about your business and receive a simple
          business health report with actionable insights.
        </p>
        <Link href="/diagnostic" className="btn btn-custom-primary btn-lg">
          Start Diagnostic
        </Link>
      </div>
    </section>
  );
};

export default DiagnosticPreview;
