"use client";
import React from "react";
import Image from "next/image";
import Logo from "../assets/logoipsum-288.svg"; // Correct path to the SVG file

const MyComponent = () => (
  <div>
    <Image src={Logo} alt={""} />
  </div>
);

export default MyComponent;
