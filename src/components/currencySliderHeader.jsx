'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export default function CurrencySliderHeader() {
        return (
                <div className='bg-amber-500 py-2 px-2'>
                        <Slider/>
                </div>
        )
}


const Slider = () => {
        return (
                <Swiper
                        spaceBetween={20}
                        slidesPerView={8}
                        speed={5000}
                        loop={true}
                        autoplay={{
                                delay: 0,
                                disableOnInteraction: true,
                                pauseOnMouseEnter: true,
                        }}
                        modules={[Autoplay]}
                        breakpoints={{
                                10: {
                                        slidesPerView: 4,
                                        spaceBetween: 10,
                                },
                                520: {
                                        slidesPerView: 5,
                                        spaceBetween: 20,
                                },
                                800: {
                                        slidesPerView: 6,
                                        spaceBetween: 30,
                                },
                                1200: {
                                        slidesPerView: 8,
                                        spaceBetween: 40,
                                },
                        }}
                        className='swiper-transition cursor-default'
                >
                        <SwiperSlide>Slide 1</SwiperSlide>
                        <SwiperSlide>Slide 2</SwiperSlide>
                        <SwiperSlide>Slide 3</SwiperSlide>
                        <SwiperSlide>Slide 4</SwiperSlide>
                        <SwiperSlide>Slide 5</SwiperSlide>
                        <SwiperSlide>Slide 6</SwiperSlide>
                        <SwiperSlide>Slide 7</SwiperSlide>
                        <SwiperSlide>Slide 8</SwiperSlide>
                        <SwiperSlide>Slide 9</SwiperSlide>
                        <SwiperSlide>Slide 10</SwiperSlide>
                </Swiper>
        );
};