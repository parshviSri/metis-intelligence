/**
 * components/auth/PrimaryButton.js
 * ─────────────────────────────────────────────────────────────────────────────
 * High-contrast CTA button with:
 *   • Loading spinner (replaces label while in-flight)
 *   • Disabled state
 *   • Subtle lift on hover
 *   • Full-width by default (overridable via className)
 *
 * Props:
 *   children   {ReactNode}
 *   loading    {boolean}    – shows spinner and disables interaction
 *   disabled   {boolean}
 *   type       {string}     – "button" | "submit" | "reset"
 *   onClick    {function}
 *   className  {string}
 *   loadingLabel {string}   – accessible aria-label while loading
 * ─────────────────────────────────────────────────────────────────────────────
 */

const Spinner = () => (
  <svg
    className="tw-animate-spin tw-h-4 tw-w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      className="tw-opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="tw-opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    />
  </svg>
);

const PrimaryButton = ({
  children,
  loading = false,
  disabled = false,
  type = "submit",
  onClick,
  className = "",
  loadingLabel = "Please wait…",
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={loading}
      aria-label={loading ? loadingLabel : undefined}
      className={[
        "tw-relative tw-w-full tw-flex tw-items-center tw-justify-center tw-gap-2",
        "tw-px-4 tw-py-2.5 tw-rounded-lg",
        "tw-text-sm tw-font-semibold tw-text-white",
        "tw-transition-all tw-duration-150",
        "focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-offset-2",
        isDisabled
          ? "tw-opacity-60 tw-cursor-not-allowed"
          : "hover:tw-shadow-lg hover:tw--translate-y-px active:tw-translate-y-0",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        background: isDisabled
          ? "linear-gradient(135deg,#0096c7 0%,#005f8e 100%)"
          : "linear-gradient(135deg,#0096c7 0%,#005f8e 100%)",
        boxShadow: isDisabled
          ? "none"
          : "0 4px 14px rgba(0,150,199,.35), inset 0 1px 0 rgba(255,255,255,.15)",
        "--tw-ring-color": "#0096c7",
      }}
    >
      {loading ? (
        <>
          <Spinner />
          <span>{loadingLabel}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default PrimaryButton;
