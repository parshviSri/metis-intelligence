import "../styles/globals.css";
import { useEffect } from "react";
import { AuthProvider } from "../context/AuthContext";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Import Bootstrap JS (only needed for non-auth pages that use Bootstrap components)
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
