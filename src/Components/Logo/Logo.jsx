import React from 'react';
import logo from '../../assets/logo.png'

const Logo = () => {
    return (
        <div className='flex justify-center items-end'>
            <img src={logo} alt="" />
            <p className='text-3xl font-extrabold -ml-3 '>Profast</p>
        </div>
    );
};

export default Logo;