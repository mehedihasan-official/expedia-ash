import type { AuthError } from "firebase/auth";

/**
 * Turns Firebase Auth error codes into short, human-readable messages.
 * Firebase deliberately returns the same "invalid-credential" for a wrong
 * password and for an unknown email (so a form can't be used to find out which
 * emails have accounts) — the message below reflects that.
 */
export function friendlyAuthError(error: unknown): string {
  const code = (error as AuthError | undefined)?.code;

  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
    case "auth/invalid-login-credentials":
      return "That email and password don't match an account. Check them and try again.";
    case "auth/invalid-email":
      return "Enter a valid email address.";
    case "auth/email-already-in-use":
      return "An account with this email already exists. Try signing in instead.";
    case "auth/weak-password":
      return "Choose a stronger password (at least 8 characters).";
    case "auth/user-disabled":
      return "This account has been disabled. Please contact support.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a few minutes and try again.";
    case "auth/network-request-failed":
      return "Network error — check your connection and try again.";
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return "Google sign-in was cancelled.";
    case "auth/popup-blocked":
      return "Your browser blocked the Google sign-in window. Allow pop-ups for this site and try again.";
    case "auth/account-exists-with-different-credential":
      return "An account already exists with this email using a different sign-in method.";
    case "auth/operation-not-allowed":
      return "This sign-in method isn't enabled yet. Enable it in the Firebase console (Authentication → Sign-in method).";
    case "auth/unauthorized-domain":
      return "This domain isn't authorized for sign-in. Add it in the Firebase console (Authentication → Settings → Authorized domains).";
    case "auth/invalid-api-key":
    case "auth/configuration-not-found":
      return "Firebase isn't configured correctly. Check the values in .env.local.";
    default:
      return "Something went wrong. Please try again.";
  }
}

/** Only allow redirects back into this app (blocks open-redirects like //evil.com). */
export function safeRedirect(target: string | null | undefined, fallback = "/"): string {
  if (!target || !target.startsWith("/") || target.startsWith("//") || target.startsWith("/\\")) {
    return fallback;
  }
  return target;
}
