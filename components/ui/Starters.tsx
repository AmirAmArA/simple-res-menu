import React from "react";
import SwiperComp from "../SwiperComp";
import Header from "./Header";

export default function Starters() {
  return (
    <div className="bg-gray-100 py-4  bg-opacity-5 shadow-md">
      <Header text="Starter Dishes" />
      <div>
        <SwiperComp />
      </div>
    </div>
  );
}
