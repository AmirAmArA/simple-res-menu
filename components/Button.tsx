"use client";
import React from "react";

type Props = {
  text: string;
  func: (a?: any) => void;
  className?: string;
};

function Button({ func, text, className }: Props) {
  return (
    <button className={className} onClick={() => func()}>
      {text}
    </button>
  );
}

export default Button;
