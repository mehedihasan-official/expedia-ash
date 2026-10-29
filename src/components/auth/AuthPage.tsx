"use client";

import { useAuth } from "@/components/AuthProvider";
import GoogleIcon from "@/components/auth/GoogleIcon";
import TextField from "@/components/auth/TextField";
import Logo from "@/components/Logo";
import { friendlyAuthError, safeRedirect } from "@/lib/authErrors";
import { getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { CircleAlert, MailCheck } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";

type Mode = "signin" | "register" | "reset";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_PASSWORD = 8;

const primaryBtn =
  "flex h-12 w-full items-center justify-center rounded-full bg-xp-blue text-base font-semibold text-white transition hover:bg-xp-blue-dark disabled:cursor-not-allowed disabled:opacity-60";

export default function AuthPage({ mode: initialMode }: { mode: "signin" | "register" }) {
  const router = useRouter();
  const params = useSearchParams();
  const { user, loading: authLoading, refreshUser } = useAuth();

  const callbackUrl = params.get("callbackUrl");
  const redirectTo = safeRedirect(callbackUrl, "/");
  const qs = callbackUrl ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : "";

  const [mode, setMode] = useState<Mode>(initialMode);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);
  const [busy, setBusy] = useState<null | "email" | "google">(null);
  const submitting = useRef(false);

  // Keep the form in step with the URL when switching between the two tabs.
  useEffect(() => {
    setMode(initialMode);
    setFieldErrors({});
    setFormError(null);
    setResetSent(false);
  }, [initialMode]);

  // Already signed in (bookmark / back button)? Skip the form.
  // `submitting` stops this from racing the registration flow, which still has
  // to save the display name before leaving the page.
  useEffect(() => {
    if (!authLoading && user && !submitting.current) router.replace(redirectTo);
  }, [authLoading, user, router, redirectTo]);

  function validate(): boolean {
    const errs: Record<string, string> = {};
    if (mode === "register") {
      if (!firstName.trim()) errs.firstName = "Enter your first name.";
      if (!lastName.trim()) errs.lastName = "Enter your last name.";
    }
    if (!email.trim()) errs.email = "Enter your email address.";
    else if (!EMAIL_RE.test(email.trim())) errs.email = "Enter a valid email address.";
    if (mode !== "reset") {
      if (!password) errs.password = "Enter your password.";
      else if (mode === "register" && password.length < MIN_PASSWORD)
        errs.password = `Use at least ${MIN_PASSWORD} characters.`;
    }
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (!validate()) return;
    if (!isFirebaseConfigured) {
      setFormError("Firebase isn't configured. Add your keys to .env.local (see .env.example) and restart the dev server.");
      return;
    }

    setBusy("email");
    submitting.current = true;
    try {
      const auth = getFirebaseAuth();
      if (mode === "signin") {
        await signInWithEmailAndPassword(auth, email.trim(), password);
        router.push(redirectTo);
      } else if (mode === "register") {
        const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
        // Profile + verification email are nice-to-haves: never block sign-up on them.
        try {
          await updateProfile(cred.user, { displayName: `${firstName.trim()} ${lastName.trim()}` });
          refreshUser();
        } catch {}
        try {
          await sendEmailVerification(cred.user);
        } catch {}
        router.push(redirectTo);
      } else {
        await sendPasswordResetEmail(auth, email.trim());
        setResetSent(true);
        setBusy(null);
        submitting.current = false;
      }
    } catch (err) {
      setFormError(friendlyAuthError(err));
      setBusy(null);
      submitting.current = false;
    }
  }

  async function onGoogle() {
    setFormError(null);
    if (!isFirebaseConfigured) {
      setFormError("Firebase isn't configured. Add your keys to .env.local (see .env.example) and restart the dev server.");
      return;
    }
    setBusy("google");
    submitting.current = true;
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      await signInWithPopup(getFirebaseAuth(), provider);
      router.push(redirectTo);
    } catch (err) {
      setFormError(friendlyAuthError(err));
      setBusy(null);
      submitting.current = false;
    }
  }

  const title = mode === "signin" ? "Sign in" : mode === "register" ? "Create an account" : "Reset your password";
  const subtitle =
    mode === "signin"
      ? "Sign in to unlock Member Prices and earn OneKeyCash."
      : mode === "register"
        ? "It's free — and you'll unlock Member Prices right away."
        : "Enter the email you signed up with and we'll send you a link to choose a new password.";

  return (
    <div className="flex min-h-screen flex-col bg-white md:bg-xp-gray/60">
      <header className="flex h-14 items-center px-6 md:h-[72px] md:px-10">
        <Logo />
      </header>

      <main className="flex flex-1 items-start justify-center px-0 pb-16 md:px-6 md:pt-6">
        <div className="w-full max-w-[480px] bg-white px-6 pb-8 pt-4 md:rounded-2xl md:border md:border-xp-line md:px-10 md:pb-10 md:pt-8">
          {mode !== "reset" && (
            <div role="tablist" aria-label="Sign in or create an account" className="mb-7 flex border-b border-xp-line">
              {(
                [
                  ["signin", "Sign in", `/pages/login${qs}`],
                  ["register", "Create an account", `/pages/register${qs}`],
                ] as const
              ).map(([id, label, href]) => (
                <Link
                  key={id}
                  href={href}
                  role="tab"
                  aria-selected={mode === id}
                  className={`-mb-px flex-1 border-b-[3px] px-2 py-3 text-center text-sm font-semibold transition ${
                    mode === id ? "border-xp-blue text-xp-blue" : "border-transparent text-xp-navy hover:border-xp-line"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          )}

          <h1 className="font-display text-[32px] leading-10">{title}</h1>
          <p className="mt-2 text-sm leading-5 text-xp-muted">{subtitle}</p>

          {!isFirebaseConfigured && (
            <p className="mt-4 flex gap-2 rounded-lg bg-[#fff6d6] p-3 text-xs leading-4 text-xp-navy" role="status">
              <CircleAlert size={16} className="mt-px shrink-0" />
              Firebase keys not found. Copy <code className="font-mono">.env.example</code> to{" "}
              <code className="font-mono">.env.local</code>, fill it in, and restart <code className="font-mono">npm run dev</code>.
            </p>
          )}

          {resetSent ? (
            <div className="mt-6 rounded-lg bg-xp-gray p-4" role="status">
              <p className="flex items-center gap-2 text-[15px] font-semibold">
                <MailCheck size={20} className="text-xp-green" /> Check your inbox
              </p>
              <p className="mt-1 text-sm leading-5">
                If an account exists for <strong>{email.trim()}</strong>, a password reset link is on its way.
              </p>
              <button
                type="button"
                onClick={() => {
                  setMode("signin");
                  setResetSent(false);
                  setPassword("");
                }}
                className="mt-4 text-sm font-semibold text-xp-blue hover:underline"
              >
                Back to sign in
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="mt-6 flex flex-col gap-4">
              {mode === "register" && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextField
                    label="First name"
                    autoComplete="given-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    error={fieldErrors.firstName}
                  />
                  <TextField
                    label="Last name"
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    error={fieldErrors.lastName}
                  />
                </div>
              )}

              <TextField
                label="Email address"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={fieldErrors.email}
              />

              {mode !== "reset" && (
                <TextField
                  label="Password"
                  type="password"
                  autoComplete={mode === "signin" ? "current-password" : "new-password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={fieldErrors.password}
                  hint={mode === "register" ? `Use at least ${MIN_PASSWORD} characters.` : undefined}
                />
              )}

              {mode === "signin" && (
                <button
                  type="button"
                  onClick={() => {
                    setMode("reset");
                    setFieldErrors({});
                    setFormError(null);
                  }}
                  className="-mt-1 self-start text-sm font-semibold text-xp-blue hover:underline"
                >
                  Forgot password?
                </button>
              )}

              {formError && (
                <p role="alert" className="flex gap-2 rounded-lg bg-[#fdecef] p-3 text-sm leading-5 text-[#9b1236]">
                  <CircleAlert size={18} className="mt-0.5 shrink-0" /> {formError}
                </p>
              )}

              <button type="submit" disabled={busy !== null} className={primaryBtn}>
                {busy === "email"
                  ? mode === "signin" ? "Signing in…" : mode === "register" ? "Creating account…" : "Sending…"
                  : mode === "signin" ? "Sign in" : mode === "register" ? "Create account" : "Send reset link"}
              </button>

              {mode === "reset" && (
                <button
                  type="button"
                  onClick={() => {
                    setMode("signin");
                    setFormError(null);
                    setFieldErrors({});
                  }}
                  className="self-center text-sm font-semibold text-xp-blue hover:underline"
                >
                  Back to sign in
                </button>
              )}
            </form>
          )}

          {mode !== "reset" && (
            <>
              <div className="my-6 flex items-center gap-3 text-sm text-xp-muted" aria-hidden="true">
                <span className="h-px flex-1 bg-xp-line" /> or <span className="h-px flex-1 bg-xp-line" />
              </div>

              <button
                type="button"
                onClick={onGoogle}
                disabled={busy !== null}
                className="flex h-12 w-full items-center justify-center gap-3 rounded-full border border-xp-outline bg-white text-base font-semibold text-xp-navy transition hover:bg-xp-gray disabled:cursor-not-allowed disabled:opacity-60"
              >
                <GoogleIcon />
                {busy === "google" ? "Opening Google…" : "Continue with Google"}
              </button>

              <p className="mt-6 text-xs leading-[18px] text-xp-muted">
                By {mode === "signin" ? "signing in" : "creating an account"}, I agree to the{" "}
                <Link href="#" className="text-xp-blue hover:underline">Terms and Conditions</Link>,{" "}
                <Link href="#" className="text-xp-blue hover:underline">Privacy Statement</Link> and{" "}
                <Link href="#" className="text-xp-blue hover:underline">One Key™ terms and conditions</Link>.
              </p>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
