"use client";
import React from "react";

type Props = {
  text: string;
  func: () => void;
};

function Button({ func, text }: Props) {
  return (
    <div>
      <button onClick={() => func()}>{text}</button>
    </div>
  );
}

export default Button;
