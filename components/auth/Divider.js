/**
 * components/auth/Divider.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Horizontal rule with centred text (e.g. "or continue with Google").
 *
 * Props:
 *   label  {string}  – defaults to "or continue with"
 * ─────────────────────────────────────────────────────────────────────────────
 */

const Divider = ({ label = "or continue with" }) => (
  <div className="tw-flex tw-items-center tw-gap-3 tw-my-5">
    <div
      className="tw-flex-1 tw-h-px"
      style={{ backgroundColor: "#e5e7eb" }}
      aria-hidden="true"
    />
    <span
      className="tw-text-xs tw-font-medium tw-select-none"
      style={{ color: "#9ca3af" }}
    >
      {label}
    </span>
    <div
      className="tw-flex-1 tw-h-px"
      style={{ backgroundColor: "#e5e7eb" }}
      aria-hidden="true"
    />
  </div>
);

export default Divider;
