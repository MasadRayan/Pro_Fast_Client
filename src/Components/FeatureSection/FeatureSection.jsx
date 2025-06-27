import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaMapMarkedAlt, FaBoxOpen, FaHeadset } from "react-icons/fa";
import image1 from '../../assets/live-tracking.png'
import image2 from '../../assets/safe-delivery.png'
import image3 from '../../assets/safe-delivery.png'

const FeatureSection = () => {



    const features = [
        {
            id: 1,
            icon: <FaMapMarkedAlt className="text-4xl text-primary" />,
            image: image1,
            title: "Live Parcel Tracking",
            description:
                "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
        },
        {
            id: 2,
            icon: <FaBoxOpen className="text-4xl text-success" />,
            image: image2,
            title: "100% Safe Delivery",
            description:
                "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
        },
        {
            id: 3,
            icon: <FaHeadset className="text-4xl text-info" />,
            image: image3,
            title: "24/7 Call Center Support",
            description:
                "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
        },
    ];

    return (
        <div className="space-y-10 pb-10 pt-10 md:pt-20 border-t-2 border-dashed border-[#03464D] px-4 md:px-10 ">
            {features.map((feature) => (
                <div
                    key={feature.id}
                    className="flex flex-col md:flex-row items-center bg-base-100 shadow-md p-6 rounded-2xl gap-8"
                    data-aos="fade-up"
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="2000"
                >
                    <div className="w-full mb-5 md:mb-0 md:w-[200px] md:h-[200px] flex justify-center">
                        <img
                            src={feature.image}
                            alt={feature.title}
                            className="w-64 h-auto object-contain"
                        />
                    </div>

                    <div className="hidden md:block border-l-2 border-dotted border-neutral h-40 mx-4"></div>

                    <div className="w-full">
                        <div className="flex items-center gap-2 mb-2">{feature.icon}<h3 className="text-xl font-bold">{feature.title}</h3></div>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FeatureSection;
