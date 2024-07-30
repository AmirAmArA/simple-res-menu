"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

type Props = {};

function LoginForm({}: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const params = useSearchParams();

  const tmpCBU = params.get("callbackUrl");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: tmpCBU
          ? tmpCBU
          : `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/dashboard`,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
