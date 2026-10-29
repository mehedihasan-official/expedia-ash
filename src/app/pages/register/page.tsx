import AuthPage from "@/components/auth/AuthPage";
import { Suspense } from "react";

// AuthPage reads the callbackUrl query param via useSearchParams(), which
// needs a Suspense boundary during Next.js's static rendering pass.
export default function Page() {
  return (
    <Suspense fallback={null}>
      <AuthPage mode="register" />
    </Suspense>
  );
}
