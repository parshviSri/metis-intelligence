import Link from "next/link";
import {
  ArrowRight,
  HelpCircle,
  Linkedin,
  Mail,
  MessageSquare,
  Rocket,
  Twitter,
} from "lucide-react";
import Nav from "../components/layout/Nav";
import Footer from "../components/layout/Footer";
import Card from "../components/ui/Card";

const contactOptions = [
  {
    title: "Start with a Diagnostic",
    description:
      "Answer a few questions and get insights into your business.",
    cta: "Start Business Diagnostic",
    href: "/diagnostic",
    icon: Rocket,
    variant: "primary",
  },
  {
    title: "Talk to Us",
    description:
      "Have a specific problem or need help? Send us a message.",
    cta: "Send a Message",
    href: "#contact-form",
    icon: MessageSquare,
    variant: "secondary",
  },
];

const faqs = [
  {
    question: "Is the diagnostic free?",
    answer: "Yes, you can start with a free business diagnostic.",
  },
  {
    question: "Who is this for?",
    answer:
      "Early-stage founders, D2C brands, and small business owners.",
  },
  {
    question: "Do I need technical knowledge?",
    answer:
      "No, the platform is designed to be simple and easy to use.",
  },
];

export default function Contact() {
  return (
    <div className="min-vh-100 bg-white">
      <Nav />
      <main>
        <section
          className="py-5"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,150,199,0.08) 0%, rgba(255,255,255,1) 72%)",
          }}
        >
          <div className="container py-4">
            <div className="row justify-content-center text-center">
              <div className="col-12 col-lg-9">
                <span className="badge rounded-pill text-bg-light border px-3 py-2 mb-3">
                  Get in Touch
                </span>
                <h1 className="display-4 fw-bold text-dark mb-4">
                  Let&apos;s Understand Your Business Better
                </h1>
                <p className="lead text-muted mb-0">
                  Have questions about your business, analytics, or growth?
                  We&apos;re here to help you make better decisions with clarity.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-5">
          <div className="container">
            <div className="row g-4">
              {contactOptions.map((option) => (
                <div key={option.title} className="col-12 col-lg-6">
                  <Card className="border-0 shadow-sm h-100">
                    <div className="d-flex align-items-center gap-3 mb-4">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                          width: "56px",
                          height: "56px",
                          backgroundColor:
                            option.variant === "primary"
                              ? "rgba(0,150,199,0.12)"
                              : "rgba(13,110,253,0.10)",
                        }}
                      >
                        <option.icon
                          className={
                            option.variant === "primary"
                              ? "text-info"
                              : "text-primary"
                          }
                          size={28}
                        />
                      </div>
                      <div>
                        <h2 className="h4 fw-bold text-dark mb-1">
                          {option.title}
                        </h2>
                        <p className="text-muted mb-0">{option.description}</p>
                      </div>
                    </div>
                    <div>
                      <Link
                        href={option.href}
                        className={`btn ${
                          option.variant === "primary"
                            ? "btn-custom-primary"
                            : "btn-outline-dark"
                        }`}
                      >
                        {option.cta} <ArrowRight size={18} className="ms-2" />
                      </Link>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-5 bg-light border-top border-bottom" id="contact-form">
          <div className="container">
            <div className="row g-4 align-items-start">
              <div className="col-12 col-lg-7">
                <Card className="border-0 shadow-sm">
                  <div className="mb-4">
                    <span className="text-uppercase small fw-bold text-primary">
                      Contact Form
                    </span>
                    <h2 className="display-6 fw-bold text-dark mt-2 mb-3">
                      Tell us about your business
                    </h2>
                    <p className="text-muted mb-0">
                      Share a bit of context and we&apos;ll point you toward the
                      right next step.
                    </p>
                  </div>

                  <form>
                    <div className="row g-3">
                      <div className="col-12 col-md-6">
                        <label htmlFor="name" className="form-label fw-semibold">
                          Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Your name"
                        />
                      </div>
                      <div className="col-12 col-md-6">
                        <label htmlFor="email" className="form-label fw-semibold">
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          className="form-control form-control-lg"
                          placeholder="you@business.com"
                        />
                      </div>
                      <div className="col-12 col-md-6">
                        <label
                          htmlFor="businessType"
                          className="form-label fw-semibold"
                        >
                          Business Type
                        </label>
                        <select
                          id="businessType"
                          name="businessType"
                          className="form-select form-select-lg"
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Select business type
                          </option>
                          <option value="d2c">D2C / Ecommerce</option>
                          <option value="services">Services Business</option>
                          <option value="saas">SaaS / Product</option>
                          <option value="agency">Agency / Consulting</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="col-12 col-md-6">
                        <label
                          htmlFor="monthlyRevenue"
                          className="form-label fw-semibold"
                        >
                          Monthly Revenue
                        </label>
                        <input
                          id="monthlyRevenue"
                          name="monthlyRevenue"
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Optional"
                        />
                      </div>
                      <div className="col-12">
                        <label htmlFor="message" className="form-label fw-semibold">
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows="6"
                          className="form-control"
                          placeholder="Tell us about your business or the challenge you're facing"
                        />
                      </div>
                      <div className="col-12 d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-3">
                        <button type="submit" className="btn btn-custom-primary">
                          Send Message <ArrowRight size={18} className="ms-2" />
                        </button>
                        <span className="text-muted small">
                          We&apos;ll review your message and get back to you soon.
                        </span>
                      </div>
                    </div>
                  </form>
                </Card>
              </div>

              <div className="col-12 col-lg-5">
                <div className="d-flex flex-column gap-4">
                  <Card className="border-0 shadow-sm">
                    <span className="text-uppercase small fw-bold text-primary">
                      Direct Contact
                    </span>
                    <h2 className="h3 fw-bold text-dark mt-2 mb-4">
                      Prefer a direct conversation?
                    </h2>
                    <div className="d-flex flex-column gap-3">
                      <a
                        href="mailto:hello@metisintelligence.com"
                        className="text-decoration-none d-flex align-items-center gap-3 text-dark"
                      >
                        <Mail className="text-primary" size={20} />
                        <span>hello@metisintelligence.com</span>
                      </a>
                      <a
                        href="#"
                        className="text-decoration-none d-flex align-items-center gap-3 text-dark"
                      >
                        <Linkedin className="text-primary" size={20} />
                        <span>LinkedIn</span>
                      </a>
                      <a
                        href="#"
                        className="text-decoration-none d-flex align-items-center gap-3 text-dark"
                      >
                        <Twitter className="text-primary" size={20} />
                        <span>Twitter</span>
                      </a>
                    </div>
                  </Card>

                  <Card
                    className="border-0 shadow-sm"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(25,135,84,0.08) 0%, rgba(255,255,255,1) 100%)",
                    }}
                  >
                    <span className="text-uppercase small fw-bold text-success">
                      We Read Every Message
                    </span>
                    <p className="text-dark fw-semibold mt-3 mb-2">
                      We aim to respond within 24 to 48 hours.
                    </p>
                    <p className="text-muted mb-0">
                      This platform is designed to help founders. Feel free to
                      reach out even if you&apos;re just starting.
                    </p>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-5">
          <div className="container">
            <div className="text-center mb-5">
              <span className="text-uppercase small fw-bold text-primary">
                FAQ
              </span>
              <h2 className="display-6 fw-bold text-dark mt-2 mb-3">
                Quick answers before you reach out
              </h2>
            </div>
            <div className="row g-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="col-12 col-lg-4">
                  <Card className="border-0 shadow-sm h-100">
                    <div className="d-flex align-items-start gap-3">
                      <HelpCircle className="text-primary mt-1" size={22} />
                      <div>
                        <h3 className="h5 fw-bold text-dark mb-2">
                          {faq.question}
                        </h3>
                        <p className="text-muted mb-0">{faq.answer}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-5 border-top">
          <div className="container">
            <Card
              className="border-0 shadow-lg text-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(13,110,253,0.08) 0%, rgba(255,255,255,1) 60%)",
              }}
            >
              <div className="mx-auto" style={{ maxWidth: "760px" }}>
                <h2 className="display-6 fw-bold text-dark mb-3">
                  Not Sure Where to Start?
                </h2>
                <p className="lead text-muted mb-4">
                  Start with the diagnostic and discover your biggest growth
                  opportunity.
                </p>
                <Link href="/diagnostic" className="btn btn-custom-primary btn-lg">
                  Start Business Diagnostic <ArrowRight size={18} className="ms-2" />
                </Link>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
