import React from "react";
import bgWave from "../../assets/be-a-merchant-bg.png";
import parcelImage from "../../assets/location-merchant.png";

const SatisfactionSection = () => {
  return (
    <section
      className="rounded-2xl text-white p-10 md:p-20"
      data-aos="zoom-in-up"
      data-aos-easing="ease-out-cubic"
      data-aos-duration="2000"
      style={{
        backgroundColor: "#03373D",
        backgroundImage: `url(${bgWave})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "top center",

      }}
    >
      <div className="flex flex-col md:flex-row items-center justify-center gap-10">
        <div className="flex-1 space-y-6 lg:ml-30 lg:w-8/12">
          <h2 className="text-4xl md:text-4xl font-extrabold leading-snug">
            Merchant and Customer Satisfaction <br />
            is Our First Priority
          </h2>

          <p className="text-sm md:text-base text-gray-300 max-w-md">
            We offer the lowest delivery charges with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button className="btn bg-lime-400 text-black hover:bg-lime-500 font-semibold">
              Become a Merchant
            </button>
            <button className="btn btn-outline border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-black font-semibold">
              Earn with Profast Courier
            </button>
          </div>
        </div>

        <div className="lg:mr-30 flex justify-center">
          <img
            src={parcelImage}
            alt="Parcel Delivery Illustration"
            className="w-72 lg:w-[531px] h-auto lg:h-[300px] object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default SatisfactionSection;
