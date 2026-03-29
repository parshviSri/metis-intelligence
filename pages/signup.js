/**
 * pages/signup.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Sign-up page for Metis Intelligence.
 *
 * Flow:
 *   1. Email + password form → supabase.auth.signUp
 *   2. Google OAuth button   → supabase.auth.signInWithOAuth
 *   3. On success            → shows "check your email" confirmation state
 *   4. Toggle link           → /login
 *
 * State handled by useAuth() hook:
 *   loading  – spinner while request is in-flight
 *   error    – inline red banner (friendly copy)
 *   success  – local boolean → renders confirmation card
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { CheckCircle2, Mail } from "lucide-react";

import AuthCard      from "../components/auth/AuthCard";
import InputField    from "../components/auth/InputField";
import PrimaryButton from "../components/auth/PrimaryButton";
import Divider       from "../components/auth/Divider";
import GoogleButton  from "../components/auth/GoogleButton";
import useAuth       from "../hooks/useAuth";
import { useAuthContext } from "../context/AuthContext";

// ─── Validation ───────────────────────────────────────────────────────────────

const validate = ({ email, password, confirm }) => {
  const errs = {};

  if (!email.trim())
    errs.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    errs.email = "Please enter a valid email address.";

  if (!password)
    errs.password = "Password is required.";
  else if (password.length < 6)
    errs.password = "Password must be at least 6 characters.";

  if (!confirm)
    errs.confirm = "Please confirm your password.";
  else if (confirm !== password)
    errs.confirm = "Passwords don't match.";

  return errs;
};

// ─── Confirmation screen ──────────────────────────────────────────────────────

const ConfirmationScreen = ({ email }) => (
  <div className="tw-flex tw-flex-col tw-items-center tw-text-center tw-py-4">
    {/* Animated checkmark circle */}
    <div
      className="tw-w-16 tw-h-16 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-mb-5"
      style={{ backgroundColor: "#f0fdf4", border: "2px solid #bbf7d0" }}
    >
      <CheckCircle2 size={32} style={{ color: "#16a34a" }} />
    </div>

    <h3
      className="tw-text-lg tw-font-bold tw-mb-2"
      style={{ color: "#111827" }}
    >
      Check your inbox
    </h3>

    <p className="tw-text-sm tw-leading-relaxed" style={{ color: "#6b7280" }}>
      We sent a confirmation link to{" "}
      <span className="tw-font-semibold" style={{ color: "#111827" }}>
        {email}
      </span>
      . Click the link to activate your account and get started.
    </p>

    {/* Hint */}
    <div
      className="tw-flex tw-items-start tw-gap-2 tw-rounded-lg tw-p-3 tw-mt-5 tw-text-xs tw-text-left"
      style={{ backgroundColor: "#f0f9ff", color: "#0369a1" }}
    >
      <Mail size={14} className="tw-flex-shrink-0 tw-mt-0.5" />
      <span>
        Can&apos;t find it? Check your spam folder or{" "}
        <button
          type="button"
          className="tw-font-semibold tw-underline tw-bg-transparent tw-border-0 tw-p-0 tw-cursor-pointer"
          style={{ color: "#0096c7" }}
          onClick={() => window.location.reload()}
        >
          try a different email
        </button>
        .
      </span>
    </div>

    <Link
      href="/login"
      className="tw-mt-6 tw-text-sm tw-font-semibold tw-no-underline hover:tw-underline"
      style={{ color: "#0096c7" }}
    >
      Back to sign in
    </Link>
  </div>
);

// ─── Password strength meter ───────────────────────────────────────────────────

const strengthLabel = (pw) => {
  if (!pw) return null;
  if (pw.length < 6)  return { label: "Too short", color: "#ef4444", width: "25%" };
  if (pw.length < 10) return { label: "Weak",      color: "#f59e0b", width: "50%" };
  if (pw.length < 14) return { label: "Good",      color: "#0096c7", width: "75%" };
  return               { label: "Strong",     color: "#16a34a", width: "100%" };
};

