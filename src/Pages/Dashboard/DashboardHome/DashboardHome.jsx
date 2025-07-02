import { motion } from "framer-motion";
import { FiPackage, FiCreditCard, FiMapPin } from "react-icons/fi";
import { Link } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import lottieAnimation from '../../../assets/Lottie/Animation - 1751477939508.json'
import Lottie from "lottie-react";

const DashboardHome = () => {
    const { user } = useAuth()
    return (
        <div className="p-10 max-w-5xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-10"
            >
                <h1 className="text-4xl font-bold mb-3">Welcome {user.displayName} to Your Dashboard</h1>
                <p className="text-lg text-gray-500">Manage your parcels, track shipments and see your history.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-base-200 rounded-xl p-6 shadow-md text-center"
                >
                    <FiPackage className="text-5xl mx-auto mb-4 text-primary" />
                    <h2 className="text-xl font-bold mb-2">My Parcels</h2>
                    <p className="mb-4">View and manage all your parcels.</p>
                    <Link to="/dashboard/myParcels" className="btn btn-primary btn-sm">Go</Link>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-base-200 rounded-xl p-6 shadow-md text-center"
                >
                    <FiCreditCard className="text-5xl mx-auto mb-4 text-primary" />
                    <h2 className="text-xl font-bold mb-2">Payment History</h2>
                    <p className="mb-4">Check your past payments easily.</p>
                    <Link to="/dashboard/paymentHistory" className="btn btn-primary btn-sm">View</Link>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-base-200 rounded-xl p-6 shadow-md text-center"
                >
                    <FiMapPin className="text-5xl mx-auto mb-4 text-primary" />
                    <h2 className="text-xl font-bold mb-2">Track Parcel</h2>
                    <p className="mb-4">See real-time tracking of parcels.</p>
                    <Link to="/dashboard/track" className="btn btn-primary btn-sm">Track</Link>
                </motion.div>
            </div>
            <div className="mt-10">
                <Lottie animationData={lottieAnimation} loop={true}></Lottie>
            </div>
        </div>
    )
};

export default DashboardHome;
