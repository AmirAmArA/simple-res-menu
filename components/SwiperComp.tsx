"use client";
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import MenuItem from "./MenuItem";
import "./animiation.css";

const menuItems = [
  // Your menu items data here
  {
    title: "Shoes!",
    description: "If a dog chews shoes whose shoes does he choose?",
    imageUrl:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
  },
  {
    title: "Shoes!",
    description: "If a dog chews shoes whose shoes does he choose?",
    imageUrl:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
  },
  {
    title: "Shoes!",
    description: "If a dog chews shoes whose shoes does he choose?",
    imageUrl:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
  },
  {
    title: "Shoes!",
    description: "If a dog chews shoes whose shoes does he choose?",
    imageUrl:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
  },
  {
    title: "Shoes!",
    description: "If a dog chews shoes whose shoes does he choose?",
    imageUrl:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
  },
];

export default function SwiperComp() {
  useEffect(() => {
    const swiperContainer = document.querySelectorAll(".swiper-wrapper");
    swiperContainer &&
      swiperContainer.forEach((slide) => {
        slide.classList.add("swiper-container");
        slide.classList.add("swiper-init");
      });
  }, []);

  return (
    <div>
      <Swiper spaceBetween={50} slidesPerView={2}>
        {menuItems.map((item, index) => (
          <SwiperSlide key={index}>
            <MenuItem {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
