/**
 * lib/supabaseClient.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Singleton Supabase browser client.
 *
 * Set these two env vars (copy .env.local.example → .env.local):
 *   NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
 *
 * When the env vars are missing (e.g. during development without Supabase
 * set up yet), we return a "null client" stub so the pages still render —
 * auth calls will simply return a descriptive error instead of crashing.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL  || "";
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// ─── Null stub (returned when env vars are missing) ───────────────────────────

/**
 * NullClient mirrors the Supabase client interface but returns
 * meaningful "not configured" errors instead of throwing.
 */
const makeNullClient = () => {
  const notConfigured = () =>
    Promise.resolve({
      data: null,
      error: {
        message:
          "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and " +
          "NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file.",
      },
    });

  return {
    auth: {
      getSession:          () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange:   (cb) => {
        cb("INITIAL_SESSION", null);
        return { data: { subscription: { unsubscribe: () => {} } } };
      },
      signUp:              notConfigured,
      signInWithPassword:  notConfigured,
      signInWithOAuth:     notConfigured,
      signOut:             () => Promise.resolve({ error: null }),
    },
  };
};

// ─── Real client (only when both env vars are present) ───────────────────────

let _client = null;

const getClient = () => {
  if (!supabaseUrl || !supabaseAnon) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[Metis] Supabase env vars not set. Auth will use a stub client.\n" +
          "Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local"
      );
    }
    return makeNullClient();
  }

  if (!_client) {
    _client = createClient(supabaseUrl, supabaseAnon, {
      auth: {
        persistSession:     true,
        autoRefreshToken:   true,
        detectSessionInUrl: true,
      },
    });
  }

  return _client;
};

/**
 * supabase – the shared Supabase client instance.
 * Safe to import anywhere; won't throw if env vars are missing.
 */
export const supabase = getClient();
