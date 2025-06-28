import React from 'react';
import Banner from '../../Components/Banner/Banner';
import HowItWorks from '../../Components/HowItWorks/HowItWorks';
import OurServices from '../../Components/OurServices/OurServices';
import LogoMarquee from '../../Components/LogoMarquee/LogoMarquee';
import FeatureSection from '../../Components/FeatureSection/FeatureSection';
import SatisfactionSection from '../../Components/SatisfactionSection/SatisfactionSection';
import ReviewsSection from '../../Components/ReviewsSection/ReviewsSection';
import { ScrollRestoration } from 'react-router';

const Home = () => {
    return (
        <div className='my-10'>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <LogoMarquee></LogoMarquee>
            <FeatureSection></FeatureSection>
            <SatisfactionSection></SatisfactionSection>
            <ReviewsSection></ReviewsSection>
            <ScrollRestoration></ScrollRestoration>
        </div>
    );
};

export default Home;