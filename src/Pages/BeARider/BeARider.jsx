import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import riderImage from '../../assets/agent-pending.png';
import { ScrollRestoration, useLoaderData } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2'
import useAxiosSecure from '../../Hooks/useAxiosSecure';


const BeARider = () => {
    const warehouseData = useLoaderData();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()

    const getUnique = (data, key) => [...new Set(data.map(item => item[key]))];
    const { register,reset, handleSubmit, watch, setValue, formState: { errors } } = useForm();


    // Get all unique regions
    const regions = getUnique(warehouseData, 'region');

    // Watch the selected region from the form
    const selectedRegion = watch('region');

    // Filter districts by selected region
    const filteredDistricts = selectedRegion
        ? getUnique(warehouseData.filter(item => item.region === selectedRegion), 'district')
        : [];

    // Reset district when region changes
    useEffect(() => {
        setValue('district', '');
    }, [selectedRegion, setValue]);


    const onSubmit = async (data) => {
        const riderData = {
            ...data,
            name: user?.displayName || '',
            email: user?.email || '',
            status: 'pending',
            createdAt: new Date().toISOString(),
        }
        // console.log("Submitted rider form data:", formData);

        const riderPost = await axiosSecure.post('/riders', riderData)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Application Submitted!',
                        text: 'You have successfully applied for a rider post.',
                        timer: 2000, // closes after 2 sec
                        timerProgressBar: true,
                        showConfirmButton: false,
                    });
                }
            })


        // Show success alert


        // optionally reset form
        reset();

    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 shadow-2xl rounded-3xl my-5">
            <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                {/* LEFT CONTENT */}
                <div className="flex-1">
                    <h1 className="text-4xl font-bold mb-4 text-[#0B3C49]">Be a Rider</h1>
                    <p className="mb-8 text-lg text-gray-600 max-w-xl">
                        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                        From personal packages to business shipments — we deliver on time, every time.
                    </p>

                    <h2 className="text-2xl font-semibold mb-6 text-[#0B3C49]">Tell us about yourself</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1 text-sm font-medium">Your Name</label>
                                <input {...register("name", { required: "Name is required" })}
                                    defaultValue={user.displayName}
                                    placeholder="Your Name"
                                    className="input input-bordered w-full" />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-medium">Your age</label>
                                <input type="number" {...register("age", { required: "Age is required" })}
                                    placeholder="Your age"
                                    className="input input-bordered w-full" />
                                {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>}
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-medium">Your Email</label>
                                <input type="email" defaultValue={user.email}
                                    {...register("email", { required: "Email is required" })}
                                    placeholder="Your Email"
                                    className="input input-bordered w-full" />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-medium">Your District</label>
                                <select {...register("district", { required: "District is required" })}
                                    className="select select-bordered w-full">
                                    <option value="">Select your district</option>
                                    {filteredDistricts.map((district, index) => (
                                        <option key={index} value={district}>{district}</option>
                                    ))}
                                </select>
                                {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district.message}</p>}
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-medium">NID No</label>
                                <input {...register("nid", { required: "NID is required" })}
                                    placeholder="NID"
                                    className="input input-bordered w-full" />
                                {errors.nid && <p className="text-red-500 text-sm mt-1">{errors.nid.message}</p>}
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-medium">Contact</label>
                                <input {...register("contact", { required: "Contact is required" })}
                                    placeholder="Contact"
                                    className="input input-bordered w-full" />
                                {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact.message}</p>}
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-medium">Bike Model</label>
                                <input {...register("bikeModel", { required: "Bike Model is required" })}
                                    placeholder="Bike Model"
                                    className="input input-bordered w-full" />
                                {errors.bikeModel && <p className="text-red-500 text-sm mt-1">{errors.bikeModel.message}</p>}
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-medium">Registration Number</label>
                                <input {...register("registrationNumber", { required: "Registration Number is required" })}
                                    placeholder="Registration Number"
                                    className="input input-bordered w-full" />
                                {errors.registrationNumber && <p className="text-red-500 text-sm mt-1">{errors.registrationNumber.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium">Your Region</label>
                            <select {...register("region", { required: "Region is required" })}
                                className="select select-bordered w-full">
                                <option value="">Select your region</option>
                                {regions.map(region => (
                                    <option key={region} value={region}>{region}</option>
                                ))}
                            </select>
                            {errors.region && <p className="text-red-500 text-sm mt-1">{errors.region.message}</p>}
                        </div>

                        <button type="submit"
                            className="btn w-full mt-2 bg-lime-400 hover:bg-lime-500 text-black">
                            Submit
                        </button>
                    </form>
                </div>

                {/* RIGHT IMAGE */}
                <div className="flex-1">
                    <img src={riderImage} alt="rider" className="w-full max-w-md mx-auto" />
                </div>
            </div>
            <ScrollRestoration />
        </div>
    );
};

export default BeARider;
