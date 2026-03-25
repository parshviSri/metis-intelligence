/**
 * components/auth/withAuth.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Higher-Order Component that gates any page behind authentication.
 *
 * Behaviour:
 *   • Loading  → full-screen spinner (prevents layout flash)
 *   • Logged in  → renders the wrapped page normally
 *   • Logged out → renders an inline auth-gate wall (login + signup options)
 *                  with the current path stored so the user is redirected back
 *                  after signing in
 *
 * Usage — wrap any page export:
 *   export default withAuth(DiagnosticPage);
 *   export default withAuth(DiagnosticsHistory, { redirectTo: "/login" });
 *
 * Options:
 *   redirectTo  {string}   – if set, hard-redirects instead of showing the wall
 *                            (e.g. "/login?next=/diagnostic")
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { BarChart3, Lock, LogIn, UserPlus } from "lucide-react";
import { useAuthContext } from "../../context/AuthContext";

// ─── Full-screen spinner shown while session is being resolved ───────────────

const AuthLoadingScreen = () => (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(160deg,#f0f9ff 0%,#f8fafc 60%,#fff 100%)",
    }}
  >
    <div style={{ textAlign: "center" }}>
      {/* Animated brand mark */}
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          background: "linear-gradient(135deg,#0096c7 0%,#005f8e 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 16px",
          animation: "authPulse 1.4s ease-in-out infinite",
        }}
      >
        <BarChart3 size={24} color="white" />
      </div>
      <p style={{ color: "#9ca3af", fontSize: 14, margin: 0 }}>Loading…</p>
      <style>{`
        @keyframes authPulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:.6; transform:scale(.92); }
        }
      `}</style>
    </div>
  </div>
);

// ─── Auth-gate wall (shown instead of redirecting) ───────────────────────────

const AuthGateWall = ({ returnPath }) => {
  const loginHref  = `/login?next=${encodeURIComponent(returnPath)}`;
  const signupHref = `/signup?next=${encodeURIComponent(returnPath)}`;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
        background: "linear-gradient(160deg,#f0f9ff 0%,#f8fafc 60%,#fff 100%)",
      }}
    >
      {/* Card */}
      <div
        style={{
          background: "#fff",
          borderRadius: 20,
          padding: "2.5rem 2rem",
          maxWidth: 420,
          width: "100%",
          boxShadow:
            "0 1px 3px rgba(0,0,0,.08), 0 8px 32px rgba(0,0,0,.08), 0 0 0 1px rgba(0,0,0,.04)",
          textAlign: "center",
          animation: "gateSlideUp .35s ease both",
        }}
      >
        {/* Lock icon */}
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#e0f2fe 0%,#bae6fd 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.25rem",
          }}
        >
          <Lock size={24} style={{ color: "#0096c7" }} />
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: "1.35rem",
            fontWeight: 700,
            color: "#111827",
            marginBottom: "0.5rem",
            lineHeight: 1.3,
          }}
        >
          Sign in to run your diagnostic
        </h1>
        <p style={{ fontSize: 14, color: "#6b7280", marginBottom: "1.75rem", lineHeight: 1.6 }}>
          Create a free account or sign in to access the business diagnostic
          tool and get your personalised health score.
        </p>

        {/* Trust badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginBottom: "1.75rem",
          }}
        >
          <div style={{ display: "flex", marginRight: 4 }}>
            {["#0096c7", "#49736b", "#bd3a27", "#586179"].map((color, i) => (
              <div
                key={i}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  border: "2px solid #fff",
                  background: color,
                  marginLeft: i === 0 ? 0 : -8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: 10,
                  fontWeight: 700,
                  zIndex: 4 - i,
                  position: "relative",
                }}
              >
                {["J","S","A","R"][i]}
              </div>
            ))}
          </div>
          <span style={{ fontSize: 13, color: "#374151" }}>
            Trusted by{" "}
            <strong style={{ color: "#0096c7" }}>100+ founders</strong>
          </span>
        </div>

        {/* CTA buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {/* Primary — Sign up */}
          <Link
            href={signupHref}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "0.7rem 1.25rem",
              borderRadius: 10,
              background: "linear-gradient(135deg,#0096c7 0%,#005f8e 100%)",
              color: "#fff",
              fontWeight: 600,
              fontSize: 14,
              textDecoration: "none",
              boxShadow: "0 4px 14px rgba(0,150,199,.35)",
              transition: "opacity .15s",
            }}
          >
            <UserPlus size={16} />
            Create free account
          </Link>

          {/* Secondary — Sign in */}
          <Link
            href={loginHref}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "0.7rem 1.25rem",
              borderRadius: 10,
              border: "1.5px solid #e5e7eb",
              background: "#fff",
              color: "#374151",
              fontWeight: 600,
              fontSize: 14,
              textDecoration: "none",
              transition: "background .15s, border-color .15s",
            }}
          >
            <LogIn size={16} />
            Sign in to existing account
          </Link>
        </div>

        {/* Fine print */}
        <p style={{ fontSize: 11, color: "#9ca3af", marginTop: "1.25rem", marginBottom: 0 }}>
          Free forever · No credit card required
        </p>
      </div>

      {/* Back link */}
      <Link
        href="/"
        style={{
          marginTop: "1.25rem",
          fontSize: 13,
          color: "#9ca3af",
          textDecoration: "none",
        }}
      >
        ← Back to homepage
      </Link>

      <style>{`
        @keyframes gateSlideUp {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>
    </div>
  );
};

// ─── HOC ─────────────────────────────────────────────────────────────────────

/**
 * withAuth(WrappedPage, options?)
 *
 * @param  {React.ComponentType} WrappedPage
 * @param  {{ redirectTo?: string }} options
 * @returns {React.ComponentType}
 */
const withAuth = (WrappedPage, options = {}) => {
  const { redirectTo } = options;

  const ProtectedPage = (props) => {
    const { session, loading } = useAuthContext();
    const router = useRouter();

    // Hard-redirect mode (optional — pass redirectTo to use this)
    useEffect(() => {
      if (!redirectTo) return;
      if (!loading && !session) {
        const next = encodeURIComponent(router.asPath);
        router.replace(`${redirectTo}?next=${next}`);
      }
    }, [loading, session, router]);

    // 1. Session still resolving — show spinner
    if (loading) return <AuthLoadingScreen />;

    // 2. Not logged in
    if (!session) {
      // Hard redirect mode: show spinner while redirect happens
      if (redirectTo) return <AuthLoadingScreen />;
      // Inline gate wall mode (default)
      return <AuthGateWall returnPath={router.asPath} />;
    }

    // 3. Logged in — render the actual page
    return <WrappedPage {...props} />;
  };

  // Copy the display name for React DevTools
  ProtectedPage.displayName = `withAuth(${
    WrappedPage.displayName || WrappedPage.name || "Page"
  })`;

  return ProtectedPage;
};

export default withAuth;
