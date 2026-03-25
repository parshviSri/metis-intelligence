/**
 * pages/login.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Sign-in page for Metis Intelligence.
 *
 * Flow:
 *   1. Email + password form → supabase.auth.signInWithPassword
 *   2. Google OAuth button   → supabase.auth.signInWithOAuth
 *   3. Toggle link           → /signup
 *
 * State handled by useAuth() hook:
 *   loading  – spinner on the submit button
 *   error    – inline red banner (friendly, non-technical copy)
 *   success  – hook redirects to /dashboard automatically
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import AuthCard     from "../components/auth/AuthCard";
import InputField   from "../components/auth/InputField";
import PrimaryButton from "../components/auth/PrimaryButton";
import Divider      from "../components/auth/Divider";
import GoogleButton from "../components/auth/GoogleButton";
import useAuth      from "../hooks/useAuth";
import { useAuthContext } from "../context/AuthContext";

// ─── Field validation (client-side, lightweight) ──────────────────────────────

const validate = ({ email, password }) => {
  const errs = {};
  if (!email.trim())
    errs.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    errs.email = "Please enter a valid email address.";
  if (!password)
    errs.password = "Password is required.";
  return errs;
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LoginPage() {
  const router             = useRouter();
  const { session, loading: sessionLoading } = useAuthContext();
  const { signIn, signInWithGoogle, loading, error, clearError } = useAuth();

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  // ── If already logged in, bounce to dashboard ──────────────────────────────
  useEffect(() => {
    if (!sessionLoading && session) {
      router.replace("/dashboard");
    }
  }, [session, sessionLoading, router]);

  // ── Add auth-page class so the global body padding is removed ──────────────
  useEffect(() => {
    document.body.classList.add("auth-page");
    return () => document.body.classList.remove("auth-page");
  }, []);

  // Clear API error whenever the user edits a field
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) clearError();
    if (fieldErrors.email) setFieldErrors((f) => ({ ...f, email: "" }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (error) clearError();
    if (fieldErrors.password) setFieldErrors((f) => ({ ...f, password: "" }));
  };

  // ── Submit ─────────────────────────────────────────────────────────────────

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate({ email, password });
    if (Object.keys(errs).length) {
      setFieldErrors(errs);
      return;
    }
    setFieldErrors({});
    await signIn(email, password);
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <>
      <Head>
        <title>Sign in — Metis Intelligence</title>
        <meta name="description" content="Sign in to your Metis Intelligence account." />
      </Head>

      <AuthCard
        title="Welcome back"
        subtitle="Sign in to continue to your dashboard."
      >
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
            label="Email address"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="you@example.com"
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
            placeholder="••••••••"
            autoComplete="current-password"
            required
            disabled={loading}
            error={fieldErrors.password}
          />

          {/* Forgot password link */}
          <div className="tw-flex tw-justify-end tw-mb-5 tw--mt-2">
            <a
              href="#"
              className="tw-text-xs tw-font-medium tw-no-underline hover:tw-underline"
              style={{ color: "#0096c7" }}
            >
              Forgot password?
            </a>
          </div>

          <PrimaryButton loading={loading} loadingLabel="Signing in…">
            Sign in to Metis →
          </PrimaryButton>
        </form>

        {/* ── Divider ── */}
        <Divider />

        {/* ── Google OAuth ── */}
        <GoogleButton
          onClick={signInWithGoogle}
          loading={loading}
          label="Continue with Google"
        />

        {/* ── Toggle to signup ── */}
        <p
          className="tw-text-center tw-text-sm tw-mt-6"
          style={{ color: "#6b7280" }}
        >
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="tw-font-semibold tw-no-underline hover:tw-underline"
            style={{ color: "#0096c7" }}
          >
            Create one free
          </Link>
        </p>
      </AuthCard>
    </>
  );
}
