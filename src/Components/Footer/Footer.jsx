import React from 'react';
import Logo from '../Logo/Logo';
import { FaLinkedinIn, FaXTwitter, FaFacebookF, FaYoutube } from 'react-icons/fa6';
import { NavLink } from 'react-router';
import useAuth from '../../Hooks/useAuth';

const Footer = () => {
  const {user} = useAuth()
  return (
    <footer className="w-full flex justify-center bg-neutral rounded-3xl mb-5 py-10">
      <div className="w-[90vw] max-w-[1200px] rounded-2xl bg-neutral text-neutral-content px-8 py-10 flex flex-col items-center shadow-lg">
        {/* Logo and Brand */}
        <div className="flex flex-col items-center mb-5">
          <Logo className="mb-5" />
          <p className="max-w-xl text-center text-base font-normal mt-5 opacity-80">
            Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-8 my-6">
          <NavLink to={'/'} className="hover:text-primary transition">Home</NavLink>
          <NavLink className='hover:text-primary transition' to={'/sendParcel'}>Send a Parcel</NavLink>
          <NavLink to={'/coverage'} className="hover:text-primary transition">Coverage</NavLink>
          {
            user && <>
            <NavLink to={'/dashboard'} className="hover:text-primary transition">Dashboard</NavLink>
            </>
          }
          <NavLink to={'/'} className="hover:text-primary transition">About Us</NavLink>
          <NavLink to={'/'} className="hover:text-primary transition">Pricing</NavLink>
          <NavLink to={'/'} className="hover:text-primary transition">Blog</NavLink>
          <NavLink to={'/'} className="hover:text-primary transition">Contact</NavLink>
        </nav>

        <div className="flex gap-4 my-2">
          <a href="#" aria-label="LinkedIn" className="bg-neutral-800 rounded-full p-2 hover:bg-primary transition">
            <FaLinkedinIn size={22} />
          </a>
          <a href="#" aria-label="X" className="bg-neutral-800 rounded-full p-2 hover:bg-primary transition">
            <FaXTwitter size={22} />
          </a>
          <a href="#" aria-label="Facebook" className="bg-neutral-800 rounded-full p-2 hover:bg-primary transition">
            <FaFacebookF size={22} />
          </a>
          <a href="#" aria-label="YouTube" className="bg-neutral-800 rounded-full p-2 hover:bg-primary transition">
            <FaYoutube size={22} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
