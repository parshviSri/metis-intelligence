import Link from "next/link";
import { useRouter } from "next/router";
import Button from "../ui/Button";

const Nav = () => {
  const router = useRouter();

  const isActive = (href) => {
    if (href === "/") {
      return router.pathname === "/";
    }
    return router.pathname.startsWith(href);
  };

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
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
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
                className={`nav-link ${isActive("/diagnostic") && !isActive("/diagnostics") ? "active fw-bold" : ""}`}
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
          <div className="d-flex">
            <Link href="/diagnostic" passHref>
              <Button variant="primary">Start Diagnostic</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
