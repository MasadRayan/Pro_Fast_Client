import React from 'react';
import { Link, NavLink, Outlet, ScrollRestoration } from 'react-router';
import Logo from '../Components/Logo/Logo';
import { FiHome, FiBox, FiCreditCard, FiMapPin, FiUser } from 'react-icons/fi';


const DashboardLayout = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col ">
                {/* Navbar */}
                <div className="navbar bg-base-300 w-full lg:hidden">
                    <div className="flex-none ">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
                </div>
                {/* Page content here */}
                <Outlet></Outlet>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 shadow-lg rounded-r-2xl space-y-2">
                    {/* Logo */}
                    <div className='flex items-center justify-center mb-8'>
                        <Logo />
                    </div>

                    <li>
                        <NavLink
                            to={'/'}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors duration-200 hover:bg-base-300 ${isActive ? 'bg-base-300 text-primary' : ''
                                }`
                            }
                        >
                            <FiHome className="text-xl" /> Home
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to={'/dashboard/myParcels'}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors duration-200 hover:bg-base-300 ${isActive ? 'bg-base-300 text-primary' : ''
                                }`
                            }
                        >
                            <FiBox className="text-xl" /> My Parcels
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to={'/dashboard/paymentHistory'}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors duration-200 hover:bg-base-300 ${isActive ? 'bg-base-300 text-primary' : ''
                                }`
                            }
                        >
                            <FiCreditCard className="text-xl" /> Payment History
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to={'/dashboard/track'}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors duration-200 hover:bg-base-300 ${isActive ? 'bg-base-300 text-primary' : ''
                                }`
                            }
                        >
                            <FiMapPin className="text-xl" /> Track My Parcels
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to={'/dashboard/profile'}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors duration-200 hover:bg-base-300 ${isActive ? 'bg-base-300 text-primary' : ''
                                }`
                            }
                        >
                            <FiUser className="text-xl" /> Update Profile
                        </NavLink>
                    </li>
                </ul>
            </div>
            <ScrollRestoration></ScrollRestoration>
        </div>
    );
};

export default DashboardLayout;