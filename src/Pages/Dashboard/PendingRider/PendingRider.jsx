import React, { useEffect, useState } from 'react';
import { FiUser, FiMail, FiPhone, FiCreditCard, FiTruck, FiHash, FiMapPin, FiMap, FiCheckCircle, FiXCircle, FiEye } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Components/Loading/Loading';


const PendingRider = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedRider, setSelectedRider] = useState(null);



    const { isPending, data: riders = [], refetch } = useQuery({
        queryKey: ['pending-riders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders/pending');
            return res.data
        }
    })

    if (isPending) {
        return <Loading></Loading>
    }

    const handleStatusChange = async (rider, status) => {
        const email = rider.email;  // grab it directly from the rider object
        console.log("Will update rider status. Email:", email);

        let confirmText = '';
        let confirmButtonColor = '';
        let confirmButtonText = '';

        if (status === 'approved') {
            confirmText = `Do you want to approve rider "${rider.name}"?`;
            confirmButtonColor = '#22c55e';
            confirmButtonText = 'Yes, approve!';
        } else if (status === 'rejected') {
            confirmText = `Do you want to reject and remove rider "${rider.name}"?`;
            confirmButtonColor = '#ef4444';
            confirmButtonText = 'Yes, reject!';
        } else {
            confirmText = `Do you want to update rider "${rider.name}" to status "${status}"?`;
            confirmButtonColor = '#3b82f6';
            confirmButtonText = 'Yes, update!';
        }

        const result = await Swal.fire({
            title: 'Are you sure?',
            text: confirmText,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor,
            cancelButtonColor: '#6b7280',
            confirmButtonText
        });

        if (result.isConfirmed) {
            try {
                await axiosSecure.patch(`/riders/${rider._id}/status`, { status, email });
                Swal.fire({
                    icon: 'success',
                    title: `Rider ${status.charAt(0).toUpperCase() + status.slice(1)}!`,
                    timer: 1500,
                    showConfirmButton: false
                });
                refetch();
            } catch (err) {
                console.error(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to update status',
                    text: err.response?.data?.message || err.message
                });
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
                <h2 className="text-3xl font-bold text-center text-primary mb-6">Pending Riders</h2>
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
                                <td colSpan="7" className="py-8 text-center text-gray-500">No pending riders found</td>
                            </tr>
                        ) : (
                            riders.map(rider => (
                                <tr key={rider._id} className="hover:bg-base-200 transition">
                                    <td>{rider.name}</td>
                                    <td>{rider.email}</td>
                                    <td>{rider.contact}</td>
                                    <td>{rider.bikeModel}</td>
                                    <td>{rider.district}</td>
                                    <td><span className="badge badge-warning badge-outline">{rider.status}</span></td>
                                    <td>
                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={() => handleStatusChange(rider, 'approved')}
                                                className="btn btn-xs btn-success flex items-center gap-1"
                                            >
                                                <FiCheckCircle /> Approve
                                            </button>

                                            <button
                                                onClick={() => handleStatusChange(rider, 'rejected')}
                                                className="btn btn-xs btn-error flex items-center gap-1"
                                            >
                                                <FiXCircle /> Reject
                                            </button>
                                            <button
                                                onClick={() => setSelectedRider(rider)}
                                                className="btn btn-xs btn-info flex items-center gap-1"
                                            >
                                                <FiEye /> View
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
                                <span className="badge badge-warning badge-outline">{selectedRider.status}</span>
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

export default PendingRider;
