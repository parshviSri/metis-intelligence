/**
 * hooks/useAuth.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Encapsulates all Supabase auth actions with loading + error state.
 *
 * Returns:
 *   signUp(email, password)         → supabase.auth.signUp
 *   signIn(email, password)         → supabase.auth.signInWithPassword
 *   signInWithGoogle()              → supabase.auth.signInWithOAuth (Google)
 *   signOut()                       → supabase.auth.signOut
 *   loading   {boolean}             → true while a request is in-flight
 *   error     {string|null}         → human-readable error message
 *   clearError()                    → reset error to null
 *
 * All errors from Supabase are mapped to friendly, non-technical messages.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";

// ─── Error mapper ─────────────────────────────────────────────────────────────

/**
 * Maps raw Supabase / network error messages to clean, user-facing copy.
 * Falls back to the original message if no mapping is found.
 */
const mapError = (message = "") => {
  const m = message.toLowerCase();

  if (m.includes("invalid login credentials") || m.includes("invalid credentials"))
    return "Incorrect email or password. Please try again.";
  if (m.includes("email not confirmed"))
    return "Please verify your email before signing in.";
  if (m.includes("user already registered") || m.includes("already registered"))
    return "An account with this email already exists. Try signing in instead.";
  if (m.includes("password should be at least"))
    return "Password must be at least 6 characters.";
  if (m.includes("unable to validate email address"))
    return "Please enter a valid email address.";
  if (m.includes("rate limit") || m.includes("too many requests"))
    return "Too many attempts. Please wait a moment and try again.";
  if (m.includes("network") || m.includes("fetch"))
    return "Network error. Please check your connection and try again.";
  if (m.includes("popup closed") || m.includes("user cancelled"))
    return "Sign-in was cancelled. Please try again.";

  // Return a sanitised version of the original message
  return message.charAt(0).toUpperCase() + message.slice(1);
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

const useAuth = () => {
  const router  = useRouter();
  const [loading, setLoading]   = useState(false);
  const [error,   setError]     = useState(null);

  const clearError = useCallback(() => setError(null), []);

  // ── Sign Up ──────────────────────────────────────────────────────────────

  /**
   * signUp(email, password)
   *
   * Creates a new account. Supabase sends a confirmation email by default.
   * After email confirmation, users land on the home page by default.
   *
   * @returns {{ success: boolean }}
   */
  const signUp = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);

    const { error: sbError } = await supabase.auth.signUp({
      email:    email.trim().toLowerCase(),
      password,
      options:  {
        // Where Supabase should redirect after email confirmation
        emailRedirectTo: `${window.location.origin}/`,
      },
    });

    setLoading(false);

    if (sbError) {
      setError(mapError(sbError.message));
      return { success: false };
    }

    // Success — Supabase has sent a confirmation email
    return { success: true };
  }, []);

  // ── Sign In ──────────────────────────────────────────────────────────────

  /**
   * signIn(email, password)
   *
   * Signs in with email + password. On success, pushes home by default.
   *
   * @returns {{ success: boolean }}
   */
  const signIn = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);

    const { error: sbError } = await supabase.auth.signInWithPassword({
      email:    email.trim().toLowerCase(),
      password,
    });

    setLoading(false);

    if (sbError) {
      setError(mapError(sbError.message));
      return { success: false };
    }

    // Respect ?next= param set by withAuth HOC, otherwise land on home.
    const next = router.query.next;
    router.push(typeof next === "string" && next.startsWith("/") ? next : "/");
    return { success: true };
  }, [router]);

  // ── Google OAuth ─────────────────────────────────────────────────────────

  /**
   * signInWithGoogle()
   *
   * Initiates the Google OAuth flow. The browser is redirected to Google,
   * then back to /auth/callback (or the redirectTo URL) on completion.
   * Supabase handles the token exchange automatically.
   */
  const signInWithGoogle = useCallback(async () => {
    setLoading(true);
    setError(null);

    // Preserve ?next= so the OAuth callback can land on the right page
    const next = router.query.next;
    const safeNext =
      typeof next === "string" && next.startsWith("/") ? next : "/";

    const { error: sbError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}${safeNext}`,
      },
    });

    // If the OAuth popup was blocked or an immediate error occurred
    if (sbError) {
      setError(mapError(sbError.message));
      setLoading(false);
    }
    // Keep loading=true while the browser redirects away
  }, []);

  // ── Sign Out ─────────────────────────────────────────────────────────────

  /**
   * signOut()
   *
   * Signs the current user out and redirects to /login.
   */
  const signOut = useCallback(async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
    router.push("/login");
  }, [router]);

  // ─────────────────────────────────────────────────────────────────────────

  return {
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    loading,
    error,
    clearError,
  };
};

export default useAuth;
