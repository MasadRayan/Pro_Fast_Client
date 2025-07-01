import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useAuth from '../../Hooks/useAuth';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { FaCheckCircle, FaMoneyBillWave, FaEdit } from "react-icons/fa";
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const generateTrackingId = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `TRK-${timestamp}-${random}`;
};

const SendParcel = () => {
  const serviceCenter = useLoaderData();
  const MySwal = withReactContent(Swal);
  const axiosSecure = useAxiosSecure()

  // Helper function to get unique values by key
  const getUnique = (data, key) => [...new Set(data.map(item => item[key]))];
  const { user } = useAuth()

  const { register, watch, setValue, handleSubmit, formState: { errors } } = useForm();

  const parcelType = watch('parcelType', 'document');

  const activeWarehouses = serviceCenter.filter(w => w.status === 'active');
  const uniqueRegions = getUnique(activeWarehouses, 'region');

  // Watch regions for sender & receiver
  const senderRegion = watch('senderRegion');
  const receiverRegion = watch('receiverRegion');

  // Cities filtered by selected region for sender & receiver
  const senderCities = senderRegion
    ? getUnique(activeWarehouses.filter(w => w.region === senderRegion), 'city')
    : [];

  const receiverCities = receiverRegion
    ? getUnique(activeWarehouses.filter(w => w.region === receiverRegion), 'city')
    : [];

  // When region changes, clear city & service center selections
  useEffect(() => {
    setValue('senderCity', '');
    setValue('senderServiceCenter', '');
  }, [senderRegion, setValue]);

  useEffect(() => {
    setValue('receiverCity', '');
    setValue('receiverServiceCenter', '');
  }, [receiverRegion, setValue]);


  const onSubmit = (data) => {
    data.email = user.email;
    data.createdAt = new Date().toISOString();
    data.trackingStatus = "Pending Pickup";
    data.paymentStatus = "Pending";

    let cost = 0;
    let baseCost = 0;
    let extraWeightCharge = 0;
    let outsideDistrictExtra = 0;
    const isSameRegion = data.senderRegion === data.receiverRegion;
    const weight = parseFloat(data.weight) || 0;

    if (data.parcelType === 'document') {
      baseCost = isSameRegion ? 60 : 80;
      cost = baseCost;
    } else {
      if (weight <= 3) {
        baseCost = isSameRegion ? 110 : 150;
        cost = baseCost;
      } else {
        const extraKg = weight - 3;
        extraWeightCharge = extraKg * 40;
        baseCost = isSameRegion ? 110 : 150;
        outsideDistrictExtra = isSameRegion ? 0 : 40;
        cost = baseCost + extraWeightCharge + outsideDistrictExtra;
      }
    }

    data.totalPrice = cost;
    delete data.senderCity;
    delete data.receiverCity;
    delete data.senderServiceCenter;
    delete data.receiverServiceCenter;
    data.trackingId = generateTrackingId();

    MySwal.fire({
      title: <span className="flex items-center gap-2 text-green-600"><FaCheckCircle /> Booking Successful!</span>,
      html: (
        <div className="text-left space-y-2">
          <p>📦 <strong>Parcel Type:</strong> {data.parcelType}</p>
          <p>⚖️ <strong>Weight:</strong> {data.parcelType === 'document' ? 'Any' : `${weight} kg`}</p>
          <p>📍 <strong>Region:</strong> {isSameRegion ? 'Within District' : 'Outside District'}</p>
          <hr />
          <p>💰 <strong>Base Charge:</strong> ৳{baseCost}</p>
          {extraWeightCharge > 0 && (
            <p>➕ <strong>Extra Weight:</strong> ৳{extraWeightCharge} ({(weight - 3).toFixed(2)} kg × ৳40)</p>
          )}
          {outsideDistrictExtra > 0 && (
            <p>🚚 <strong>Outside District Charge:</strong> ৳{outsideDistrictExtra}</p>
          )}
          <hr />
          <h3 className="text-green-600 text-xl font-bold flex items-center gap-2">
            <FaMoneyBillWave /> Total: ৳{cost}
          </h3>
        </div>
      ),
      showCancelButton: true,
      confirmButtonText: <span className="flex items-center gap-2"><FaMoneyBillWave /> Proceed to Payment</span>,
      cancelButtonText: <span className="flex items-center gap-2"><FaEdit /> Edit</span>,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post('/parcels', data)
          .then(res => {
            if(res.data.insertedId){
              // redirect to the payment page
            }
          })
          .catch(err => {
            console.error("Error saving parcel:", err);
          });
      } else {
        console.log('Back to editing...');
      }
    });
  };



  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Add Parcel</h1>
      <p className="mb-6 text-lg font-medium">Enter your parcel details</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">

        {/* Parcel Info */}
        <div>
          <div className="flex items-center gap-4 mb-4">
            <label className="label cursor-pointer">
              <span className="label-text mr-2">Document</span>
              <input
                type="radio"
                value="Document"
                {...register("parcelType", { required: true })}
                className="radio checked:bg-[#CAEB66]"
                defaultChecked
              />
            </label>
            <label className="label cursor-pointer">
              <span className="label-text mr-2">Not-Document</span>
              <input
                type="radio"
                value="Non-Document"
                {...register("parcelType")}
                className="radio checked:bg-[#CAEB66]"
              />
            </label>
          </div>

          <input
            type="text"
            placeholder="Parcel Name"
            {...register("parcelTitle", { required: "Parcel name is required" })}
            className="input input-bordered w-full mb-4"
          />
          {parcelType === 'Non-Document' && (
            <input
              type="number"
              step="0.1"
              placeholder="Parcel Weight (KG)"
              {...register("weight")}
              className="input input-bordered w-full"
            />
          )}
        </div>

        <div className='flex flex-col md:flex-row gap-5'>

          {/* Sender Info */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-4">Sender Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="label"><span className="label-text">Sender Name</span></label>
                <input
                  type="text"
                  placeholder="Sender Name"
                  {...register('senderName', { required: true })}
                  className="input input-bordered w-full"
                  defaultValue={user.displayName}
                  readOnly
                />
              </div>

              <div>
                <label className="label"><span className="label-text">Sender Pickup Wire house (City)</span></label>
                <select
                  {...register('senderServiceCenter', { required: "Please select sender pickup city" })}
                  className="select select-bordered w-full"
                  defaultValue=""
                >
                  <option value="" disabled>Select Pickup Wire house</option>
                  {senderCities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                {errors.senderServiceCenter && <p className="text-red-500 text-sm mt-1">{errors.senderServiceCenter.message}</p>}
              </div>

              <div>
                <label className="label"><span className="label-text">Address</span></label>
                <input
                  type="text"
                  placeholder="Address"
                  {...register('senderAddress', { required: "Sender address is required" })}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="label"><span className="label-text">Sender Contact No</span></label>
                <input
                  type="text"
                  placeholder="Sender Contact No"
                  {...register('senderContact', { required: "Sender contact is required" })}
                  className="input input-bordered w-full"
                />
              </div>

            </div>

            <div className='mt-4'>
              <label className="label"><span className="label-text">Sender Region</span></label>
              <select
                {...register('senderRegion', { required: "Please select sender region" })}
                className="select select-bordered w-full"
                defaultValue=""
              >
                <option value="" disabled>Select Sender Region</option>
                {uniqueRegions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
              {errors.senderRegion && <p className="text-red-500 text-sm mt-1">{errors.senderRegion.message}</p>}
            </div>

            <div className="mt-4">
              <label className="label"><span className="label-text">Pickup Instruction</span></label>
              <textarea
                placeholder="Pickup Instruction"
                {...register('pickupInstruction', { required: "Pickup instruction is required" })}
                className="textarea textarea-bordered w-full"
              />
            </div>
          </div>

          {/* Receiver Info */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-4">Receiver Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="label"><span className="label-text">Receiver Name</span></label>
                <input
                  type="text"
                  placeholder="Receiver Name"
                  {...register('receiverName', { required: "Receiver name is required" })}
                  className="input input-bordered w-full"
                />
              </div>


              <div>
                <label className="label"><span className="label-text">Receiver Delivery Wire house (City)</span></label>
                <select
                  {...register('receiverServiceCenter', { required: "Please select receiver delivery city" })}
                  className="select select-bordered w-full"
                  defaultValue=""
                >
                  <option value="" disabled>Select Delivery Wire house</option>
                  {receiverCities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                {errors.receiverServiceCenter && <p className="text-red-500 text-sm mt-1">{errors.receiverServiceCenter.message}</p>}
              </div>

              <div>
                <label className="label"><span className="label-text">Receiver Address</span></label>
                <input
                  type="text"
                  placeholder="Address"
                  {...register('receiverAddress', { required: "Receiver address is required" })}
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label"><span className="label-text">Receiver Contact No</span></label>
                <input
                  type="text"
                  placeholder="Receiver Contact No"
                  {...register('receiverContact', { required: "Receiver contact is required" })}
                  className="input input-bordered w-full"
                />
              </div>

            </div>

            <div className='mt-4'>
              <label className="label"><span className="label-text">Receiver Region</span></label>
              <select
                {...register('receiverRegion', { required: "Please select receiver region" })}
                className="select select-bordered w-full"
                defaultValue=""
              >
                <option value="" disabled>Select Receiver Region</option>
                {uniqueRegions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
              {errors.receiverRegion && <p className="text-red-500 text-sm mt-1">{errors.receiverRegion.message}</p>}
            </div>


            <div className="mt-4">
              <label className="label"><span className="label-text">Delivery Instruction</span></label>
              <textarea
                placeholder="Delivery Instruction"
                {...register('deliveryInstruction', { required: "Delivery instruction is required" })}
                className="textarea textarea-bordered w-full"
              />
            </div>
          </div>

        </div>

        {/* Other parcel fields remain as is */}

        <p className="text-sm text-gray-500 mt-2">* PickUp Time 4pm-7pm Approx.</p>
        <button type="submit" className="btn bg-[#CAEB66] text-black ">
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
