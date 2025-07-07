import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';

const PendingDelivery = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const { user } = useAuth()

    // Fetch all parcels for this rider
    const { data: parcels = [], isLoading } = useQuery({
        queryKey: ['pendingDeliveries', user?.email], // add email to queryKey for caching
        enabled: !!user?.email,  // fix the typo here
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/rider?riderEmail=${user.email}`);
            return res.data;
        }
    });

    // Mutation to update parcel deliveryStatus
    const updateParcelStatus = useMutation({
        mutationFn: async ({ parcelId, deliveryStatus }) => {
            return await axiosSecure.patch(`/parcels/${parcelId}/update`, { deliveryStatus });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['pendingDeliveries']);
        }
    });

    const handleStatusChange = (parcel, newStatus) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Change status to ${newStatus} for "${parcel.parcelTitle}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#22c55e',
            cancelButtonColor: '#6b7280',
            confirmButtonText: `Yes, change`
        }).then((result) => {
            if (result.isConfirmed) {
                updateParcelStatus.mutate({ parcelId: parcel._id, deliveryStatus: newStatus });
            }
        });
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold mb-6 text-center"
            >
                Pending Deliveries
            </motion.h2>

            {isLoading ? (
                <p className="text-center text-lg">Loading...</p>
            ) : parcels.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center text-gray-500 mt-20"
                >
                    <p>No pending deliveries found.</p>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="overflow-x-auto rounded-xl shadow-xl bg-base-200 p-4"
                >
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Parcel Title</th>
                                <th>Sender</th>
                                <th>Receiver</th>
                                <th>Delivery Status</th>
                                <th>Price (৳)</th>
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
                                    <td className="max-w-xs truncate">{parcel.parcelTitle}</td>
                                    <td>
                                        <div>
                                            <div className="font-bold">{parcel.senderName}</div>
                                            <div className="text-sm opacity-70">{parcel.senderRegion}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <div className="font-bold">{parcel.receiverName}</div>
                                            <div className="text-sm opacity-70">{parcel.receiverRegion}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`badge ${parcel.deliveryStatus === 'in_transit' ? 'badge-info' : 'badge-warning'}`}>
                                            {parcel.deliveryStatus}
                                        </span>
                                    </td>
                                    <td>{parcel.totalPrice}</td>
                                    <td className="space-x-2">
                                        {parcel.deliveryStatus === "rider_assigned" && (
                                            <button
                                                onClick={() => handleStatusChange(parcel, "in_transit")}
                                                className="btn py-10 lg:py-0 btn-primary"
                                            >
                                                Mark as Picked Up
                                            </button>
                                        )}
                                        {parcel.deliveryStatus === "in_transit" && (
                                            <button
                                                onClick={() => handleStatusChange(parcel, "Delivered")}
                                                className="btn btn-success"
                                            >
                                                Mark as Delivered
                                            </button>
                                        )}
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

export default PendingDelivery;
