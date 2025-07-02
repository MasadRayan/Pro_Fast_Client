import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query'
import Swal from 'sweetalert2';
import { Navigate, useNavigate } from 'react-router';


const MyParcels = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const naviagte = useNavigate();

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['my-parcels', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data
        }
    })
    console.log(parcels);

    const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString() + " " + d.toLocaleTimeString();
    };

    const handleView = (parcel) => {
        alert(`Viewing details for ${parcel.parcelTitle}`);
    };

    const handlePay = (parcel) => {
        console.log(parcel._id);
        naviagte(`/dashboard/payment/${parcel._id}`)
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
                        refetch()
                    })
            } catch (err) {
                Swal.fire("Error", "Something went wrong while deleting.", "error");
            }
        }
    };


    return (
        <div className="p-4 overflow-x-auto">
            <table className="table table-zebra w-full">
                <thead>
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
                    {parcels.length === 0 && (
                        <tr>
                            <td colSpan={5} className="text-center py-4">
                                No parcels found.
                            </td>
                        </tr>
                    )}
                    {parcels.map((parcel, idx) => (
                        <tr key={parcel._id}>
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyParcels;