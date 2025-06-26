import React from 'react';
import banner1 from '../../assets/banner/banner1.png'
import banner2 from '../../assets/banner/banner2.png'
import banner3 from '../../assets/banner/banner3.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';


const Banner = () => {
    return (
        <div className="relative">
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={{
                    nextEl: '.custom-next',
                    prevEl: '.custom-prev',
                }}
                modules={[Pagination, Navigation, Autoplay]}
                className="mySwiper"
            >
                {/* Slides */}
                <SwiperSlide>
                    <img src={banner1} className="w-full h-[300px] lg:h-full px-2 md:px-0" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={banner2} className="w-full h-[300px] lg:h-full px-2 md:px-0" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={banner3} className="w-full h-[300px] lg:h-full px-2 md:px-0" />
                </SwiperSlide>
            </Swiper>

            {/* Custom buttons */}
            <button className="custom-prev absolute left-4 top-1/2 z-10 transform -translate-y-1/2  ">
                <FaArrowLeft size={24} />
            </button>
            <button className="custom-next absolute right-4 top-1/2 z-10 transform -translate-y-1/2 ">
                <FaArrowRight size={24}/>
            </button>
        </div>

    );
};

export default Banner;