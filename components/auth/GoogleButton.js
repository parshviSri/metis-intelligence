/**
 * components/auth/GoogleButton.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Google OAuth button — clean white pill with the official Google G logo.
 *
 * Props:
 *   onClick   {function}
 *   loading   {boolean}
 *   disabled  {boolean}
 *   label     {string}   – e.g. "Continue with Google" / "Sign up with Google"
 * ─────────────────────────────────────────────────────────────────────────────
 */

// Official Google "G" coloured logo (SVG, no external request)
const GoogleLogo = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M17.64 9.2045c0-.638-.0573-1.2518-.164-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9086c1.7018-1.5668 2.6836-3.874 2.6836-6.6151z"
      fill="#4285F4"
    />
    <path
      d="M9 18c2.43 0 4.4673-.806 5.9564-2.1805l-2.9086-2.2581C11.2359 14.3255 10.2059 14.7 9 14.7c-2.3373 0-4.3164-1.5786-5.0241-3.7005H.9573v2.3318C2.4382 15.9836 5.4818 18 9 18z"
      fill="#34A853"
    />
    <path
      d="M3.9759 10.9995C3.7973 10.4695 3.6955 9.9027 3.6955 9.3182c0-.5846.1018-1.1514.2804-1.6814V5.285H.9573C.3477 6.5005 0 7.8677 0 9.3182c0 1.4504.3477 2.8177.9573 4.0332l3.0186-2.3518z"
      fill="#FBBC05"
    />
    <path
      d="M9 3.9364c1.3182 0 2.5009.4532 3.4314 1.3432l2.5759-2.5759C13.4632.9927 11.4259 0 9 0 5.4818 0 2.4382 2.0164.9573 4.9864L3.9759 7.3382C4.6836 5.2164 6.6627 3.9364 9 3.9364z"
      fill="#EA4335"
    />
  </svg>
);

const GoogleButton = ({
  onClick,
  loading = false,
  disabled = false,
  label = "Continue with Google",
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={loading}
      className={[
        "tw-w-full tw-flex tw-items-center tw-justify-center tw-gap-3",
        "tw-px-4 tw-py-2.5 tw-rounded-lg",
        "tw-text-sm tw-font-medium",
        "tw-border tw-border-gray-200 tw-bg-white",
        "tw-transition-all tw-duration-150",
        "focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-offset-2 focus-visible:tw-ring-brand-500",
        isDisabled
          ? "tw-opacity-50 tw-cursor-not-allowed"
          : "hover:tw-bg-gray-50 hover:tw-border-gray-300 hover:tw-shadow-sm active:tw-scale-[.99]",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ color: "#374151" }}
    >
      {loading ? (
        <svg
          className="tw-animate-spin tw-h-4 tw-w-4 tw-text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="tw-opacity-25"
            cx="12" cy="12" r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="tw-opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      ) : (
        <GoogleLogo />
      )}
      <span>{loading ? "Redirecting…" : label}</span>
    </button>
  );
};

export default GoogleButton;