const StrengthBar = ({ password }) => {
  const info = strengthLabel(password);
  if (!info) return null;
  return (
    <div className="tw-mt-1.5 tw-mb-3">
      <div
        className="tw-h-1 tw-rounded-full tw-overflow-hidden"
        style={{ backgroundColor: "#e5e7eb" }}
        aria-hidden="true"
      >
        <div
          className="tw-h-full tw-rounded-full tw-transition-all tw-duration-300"
          style={{ width: info.width, backgroundColor: info.color }}
        />
      </div>
      <p className="tw-text-xs tw-mt-1" style={{ color: info.color }}>
        {info.label}
      </p>
    </div>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SignupPage() {
  const router = useRouter();
  const { session, loading: sessionLoading } = useAuthContext();
  const { signUp, signInWithGoogle, loading, error, clearError } = useAuth();

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // ── Redirect if already authenticated ─────────────────────────────────────
  useEffect(() => {
    if (!sessionLoading && session) {
      router.replace("/");
    }
  }, [session, sessionLoading, router]);

  // ── Auth-page body class (removes global padding-top) ─────────────────────
  useEffect(() => {
    document.body.classList.add("auth-page");
    return () => document.body.classList.remove("auth-page");
  }, []);

  // ── Field change handlers ──────────────────────────────────────────────────

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) clearError();
    if (fieldErrors.email) setFieldErrors((f) => ({ ...f, email: "" }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (error) clearError();
    if (fieldErrors.password) setFieldErrors((f) => ({ ...f, password: "" }));
    if (fieldErrors.confirm && e.target.value === confirm)
      setFieldErrors((f) => ({ ...f, confirm: "" }));
  };

  const handleConfirmChange = (e) => {
    setConfirm(e.target.value);
    if (fieldErrors.confirm) setFieldErrors((f) => ({ ...f, confirm: "" }));
  };

  // ── Submit ─────────────────────────────────────────────────────────────────

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate({ email, password, confirm });
    if (Object.keys(errs).length) {
      setFieldErrors(errs);
      return;
    }
    setFieldErrors({});
    const { success } = await signUp(email, password);
    if (success) setSubmitted(true);
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <>
      <Head>
        <title>Create account — Metis Intelligence</title>
        <meta
          name="description"
          content="Sign up for Metis Intelligence and find where your D2C brand is losing money."
        />
      </Head>

      <AuthCard
        title={submitted ? "You're almost in!" : "Start your free diagnostic"}
        subtitle={
          submitted
            ? ""
            : "No credit card required. Results in under 5 minutes."
        }
      >
        {/* ── Post-submit: confirmation screen ── */}
        {submitted ? (
          <ConfirmationScreen email={email} />
        ) : (
          <>
            {/* ── Google OAuth (above form for higher conversion) ── */}
            <GoogleButton
              onClick={signInWithGoogle}
              loading={loading}
              label="Sign up with Google"
            />

            {/* ── Divider ── */}
            <Divider label="or sign up with email" />

            {/* ── Global API error banner ── */}
            {error && (
              <div
                role="alert"
                className="tw-flex tw-items-start tw-gap-2.5 tw-rounded-lg tw-p-3 tw-mb-5 tw-text-sm"
                style={{
                  backgroundColor: "#fef2f2",
                  border: "1px solid #fecaca",
                  color: "#b91c1c",
                }}
              >
                <svg
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                  className="tw-flex-shrink-0 tw-mt-0.5"
                  aria-hidden="true"
                >
                  <circle cx="8" cy="8" r="7.5" stroke="#b91c1c" />
                  <path d="M8 4.5V8.5" stroke="#b91c1c" strokeLinecap="round" />
                  <circle cx="8" cy="11" r="1" fill="#b91c1c" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* ── Form ── */}
            <form onSubmit={handleSubmit} noValidate>
              <InputField
                id="email"
                label="Work email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="you@brand.com"
                autoComplete="email"
                required
                disabled={loading}
                error={fieldErrors.email}
              />

              <InputField
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Min. 6 characters"
                autoComplete="new-password"
                required
                disabled={loading}
                error={fieldErrors.password}
              />

              {/* Strength meter (only shown while typing) */}
              {password && !fieldErrors.password && (
                <StrengthBar password={password} />
              )}

              <InputField
                id="confirm"
                label="Confirm password"
                type="password"
                value={confirm}
                onChange={handleConfirmChange}
                placeholder="Repeat password"
                autoComplete="new-password"
                required
                disabled={loading}
                error={fieldErrors.confirm}
              />

              {/* Social proof micro-copy */}
              <p
                className="tw-text-xs tw-mb-4 tw-flex tw-items-center tw-gap-1"
                style={{ color: "#6b7280" }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path
                    d="M6 1L7.47 4.07L11 4.58L8.5 7.02L9.05 10.54L6 8.99L2.95 10.54L3.5 7.02L1 4.58L4.53 4.07L6 1Z"
                    fill="#f59e0b"
                  />
                </svg>
                Join 100+ founders already using Metis to grow profitably.
              </p>

              <PrimaryButton loading={loading} loadingLabel="Creating account…">
                Create free account →
              </PrimaryButton>
            </form>

            {/* ── Toggle to login ── */}
            <p
              className="tw-text-center tw-text-sm tw-mt-6"
              style={{ color: "#6b7280" }}
            >
              Already have an account?{" "}
              <Link
                href="/login"
                className="tw-font-semibold tw-no-underline hover:tw-underline"
                style={{ color: "#0096c7" }}
              >
                Sign in
              </Link>
            </p>
          </>
        )}
      </AuthCard>
    </>
  );
}
