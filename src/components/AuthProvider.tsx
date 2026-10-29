"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { onAuthStateChanged, signOut as firebaseSignOut, type User } from "firebase/auth";
import { getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase";

interface AuthContextValue {
  // undefined = Firebase hasn't reported back yet (initial load).
  // null      = checked, nobody is signed in.
  // User      = signed in.
  user: User | null | undefined;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Wraps the whole app (see layout.tsx) so any component can read the current
// Firebase auth state through useAuth(). The header uses it to swap "Sign in"
// for the account menu, and RequireAuth uses it to guard the dashboard.
export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    // No .env.local yet → behave as "signed out" instead of crashing.
    if (!isFirebaseConfigured) {
      setUser(null);
      return;
    }
    try {
      return onAuthStateChanged(getFirebaseAuth(), (u) => setUser(u));
    } catch {
      setUser(null);
    }
  }, []);

  async function signOut() {
    if (!isFirebaseConfigured) return;
    await firebaseSignOut(getFirebaseAuth());
  }

  return (
    <AuthContext.Provider value={{ user, loading: user === undefined, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
