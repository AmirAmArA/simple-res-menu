import React from "react";
import SwiperComp from "../SwiperComp";
import Header from "./Header";

export default function Main() {
  return (
    <div className="bg-gray-100 py-4 bg-opacity-5 shadow-md">
      <Header text="Main Dishes" />
      <div>
        <SwiperComp />
      </div>
    </div>
  );
}
