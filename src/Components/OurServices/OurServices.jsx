import React from 'react';
import {
    FaShippingFast,
    FaMapMarkedAlt,
    FaWarehouse,
    FaMoneyCheckAlt,
    FaBriefcase,
    FaUndoAlt
} from 'react-icons/fa';

const services = [
    {
        title: "Express & Standard Delivery",
        description:
            "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
        icon: <FaShippingFast className="text-4xl text-white" />
    },
    {
        title: "Nationwide Delivery",
        description:
            "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
        icon: <FaMapMarkedAlt className="text-4xl text-white" />
    },
    {
        title: "Fulfillment Solution",
        description:
            "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
        icon: <FaWarehouse className="text-4xl text-white" />
    },
    {
        title: "Cash on Home Delivery",
        description:
            "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
        icon: <FaMoneyCheckAlt className="text-4xl text-white" />
    },
    {
        title: "Corporate Service / Contract In Logistics",
        description:
            "Customized corporate services which includes warehouse and inventory management support.",
        icon: <FaBriefcase className="text-4xl text-white" />
    },
    {
        title: "Parcel Return",
        description:
            "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
        icon: <FaUndoAlt className="text-4xl text-white" />
    }
];

const OurServices = () => {
    return (
        <section className="bg-[#03373D] py-16 lg:px-8 rounded-3xl">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Our Services</h2>
                <p className="text-white max-w-2xl mx-auto mb-10">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-white hover:bg-[#CAEB66] hover:text-black p-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md"
                        >
                            <div className="bg-primary  w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300">
                                {service.icon}
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                            <p className="text-sm">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurServices;
