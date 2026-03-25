/**
 * components/auth/AuthCard.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Full-page centered layout with:
 *  • Logo + brand name at the top
 *  • Value proposition headline above the card
 *  • Trust badge ("Used by 100+ founders")
 *  • White card with subtle shadow (Stripe/Linear style)
 *  • Fade-up entrance animation
 *
 * Props:
 *   title        {string}    – short headline inside the card (e.g. "Welcome back")
 *   subtitle     {string}    – one-line card sub-copy
 *   children     {ReactNode} – form content
 * ─────────────────────────────────────────────────────────────────────────────
 */

import Link from "next/link";

// ── Logo mark (inline SVG so no extra request) ──────────────────────────────

const LogoMark = () => (
  <div className="tw-flex tw-items-center tw-justify-center tw-gap-2 tw-mb-8">
    {/* Circle mark */}
    <div
      className="tw-flex tw-items-center tw-justify-center tw-rounded-xl tw-w-9 tw-h-9"
      style={{ background: "linear-gradient(135deg,#0096c7 0%,#005f8e 100%)" }}
      aria-hidden="true"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M9 2L15.5 6V12L9 16L2.5 12V6L9 2Z"
          stroke="white"
          strokeWidth="1.6"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="9" cy="9" r="2.5" fill="white" />
      </svg>
    </div>
    <Link href="/" className="tw-no-underline">
      <span
        className="tw-text-lg tw-font-bold tw-tracking-tight"
        style={{ color: "#111827" }}
      >
        Metis Intelligence
      </span>
    </Link>
  </div>
);

// ── Trust badge ──────────────────────────────────────────────────────────────

const TrustBadge = () => (
  <div className="tw-flex tw-items-center tw-justify-center tw-gap-2 tw-mb-5">
    {/* Avatar stack */}
    <div className="tw-flex tw--space-x-2">
      {["#0096c7", "#49736b", "#bd3a27", "#586179"].map((color, i) => (
        <div
          key={i}
          className="tw-w-7 tw-h-7 tw-rounded-full tw-border-2 tw-border-white tw-flex tw-items-center tw-justify-center tw-text-white tw-text-xs tw-font-bold"
          style={{ backgroundColor: color, zIndex: 4 - i }}
          aria-hidden="true"
        >
          {["J", "S", "A", "R"][i]}
        </div>
      ))}
    </div>
    <span className="tw-text-sm tw-font-medium" style={{ color: "#374151" }}>
      Used by{" "}
      <span className="tw-font-semibold" style={{ color: "#0096c7" }}>
        100+ founders
      </span>
    </span>
  </div>
);

// ── Headline (value prop) ────────────────────────────────────────────────────

const ValueProp = () => (
  <div className="tw-text-center tw-mb-8">
    <h1
      className="tw-text-2xl tw-font-bold tw-leading-tight tw-tracking-tight tw-mb-2"
      style={{ color: "#111827" }}
    >
      Find where your D2C brand is&nbsp;
      <span
        style={{
          background: "linear-gradient(90deg,#0096c7,#005f8e)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        losing money
      </span>
      &nbsp;in minutes
    </h1>
    <p className="tw-text-sm tw-leading-relaxed" style={{ color: "#6b7280" }}>
      AI-powered diagnostics that pinpoint profit leaks before they sink your
      brand.
    </p>
  </div>
);

// ── Main card ────────────────────────────────────────────────────────────────

const AuthCard = ({ title, subtitle, children }) => (
  <div
    className="tw-min-h-screen tw-flex tw-flex-col tw-items-center tw-justify-center tw-px-4 tw-py-12"
    style={{ background: "linear-gradient(160deg,#f0f9ff 0%,#f8fafc 60%,#fff 100%)" }}
  >
    {/* Logo */}
    <LogoMark />

    {/* Value proposition + trust badge */}
    <div className="tw-w-full tw-max-w-md">
      <ValueProp />
      <TrustBadge />

      {/* Card */}
      <div
        className="tw-bg-white tw-rounded-2xl tw-p-8 tw-animate-fade-up"
        style={{
          boxShadow:
            "0 1px 3px rgba(0,0,0,.08), 0 8px 32px rgba(0,0,0,.08), 0 0 0 1px rgba(0,0,0,.04)",
        }}
      >
        {/* Card header */}
        <div className="tw-mb-6">
          <h2
            className="tw-text-xl tw-font-bold tw-leading-tight"
            style={{ color: "#111827" }}
          >
            {title}
          </h2>
          {subtitle && (
            <p className="tw-text-sm tw-mt-1" style={{ color: "#6b7280" }}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Form content */}
        {children}
      </div>

      {/* Footer links */}
      <p className="tw-text-center tw-text-xs tw-mt-6" style={{ color: "#9ca3af" }}>
        By continuing, you agree to our{" "}
        <a href="#" className="tw-underline hover:tw-text-gray-700">
          Terms
        </a>{" "}
        and{" "}
        <a href="#" className="tw-underline hover:tw-text-gray-700">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  </div>
);

export default AuthCard;
