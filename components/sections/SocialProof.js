import Card from "../ui/Card";

const SocialProof = () => {
  const testimonials = [
    {
      quote:
        "Metis helped me realize my marketing was destroying profit. I cut ad spend by 30% and revenue stayed the same.",
      author: "Sarah Chen",
      role: "Founder, EcoBeauty Co.",
    },
    {
      quote:
        "The diagnostic showed our retention was the real problem. We fixed it and grew 40% in 6 months.",
      author: "Marcus Rodriguez",
      role: "CEO, TechFlow Solutions",
    },
  ];

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-dark mb-4">
            Trusted by Founders
          </h2>
          <p className="lead text-muted">
            See what entrepreneurs say about Metis Intelligence.
          </p>
        </div>
        <div className="row g-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="col-12 col-md-6">
              <Card className="card-hover h-100">
                <blockquote className="blockquote mb-3">
                  <p className="text-muted">"{testimonial.quote}"</p>
                </blockquote>
                <div className="fw-semibold text-dark">
                  {testimonial.author}
                </div>
                <div className="small text-muted">{testimonial.role}</div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
