/**
 * context/AuthContext.js
 * ─────────────────────────────────────────────────────────────────────────────
 * React context that exposes the current Supabase session and a loading flag
 * to the entire component tree.
 *
 * Usage:
 *   import { useAuthContext } from "../context/AuthContext";
 *   const { session, loading } = useAuthContext();
 * ─────────────────────────────────────────────────────────────────────────────
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../lib/supabaseClient";

// ─── Context ─────────────────────────────────────────────────────────────────

const AuthContext = createContext({
  session: null,
  user:    null,
  loading: true,
});

// ─── Provider ─────────────────────────────────────────────────────────────────

/**
 * AuthProvider
 *
 * Wrap _app.js with this so every page can read auth state.
 * Listens to onAuthStateChange so the UI re-renders on sign-in/sign-out.
 */
export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load any existing session on mount
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
      setLoading(false);
    });

    // Subscribe to future auth events
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        user:    session?.user ?? null,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useAuthContext = () => useContext(AuthContext);
