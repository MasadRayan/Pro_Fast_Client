import React from 'react';
import Banner from '../../Components/Banner/Banner';
import HowItWorks from '../../Components/HowItWorks/HowItWorks';
import OurServices from '../../Components/OurServices/OurServices';
import LogoMarquee from '../../Components/LogoMarquee/LogoMarquee';

const Home = () => {
    return (
        <div className='my-10'>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <LogoMarquee></LogoMarquee>
        </div>
    );
};

export default Home;