import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiCreditCard, FiTruck, FiHash, FiMapPin, FiMap, FiCheckCircle, FiEye, FiMinusCircle } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Components/Loading/Loading';

const ActiveRiders = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedRider, setSelectedRider] = useState(null);

    const { isPending, data: riders = [], refetch } = useQuery({
        queryKey: ['active-riders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders/approved');
            return res.data;
        }
    });

    if (isPending) {
        return <Loading />;
    }

    const handleDeactivate = async (rider) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to deactivate rider "${rider.name}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444', // red-500
            cancelButtonColor: '#6b7280',  // gray-500
            confirmButtonText: 'Yes, deactivate!'
        });

        if (result.isConfirmed) {
            try {
                await axiosSecure.patch(`/riders/${rider._id}/deactivate`);
                Swal.fire({
                    icon: 'info',
                    title: 'Rider Deactivated!',
                    timer: 1500,
                    showConfirmButton: false
                });
                refetch();
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <>
            <motion.div
                className="max-w-6xl mx-auto p-6 bg-base-100 shadow-xl rounded-3xl overflow-x-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl font-bold text-center text-primary mb-6">Active Riders</h2>
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact</th>
                            <th>Bike</th>
                            <th>District</th>
                            <th>Status</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {riders.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="py-12 text-center">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="flex flex-col items-center space-y-4 text-gray-500"
                                    >
                                        <img src="https://illustrations.popsy.co/amber/shipping-box.svg" alt="No active riders" className="w-32" />
                                        <p className="text-lg font-semibold">No active riders at the moment</p>
                                        <p className="text-sm text-gray-400">Sit back and relax 🚀</p>
                                    </motion.div>
                                </td>
                            </tr>
                        ) : (
                            riders.map(rider => (
                                <tr key={rider._id} className="hover:bg-base-200 transition">
                                    <td>{rider.name}</td>
                                    <td>{rider.email}</td>
                                    <td>{rider.contact}</td>
                                    <td>{rider.bikeModel}</td>
                                    <td>{rider.district}</td>
                                    <td><span className="badge badge-success badge-outline">{rider.status}</span></td>
                                    <td>
                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={() => setSelectedRider(rider)}
                                                className="btn btn-xs btn-info flex items-center gap-1"
                                            >
                                                <FiEye /> View
                                            </button>
                                            <button
                                                onClick={() => handleDeactivate(rider)}
                                                className="btn btn-xs btn-warning flex items-center gap-1"
                                            >
                                                <FiMinusCircle /> Deactivate
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </motion.div>

            {/* Modal */}
            {selectedRider && (
                <dialog open className="modal modal-bottom sm:modal-middle">
                    <motion.div
                        className="modal-box rounded-3xl border border-primary/30 shadow-lg"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                        <h3 className="font-bold text-2xl mb-4 flex items-center gap-2 text-primary">
                            <FiUser /> Rider Details
                        </h3>

                        <div className="space-y-3">
                            <p className="flex items-center gap-2 hover:bg-base-200 p-2 rounded">
                                <FiUser className="text-primary" /> <strong>Name:</strong> {selectedRider.name}
                            </p>
                            <p className="flex items-center gap-2 hover:bg-base-200 p-2 rounded">
                                <FiMail className="text-primary" /> <strong>Email:</strong> {selectedRider.email}
                            </p>
                            <p className="flex items-center gap-2 hover:bg-base-200 p-2 rounded">
                                <FiPhone className="text-primary" /> <strong>Contact:</strong> {selectedRider.contact}
                            </p>
                            <p className="flex items-center gap-2 hover:bg-base-200 p-2 rounded">
                                <FiCreditCard className="text-primary" /> <strong>NID:</strong> {selectedRider.nid}
                            </p>
                            <p className="flex items-center gap-2 hover:bg-base-200 p-2 rounded">
                                <FiTruck className="text-primary" /> <strong>Bike Model:</strong> {selectedRider.bikeModel}
                            </p>
                            <p className="flex items-center gap-2 hover:bg-base-200 p-2 rounded">
                                <FiHash className="text-primary" /> <strong>Registration:</strong> {selectedRider.registrationNumber}
                            </p>
                            <p className="flex items-center gap-2 hover:bg-base-200 p-2 rounded">
                                <FiMapPin className="text-primary" /> <strong>District:</strong> {selectedRider.district}
                            </p>
                            <p className="flex items-center gap-2 hover:bg-base-200 p-2 rounded">
                                <FiMap className="text-primary" /> <strong>Region:</strong> {selectedRider.region}
                            </p>
                            <p className="flex items-center gap-2 hover:bg-base-200 p-2 rounded">
                                <FiCheckCircle className="text-primary" /> <strong>Status:</strong>
                                <span className="badge badge-success badge-outline">{selectedRider.status}</span>
                            </p>
                        </div>

                        <div className="modal-action">
                            <button
                                onClick={() => setSelectedRider(null)}
                                className="btn btn-outline btn-primary"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </dialog>
            )}
        </>
    );
};

export default ActiveRiders;
