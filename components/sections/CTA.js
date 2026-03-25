import Link from "next/link";
import Button from "../ui/Button";

const CTA = () => {
  return (
    <section className="py-5 bg-gradient-accent text-white">
      <div className="container text-center">
        <h2 className="display-5 fw-bold mb-4">
          Get Your Business Health Score
        </h2>
        <p
          className="lead mb-4"
          style={{ maxWidth: "600px", margin: "0 auto" }}
        >
          Answer a few questions and uncover the biggest growth opportunity in
          your business.
        </p>
        <Link href="/signup" passHref>
          <Button variant="secondary" className="btn-hover btn-lg px-4 py-2">
            Start Free Diagnostic →
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CTA;
