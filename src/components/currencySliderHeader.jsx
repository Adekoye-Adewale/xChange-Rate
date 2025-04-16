'use client'
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { getExchangeRates } from '@/lib/getExchangeRates';

export default function CurrencySliderHeader() {
        return (
                <div className='bg-amber-500 py-2 px-2'>
                        <Slider/>
                </div>
        )
}

const currencyMap = {
        eur: 'EUR',
        gbp: 'GBP',
        ngn: 'NGN',
        jpy: 'JPY',
        cny: 'CNY',
        cad: 'CAD',
        aud: 'AUD',
        chf: 'CHF',
        inr: 'INR',
        zar: 'ZAR',
};

const Slider = () => {
        const [rates, setRates] = useState({});

        useEffect(() => {
                async function fetchRates() {
                        const data = await getExchangeRates();
                        setRates(data);
                }
                fetchRates();
        }, []);

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
                        className="swiper-transition cursor-default text-white text-sm font-medium"
                >
                        {Object.entries(rates).map(([code, value]) => (
                                <SwiperSlide key={code}>
                                        1 {currencyMap[code]} = {value.toFixed(2)} USD
                                </SwiperSlide>
                        ))}
                </Swiper>
        );
};