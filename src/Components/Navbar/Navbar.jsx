import React, { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { FiMenu, FiX } from 'react-icons/fi';
import useAuth from '../../Hooks/useAuth';
import Logo from '../Logo/Logo';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

    const links = (
        <>
            <NavLink className='hover:bg-[#CAEB66] px-3 py-2 hover:rounded-lg block' to={'/'}>Home</NavLink>
            <NavLink className='hover:bg-[#CAEB66] px-3 py-2 hover:rounded-lg block' to={'/sendParcel'}>Send a Parcel</NavLink>
            <NavLink className='hover:bg-[#CAEB66] px-3 py-2 hover:rounded-lg block' to={'/coverage'}>Coverage</NavLink>
            {
                user && <>
                    <NavLink className='hover:bg-[#CAEB66] px-3 py-2 hover:rounded-lg block' to={'/dashboard'}>Dashboard</NavLink>
                </>
            }
            <NavLink className='hover:bg-[#CAEB66] px-3 py-2 hover:rounded-lg block' to={'/beARider'}>Be a Rider</NavLink>
            <NavLink className='hover:bg-[#CAEB66] px-3 py-2 hover:rounded-lg block' to={'/about'}>About Us</NavLink>
        </>
    );

    const handleLogOut = () => {
        logOut().catch((error) => console.error(error));
    };

    return (
        <div className="navbar mb-8 px-4">
            <div className="flex-1 flex items-center gap-2">
                <button className="lg:hidden text-2xl" onClick={toggleDrawer}>
                    {isDrawerOpen ? <FiX /> : <FiMenu />}
                </button>
                <Logo></Logo>
            </div>

            <div className="hidden lg:flex flex-1 justify-center">
                <ul className="menu menu-horizontal px-1 font-medium">
                    {links}
                </ul>
            </div>

            <div className="flex items-center gap-3">
                {user ? (
                    <div className="flex items-center gap-3">
                        <div className="relative group">
                            <img
                                className="w-10 h-10 object-cover rounded-full"
                                src={user.photoURL}
                                alt={user.displayName}
                                referrerPolicy="no-referrer"
                            />
                            <div className="absolute top-12 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white px-2 py-1 rounded shadow-md z-10">
                                {user.displayName}
                            </div>
                        </div>
                        <button onClick={handleLogOut} className="btn bg-[#CAEB66]">Log Out</button>
                    </div>
                ) : (
                    <div className="hidden md:flex gap-2">
                        <Link to="/login" className="btn bg-[#CAEB66]">Login</Link>
                        <Link to="/register" className="btn btn-outline btn-info">Register</Link>
                    </div>
                )}

                {!user && (
                    <div className="flex md:hidden">
                        <Link to="/login" className="btn bg-[#CAEB66]">Login</Link>
                    </div>
                )}
            </div>

            <div
                className={`fixed top-16 left-0 w-3/4 h-screen bg-base-300 z-50 shadow-lg px-6 py-4 flex flex-col gap-4 transform transition-transform duration-300 ease-in-out ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:hidden`}
            >
                {links}
            </div>
        </div>
    );
};

export default Navbar;