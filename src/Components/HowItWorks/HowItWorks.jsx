import {
  FaTruckPickup,
  FaMoneyBillWave,
  FaWarehouse,
  FaBuilding
} from 'react-icons/fa';
import React from 'react';

const howItWorksData = [
  {
    title: 'Booking Pick & Drop',
    description: 'From personal packages to business shipments — we deliver on time, every time.',
    icon: <FaTruckPickup className="text-4xl  mb-4" />,
  },
  {
    title: 'Cash On Delivery',
    description: 'From personal packages to business shipments — we deliver on time, every time.',
    icon: <FaMoneyBillWave className="text-4xl  mb-4" />,
  },
  {
    title: 'Delivery Hub',
    description: 'From personal packages to business shipments — we deliver on time, every time.',
    icon: <FaWarehouse className="text-4xl  mb-4" />,
  },
  {
    title: 'Booking SME & Corporate',
    description: 'From personal packages to business shipments — we deliver on time, every time.',
    icon: <FaBuilding className="text-4xl  mb-4" />,
  },
];

const HowItWorks = () => {
  return (
    <section className=" my-10 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">How it Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorksData.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              {item.icon}
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
