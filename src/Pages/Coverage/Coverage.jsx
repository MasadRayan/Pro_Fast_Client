import React from 'react';
import BangladeshMap from '../../Components/BangladeshMap/BangladeshMap';
import { ScrollRestoration, useLoaderData } from 'react-router';

const Coverage = () => {
    const outlets  = useLoaderData()

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-6">
                <h2 className="text-4xl font-extrabold">We are available in 64 districts</h2>
                <p className="text-gray-600  mt-2">Find delivery service in your area</p>
            </div>

            <div>

            </div>

            <div className="flex justify-center mb-6">
                <div className="w-full max-w-6xl">
                    <BangladeshMap outlets={outlets}></BangladeshMap>
                </div>
            </div>
            <ScrollRestoration></ScrollRestoration>
        </div>
    );
};

export default Coverage;