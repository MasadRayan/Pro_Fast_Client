// components/CustomerReviewsSection.jsx

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import reviewimage from '../../assets/customer-top.png'
import coatImage from '../../assets/reviewQuote.png'
const reviews = [
  {
    id: 1,
    name: "Alice Johnson",
    designation: "Small Business Owner",
    comment: "The delivery was super fast and tracking was spot on. I’m impressed by the efficiency of the system."
  },
  {
    id: 2,
    name: "Brian Smith",
    designation: "E-commerce Seller",
    comment: "Smooth scheduling and real-time updates kept my customers happy. Best delivery service I’ve used."
  },
  {
    id: 3,
    name: "Catherine Lee",
    designation: "Online Boutique Owner",
    comment: "I love how easy it is to manage multiple orders. The UI is clean and everything works flawlessly."
  },
  {
    id: 4,
    name: "David Kim",
    designation: "Freelance Marketer",
    comment: "Reliable and fast delivery every time. The notification system is very helpful for planning."
  },
  {
    id: 5,
    name: "Eva Chen",
    designation: "Subscription Box Founder",
    comment: "Packages always arrive on time. Their customer support was quick to respond to my questions."
  },
  {
    id: 6,
    name: "Frank Gomez",
    designation: "Logistics Manager",
    comment: "I manage multiple deliveries daily and this system saves hours. Tracking is real-time and accurate."
  },
  {
    id: 7,
    name: "Grace Patel",
    designation: "Retail Shop Owner",
    comment: "Easy to book, easier to track. My customers are now happier than ever with fast delivery times."
  },
  {
    id: 8,
    name: "Henry Walker",
    designation: "Warehouse Supervisor",
    comment: "Reliable delivery routes and friendly drivers. I’ve seen huge improvements in turnaround time."
  },
  {
    id: 9,
    name: "Isla Raymond",
    designation: "Food Delivery Partner",
    comment: "Their routing system is smart and saves fuel. I get more deliveries done in less time."
  },
  {
    id: 10,
    name: "Jake Wilson",
    designation: "Pharmacy Owner",
    comment: "Medicines are delivered safely and on time. That means a lot to my business and my clients."
  },
  {
    id: 11,
    name: "Karen O’Neil",
    designation: "Flower Shop Owner",
    comment: "Fragile items always handled with care. Love the delivery feedback option for customers."
  },
  {
    id: 12,
    name: "Leo Martinez",
    designation: "Courier Service Agent",
    comment: "I’ve worked with many systems, but this one’s the most reliable and intuitive so far."
  },
  {
    id: 13,
    name: "Maria Rossi",
    designation: "Grocery Store Manager",
    comment: "Scheduling recurring deliveries is a breeze. The system helps avoid missed windows."
  },
  {
    id: 14,
    name: "Nathan Brown",
    designation: "Tech Product Distributor",
    comment: "Bulk order tracking is extremely simple. The delivery analytics feature is a big bonus."
  },
  {
    id: 15,
    name: "Olivia Green",
    designation: "Home Chef",
    comment: "I rely on them daily for ingredient deliveries. Never had a delay, even during peak hours!"
  }
];

export default function CustomerReviewsSection() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="py-16 text-center">
      <div className=" mx-auto px-4">
        <img src={reviewimage} alt="Delivery Icon" className="mx-auto mb-4 w-[245px] h-[100px]" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">What our customers are sayings</h2>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment,
          reduce pain, and strengthen your body with ease!
        </p>

        {/* Swiper */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={3}
            loop={true}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            centeredSlides={true}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 5 }
            }}
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                {({ isActive }) => (
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0.5 }}
                    animate={{
                      scale: isActive ? 1.05 : 0.95,
                      opacity: isActive ? 1 : 0.5
                    }}
                    transition={{ duration: 0.4 }}
                    className={`bg-white rounded-xl shadow-xl p-6 text-left h-full flex flex-col justify-between border border-gray-200 ${
                      isActive ? 'z-10' : ''
                    }`}
                  >
                    <img src={coatImage} alt="Quote Icon" className="w-8 h-8 mb-4 -opacity-100" />
                    <p className="text-gray-700 italic text-sm mb-6 leading-relaxed">
                      {review.comment}
                    </p>
                    <hr className="border-dotted border-t-2 border-gray-300 mb-4" />
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-[#03464D]"></div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">{review.name}</h4>
                        <span className="text-xs text-gray-500">{review.designation}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              ref={prevRef}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 hover:bg-gray-400 transition"
            >
              <FaArrowLeft className="text-white" />
            </button>
            <button
              ref={nextRef}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-green-400 hover:bg-green-500 transition"
            >
              <FaArrowRight className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
