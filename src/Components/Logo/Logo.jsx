import React from 'react';
import logo from '../../assets/logo.png'
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to={'/'}>
            <div className='flex justify-center items-end'>
                <img src={logo} alt="" />
                <p className='text-3xl font-extrabold -ml-3 '>Profast</p>
            </div>
        </Link>
    );
};

export default Logo;