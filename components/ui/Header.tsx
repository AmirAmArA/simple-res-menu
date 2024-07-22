import React from "react";

interface HeaderProps {
  text: string;
}

export default function Header({ text }: HeaderProps) {
    
  return (
    <div className="mb-4">
      <h2 className="mx-4 text-3xl font-bold text-white-800">{text}</h2>
    </div>
  );
}
