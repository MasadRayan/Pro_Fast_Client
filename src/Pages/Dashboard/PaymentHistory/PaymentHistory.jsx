import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loading from '../../../Components/Loading/Loading';
import { motion } from 'framer-motion';


const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()

    const { isPending, data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure(`/payments?email=${user.email}`)
            return res.data
        }
    })

    if (isPending) {
        return <Loading></Loading>
    }

    const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString() + " " + d.toLocaleTimeString();
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold mb-6 text-center"
            >
                Payment History
            </motion.h1>

            {payments.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center justify-center mt-20"
                >
                    
                    <p className="text-xl text-gray-500">You have no payment records yet.</p>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="overflow-x-auto rounded-xl shadow-xl bg-base-200 p-4"
                >
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Transaction ID</th>
                                <th>Amount (৳)</th>
                                <th>Status</th>
                                <th>Parcel ID</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment, idx) => (
                                <motion.tr
                                    key={payment.transactionId}
                                    whileHover={{ scale: 1.01 }}
                                    className="hover:bg-base-300 transition duration-200"
                                >
                                    <td>{idx + 1}</td>
                                    <td className="max-w-xs truncate">{payment.transactionId}</td>
                                    <td>{payment.amount}</td>
                                    <td>
                                        <span className="badge badge-success">{payment.status}</span>
                                    </td>
                                    <td className="max-w-xs truncate">{payment.parcelId}</td>
                                    <td>{formatDate(payment.createdAt)}</td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>
            )}
        </div>
    );
};

export default PaymentHistory;