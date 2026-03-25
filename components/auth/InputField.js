/**
 * components/auth/InputField.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Reusable labelled input with:
 *   • Error state (red border + inline message)
 *   • Password visibility toggle (Eye / EyeOff icon)
 *   • Focus ring that matches brand colour
 *   • Smooth transition on error appearance
 *
 * Props:
 *   id           {string}
 *   label        {string}
 *   type         {string}   – "text" | "email" | "password"
 *   value        {string}
 *   onChange     {function}
 *   placeholder  {string}
 *   error        {string}   – if set, shows below the input
 *   autoComplete {string}
 *   required     {boolean}
 *   disabled     {boolean}
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const InputField = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  error,
  autoComplete,
  required = false,
  disabled = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword   = type === "password";
  const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;
  const hasError     = Boolean(error);

  return (
    <div className="tw-mb-4">
      {/* Label */}
      <label
        htmlFor={id}
        className="tw-block tw-text-sm tw-font-medium tw-mb-1.5"
        style={{ color: hasError ? "#dc2626" : "#374151" }}
      >
        {label}
        {required && (
          <span className="tw-ml-0.5" style={{ color: "#dc2626" }} aria-hidden="true">
            *
          </span>
        )}
      </label>

      {/* Input wrapper */}
      <div className="tw-relative">
        <input
          id={id}
          name={id}
          type={resolvedType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : undefined}
          className={[
            "tw-block tw-w-full tw-rounded-lg tw-px-3.5 tw-py-2.5",
            "tw-text-sm tw-text-gray-900",
            "tw-border tw-outline-none",
            "tw-transition tw-duration-150",
            "placeholder:tw-text-gray-400",
            "disabled:tw-opacity-50 disabled:tw-cursor-not-allowed",
            hasError
              ? "tw-border-red-400 tw-bg-red-50 focus:tw-ring-2 focus:tw-ring-red-300 focus:tw-border-red-400"
              : "tw-border-gray-200 tw-bg-white focus:tw-ring-2 focus:tw-ring-brand-500/30 focus:tw-border-brand-500",
            isPassword ? "tw-pr-10" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          style={
            !hasError
              ? { "--tw-ring-color": "rgba(0,150,199,.25)" }
              : undefined
          }
        />

        {/* Password toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className={[
              "tw-absolute tw-right-3 tw-top-1/2 tw--translate-y-1/2",
              "tw-p-0.5 tw-rounded tw-transition",
              "focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-brand-500",
            ].join(" ")}
            tabIndex={0}
            aria-label={showPassword ? "Hide password" : "Show password"}
            disabled={disabled}
          >
            {showPassword ? (
              <EyeOff size={16} style={{ color: "#9ca3af" }} />
            ) : (
              <Eye size={16} style={{ color: "#9ca3af" }} />
            )}
          </button>
        )}
      </div>

      {/* Error message */}
      {hasError && (
        <p
          id={`${id}-error`}
          role="alert"
          className="tw-mt-1.5 tw-text-xs tw-flex tw-items-center tw-gap-1"
          style={{ color: "#dc2626" }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
            className="tw-flex-shrink-0"
          >
            <circle cx="6" cy="6" r="5.5" stroke="#dc2626" />
            <path d="M6 3.5V6.5" stroke="#dc2626" strokeLinecap="round" />
            <circle cx="6" cy="8.5" r=".75" fill="#dc2626" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
