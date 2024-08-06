"use client";
import React from "react";

type Props = {
  text: string;
  func: (a?: any) => void;
  className?: string;
  disabled?: boolean | undefined;
};

function Button({ func, text, className, disabled }: Props) {
  return (
    <button disabled={disabled} className={className} onClick={() => func()}>
      {text}
    </button>
  );
}

export default Button;
