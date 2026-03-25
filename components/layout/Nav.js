import Link from "next/link";
import { useRouter } from "next/router";
import { LogOut, User } from "lucide-react";
import Button from "../ui/Button";
import { useAuthContext } from "../../context/AuthContext";
import useAuth from "../../hooks/useAuth";

const Nav = () => {
  const router = useRouter();
  const { session, loading: sessionLoading } = useAuthContext();
  const { signOut, loading: signingOut } = useAuth();

  const isActive = (href) => {
    if (href === "/") return router.pathname === "/";
    return router.pathname.startsWith(href);
  };

  // Don't render auth buttons until we know session state (avoids flicker)
  const authReady = !sessionLoading;
  const isLoggedIn = authReady && !!session;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
      <Link href="/" className="navbar-brand">
        <img
          src="/logo.svg"
          alt="Metis Intelligence"
          style={{ height: "80px", width: "auto" }}
        />
      </Link>
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* ── Left nav links ── */}
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link
                href="/"
                className={`nav-link ${isActive("/") ? "active fw-bold" : ""}`}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/framework"
                className={`nav-link ${isActive("/framework") ? "active fw-bold" : ""}`}
              >
                Framework
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/diagnostic"
                className={`nav-link ${
                  isActive("/diagnostic") && !isActive("/diagnostics")
                    ? "active fw-bold"
                    : ""
                }`}
              >
                Diagnostic
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/diagnostics"
                className={`nav-link ${isActive("/diagnostics") ? "active fw-bold" : ""}`}
              >
                History
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/case-studies"
                className={`nav-link ${isActive("/case-studies") ? "active fw-bold" : ""}`}
              >
                Case Studies
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/about"
                className={`nav-link ${isActive("/about") ? "active fw-bold" : ""}`}
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/contact"
                className={`nav-link ${isActive("/contact") ? "active fw-bold" : ""}`}
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* ── Right: auth buttons ── */}
          <div className="d-flex align-items-center gap-2">
            {authReady && (
              isLoggedIn ? (
                /* ── Logged-in state ── */
                <>
                  <span
                    className="d-none d-lg-flex align-items-center gap-1 text-muted small me-1"
                    title={session.user?.email}
                  >
                    <User size={14} />
                    <span
                      style={{
                        maxWidth: 140,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        display: "inline-block",
                      }}
                    >
                      {session.user?.email}
                    </span>
                  </span>

                  <Link href="/diagnostic" passHref>
                    <Button variant="primary">Dashboard</Button>
                  </Link>

                  <button
                    className="btn btn-outline-secondary d-flex align-items-center gap-1"
                    style={{ padding: "0.5rem 1rem", fontWeight: 600 }}
                    onClick={signOut}
                    disabled={signingOut}
                    aria-label="Sign out"
                  >
                    <LogOut size={15} />
                    <span className="d-none d-sm-inline">Sign out</span>
                  </button>
                </>
              ) : (
                /* ── Logged-out state ── */
                <>
                  <Link
                    href="/login"
                    className="btn btn-outline-secondary"
                    style={{
                      padding: "0.5rem 1.1rem",
                      fontWeight: 600,
                      borderRadius: "0.5rem",
                    }}
                  >
                    Sign in
                  </Link>

                  <Link href="/signup" passHref>
                    <Button variant="primary">Start Free →</Button>
                  </Link>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
