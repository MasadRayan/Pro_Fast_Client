import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import emptyBox from '../../../assets/empty-box.png'; // Optional illustration

const MyParcels = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['my-parcels', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        }
    });

    const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString() + " " + d.toLocaleTimeString();
    };

    const handleView = (parcel) => {
        alert(`Viewing details for ${parcel.parcelTitle}`);
    };

    const handlePay = (parcel) => {
        navigate(`/dashboard/payment/${parcel._id}`)
    };

    const handleDelete = async (parcel) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: `You are about to delete "${parcel.parcelTitle}"`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            try {
                axiosSecure.delete(`/parcels/${parcel._id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            Swal.fire({
                                icon: "success",
                                title: "Deleted",
                                text: "Parcel has been deleted",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                        refetch();
                    })
            } catch (err) {
                Swal.fire("Error", "Something went wrong while deleting.", "error");
            }
        }
    };

    return (
        <div className="p-6 max-w-11/12 w-full mx-auto">
            <motion.h1 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold mb-6 text-center"
            >
                My Parcels
            </motion.h1>

            {parcels.length === 0 ? (
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center justify-center mt-20"
                >
                    <img src={emptyBox} alt="No parcels" className="w-64 mb-6" />
                    <p className="text-xl text-gray-500">You have no parcels yet.</p>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="overflow-x-auto rounded-xl shadow-xl bg-base-200 p-4"
                >
                    <table className="table table-zebra w-full">
                        <thead className="text-base-content">
                            <tr>
                                <th>#</th>
                                <th>Parcel Title</th>
                                <th>Parcel Type</th>
                                <th>Created Date</th>
                                <th>Payment Status</th>
                                <th>Cost (৳)</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parcels.map((parcel, idx) => (
                                <motion.tr 
                                    key={parcel._id}
                                    whileHover={{ scale: 1.01 }}
                                    className="hover:bg-base-300 transition duration-200"
                                >
                                    <td>{idx + 1}</td>
                                    <td className="max-w-xs truncate whitespace-nowrap overflow-hidden ">
                                        {parcel.parcelTitle}
                                    </td>
                                    <td>{parcel.parcelType}</td>
                                    <td>{formatDate(parcel.createdAt)}</td>
                                    <td>
                                        {parcel.paymentStatus.toLowerCase() === "paid" ? (
                                            <span className="badge badge-success">Paid</span>
                                        ) : (
                                            <span className="badge badge-error">Unpaid</span>
                                        )}
                                    </td>
                                    <td>{parcel.totalPrice}</td>
                                    <td className="space-x-2">
                                        <button
                                            onClick={() => handleView(parcel)}
                                            className="btn btn-xs btn-info"
                                            type="button"
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() => handlePay(parcel)}
                                            className="btn btn-xs btn-primary"
                                            type="button"
                                            disabled={parcel.paymentStatus.toLowerCase() === "paid"}
                                        >
                                            Pay
                                        </button>
                                        <button
                                            onClick={() => handleDelete(parcel)}
                                            className="btn btn-xs btn-error"
                                            type="button"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>
            )}
        </div>
    );
};

export default MyParcels;
