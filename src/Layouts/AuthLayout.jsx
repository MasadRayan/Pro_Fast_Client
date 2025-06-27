import React from 'react';
import loginImage from '../assets/authImage.png';
import Logo from '../Components/Logo/Logo';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="w-full absolute top-6 left-0 flex justify-center lg:justify-start z-10 px-6">
                <Logo />
            </div>
            <div className="flex flex-1 flex-col-reverse lg:flex-row items-center justify-center lg:justify-between  w-full relative z-0 mt-25 md:mt-0">
                <div className="w-full lg:flex-1 flex justify-center items-center py-16">
                    <Outlet />
                </div>
                <div className=" lg:flex lg:flex-1 bg-[#FAFDF0] justify-center items-center lg:min-h-screen">
                    <div className="bg-[#FAFDF0] rounded-2xl flex items-center justify-center p-10">
                        <img
                            src={loginImage}
                            alt="Delivery illustration"
                            className=" w-full h-auto object-contain"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
