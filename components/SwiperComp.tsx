'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import MenuItem from './MenuItem';
import styles from './Sample.module.css'
export default function SwiperComp() {
  return (
    <div>
      <Swiper
        spaceBetween={50}
        slidesPerView={2}

      >
        <SwiperSlide>
          <MenuItem />
        </SwiperSlide>
        <SwiperSlide>
          <MenuItem />
        </SwiperSlide>
        <SwiperSlide>
          <MenuItem />
        </SwiperSlide>
        <SwiperSlide>
          <MenuItem />
        </SwiperSlide>
        <SwiperSlide>
          <MenuItem />
        </SwiperSlide>
        <SwiperSlide>
          <MenuItem />
        </SwiperSlide>
      </Swiper>

    </div>
  )
}
