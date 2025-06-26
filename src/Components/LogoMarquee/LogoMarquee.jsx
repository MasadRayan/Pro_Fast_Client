import React from 'react';
import Marquee from 'react-fast-marquee';

import logo1 from '../../assets/brands/amazon.png';
import logo2 from '../../assets/brands/amazon_vector.png';
import logo3 from '../../assets/brands/casio.png';
import logo4 from '../../assets/brands/moonstar.png';
import logo5 from '../../assets/brands/randstad.png';
import logo6 from '../../assets/brands/start.png';
import logo7 from '../../assets/brands/start-people 1.png';

const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];

const LogoMarquee = () => {
  return (
    <section className="bg-white py-20">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold ">
          We've helped thousands of sales teams
        </h2>
      </div>

      <Marquee speed={50} gradient={false}>
        {logos.map((logo, index) => (
          <div key={index} className="mx-14 flex items-center justify-center">
            <img src={logo} alt={`Logo ${index + 1}`} className="h-6 mt-5 object-contain  transition duration-300" />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default LogoMarquee;
