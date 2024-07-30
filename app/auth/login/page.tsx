"use client";
import React, { Suspense } from "react";
import LoginForm from "@/components/ui/admin/login/LoginForm";
export default function LogInPage() {
  return (
    <>
      <div>Log In Page</div>
      <div>
        <h1>Login</h1>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </>
  );
}
