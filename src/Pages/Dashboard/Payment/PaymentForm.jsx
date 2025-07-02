import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loading from '../../../Components/Loading/Loading';
import { FiPackage, FiMapPin, FiTruck } from "react-icons/fi";
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';

const PaymentForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('')
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()
    const navigate = useNavigate()

    const { data: parcelInfo = {}, isPending } = useQuery({
        queryKey: ['parcels', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${id}`);
            return res.data
        }
    })
    if (isPending) {
        return <Loading></Loading>
    }

    const amount = parcelInfo.totalPrice;
    const amountInCents = amount * 100;


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (!card) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card
        })

        if (error) {
            setError(error.message)
        }
        else {
            setError('')
            console.log(paymentMethod);
        }

        // create payment intent
        const res = await axiosSecure.post('/create-payment-intent', {
            amountInCents,
            id
        })
        console.log('res from intent', res);

        const clientSecret = res.data.clientSecret


        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: user.displayName,
                    email: user.email
                },
            },
        });
        if (result.error) {
            setError(result.error.message);
        } else {
            setError('')
            if (result.paymentIntent.status === 'succeeded') {
                // step 4 mark aprcel paid and make a payment history
                const paymentData = {
                    parcelId: id,
                    email: user.email,
                    amount,
                    transactionId: result.paymentIntent.id

                }

                const paymenrRes = await axiosSecure.post('/payments', paymentData);
                if (paymenrRes.data.insertedId) {
                    Swal.fire({
                        title: 'Payment Successful!',
                        html: `
                        <div class="text-center">
                            <p><strong>Transaction ID:</strong></p>
                            <p class="text-green-600">${result.paymentIntent.id}</p>
                        </div>
                    `,
                        icon: 'success',
                        confirmButtonText: 'Go to My Parcels',
                        customClass: {
                            popup: 'rounded-xl'
                        }
                    }).then(() => {
                        navigate('/dashboard/myParcels');
                    });
                }
            }
        }

    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 space-y-6 p-4">

            {/* Parcel summary */}
            <div className="max-w-md w-full bg-white rounded-2xl shadow-md p-6 space-y-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <FiPackage className="text-green-600" /> {parcelInfo.parcelTitle}
                </h2>
                <p className="text-gray-600 flex items-center gap-2">
                    <FiMapPin className="text-blue-500" />
                    {parcelInfo.senderRegion} ➔ {parcelInfo.receiverRegion}
                </p>
                <p className="text-sm text-gray-500">
                    Tracking ID: <span className="font-semibold">{parcelInfo.trackingId}</span>
                </p>
                <p className="text-sm text-gray-500">
                    Delivery Note: {parcelInfo.deliveryInstruction}
                </p>
                <div className="flex justify-between pt-2 border-t">
                    <span className="font-medium">Total:</span>
                    <span className="font-bold text-lg text-green-600">৳{parcelInfo.totalPrice}</span>
                </div>
            </div>

            {/* Payment form */}
            <form onSubmit={handleSubmit} className="max-w-md w-full p-6 bg-white rounded-2xl shadow-lg space-y-6">
                <div className="border border-gray-300 rounded-xl p-4 focus-within:ring-2 focus-within:ring-primary">
                    <CardElement className="p-2 rounded" />
                </div>
                <button type="submit" disabled={!stripe} className="btn border-0 text-black bg-[#CAEB66] w-full">
                    Pay ৳{amount}
                </button>
                {error && (
                    <div className="text-red-500 text-sm mt-2">
                        {error}
                    </div>
                )}
            </form>
        </div>
    );
};

export default PaymentForm;