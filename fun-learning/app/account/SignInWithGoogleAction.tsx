"use client";

import { useRef } from "react";
import { CtaAction } from "@/components/CtaButton";

/**
 * A client-side CtaAction that POSTs to Auth.js's `/api/auth/signin/google`
 * endpoint. Wrapping the primary EmptyState action keeps `/account`'s
 * signed-out view to a single unified card (Design HIGH-D4).
 */
export function SignInWithGoogleAction() {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <>
      <form ref={formRef} action="/api/auth/signin/google" method="post" style={{ display: "none" }} />
      <CtaAction size="lg" onClick={() => formRef.current?.submit()}>
        Sign in with Google
      </CtaAction>
    </>
  );
}
