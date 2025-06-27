import { div } from 'framer-motion/client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useAuth from '../../Hooks/useAuth';


const Register = () => {
    const { createUser, signInWithGoogle } = useAuth()


    const { register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const [showPass, setShowPass] = useState(false);

    const onSubmit = data => {
        const { email, password } = data;
        createUser(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorMessage = error.message;
               
            });

    }
    useEffect(() => {
        reset();
    }, []);

    const handleGoogleSignIn = () => {
        signInWithGoogle()
    }

    return (
        <div className='max-w-[384px]'>

            <h1 className="text-5xl font-extrabold max-w-[320px]">Create an Account</h1>
            <p className='my-3'>Register with Profast</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">

                    <label className="label">Email</label>
                    <input type="email" {...register('email', {
                        required: true
                    })} className="input" required placeholder="Email" />

                    {errors.email?.type === "required" && (
                        <p className='text-red-400'>Email is required</p>
                    )}

                    <label className="label">Password</label>
                    <div className='relative'>
                        <input
                            type={showPass ? 'text' : "password"}
                            className="input mb-2"
                            placeholder="Your password"
                            {...register("password", {
                                required: true,
                                minLength: 6,
                            },
                            )} />
                        <button onClick={() => setShowPass(!showPass)} type='button' className='btn btn-ghost btn-xs absolute top-2 right-2 '>
                            {
                                showPass ? <FaEyeSlash /> : <FaEye />
                            }
                        </button>
                    </div>
                    {errors.password?.type === "required" && (
                        <p className='text-red-400'>Password is required</p>
                    )}
                    {errors.password?.type === "minLength" && (
                        <p className='text-red-400'>Password must be at least 6 characters long</p>
                    )}

                    <button className="btn bg-[#CAEB66] text-white mt-4 ">Register</button>

                </fieldset>
            </form>
            <p className='my-5 '>Already have an account?<Link to={'/login'} className=' text-[#8FA748]'>Login</Link></p>
            <div className="divider">OR</div>
            <button onClick={handleGoogleSignIn} className="btn w-full bg-white text-black border-[#e5e5e5]">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                Register with Google
            </button>
        </div>

    );
};

export default Register;