"use client";
import React from "react";
import Button from "@/components/Button";
import { signOut } from "next-auth/react";
type Props = {};

function SignOut({}: Props) {
  const signOutServer = () => {
    signOut({
      callbackUrl: `${window.location.origin}/auth/login`,
    });
  };
  return (
    <div>
      <Button text="Sign Out" func={signOutServer} />
    </div>
  );
}

export default SignOut;
