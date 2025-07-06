import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { FaMotorcycle, FaCheckCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

export default function AssignRider() {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedParcel, setSelectedParcel] = useState(null);

  // 📌 Fetch parcels needing assignment
  const { data: parcels = [], isLoading: parcelsLoading, error } = useQuery({
    queryKey: ['assignRiderParcels'],
    queryFn: async () => {
      const res = await axiosSecure.get('/parcels', {
        params: {
          paymentStatus: 'Paid',
          deliveryStatus: 'Not Delivered',
        },
      });
      return res.data;
    },
  });

  // 📌 Fetch approved riders
  const { data: riders = [], isLoading: ridersLoading } = useQuery({
    queryKey: ['approvedRiders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders/approved');
      return res.data;
    }
  });

  // 📌 Mutations
  const riderMutation = useMutation({
    mutationFn: ({ riderId, workStatus }) =>
      axiosSecure.patch(`/riders/${riderId}/work-status`, { workStatus }),
    onSuccess: () => {
      queryClient.invalidateQueries(['approvedRiders']);
    }
  });

  const parcelMutation = useMutation({
    mutationFn: ({ parcelId, deliveryStatus }) =>
      axiosSecure.patch(`/parcels/${parcelId}/delivery-status`, { deliveryStatus }),
    onSuccess: () => {
      queryClient.invalidateQueries(['assignRiderParcels']);
    }
  });

  // 📌 Derived matching riders
  const matchingRiders = selectedParcel 
    ? riders.filter(r => r.district.toLowerCase() === selectedParcel.senderServiceCenter.toLowerCase())
    : [];

  // 📌 Click handlers
  const handleAssignClick = (parcel) => {
    setSelectedParcel(parcel);
    document.getElementById('assignModal').showModal();
  };

  const handleAssignToRider = (rider) => {
    riderMutation.mutate(
      { riderId: rider._id, workStatus: 'in-delivery' },
      {
        onSuccess: () => {
          parcelMutation.mutate(
            { parcelId: selectedParcel._id, deliveryStatus: 'in-transit' },
            {
              onSuccess: () => {
                Swal.fire('Success', `Assigned ${rider.name} to "${selectedParcel.parcelTitle}"`, 'success');
                setSelectedParcel(null);
                document.getElementById('assignModal').close();
              },
              onError: () => {
                Swal.fire('Error', 'Failed to update parcel status', 'error');
              }
            }
          );
        },
        onError: () => {
          Swal.fire('Error', 'Failed to update rider status', 'error');
        }
      }
    );
  };

  if (parcelsLoading) return <p className="p-4 text-center">Loading parcels...</p>;
  if (error) return <p className="p-4 text-center text-red-500">Error loading parcels</p>;

  return (
    <motion.div 
      className="p-6 max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Parcels to Assign Rider</h2>

      {parcels.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center mt-20"
        >
          <FaMotorcycle className="text-7xl text-gray-400 mb-4 animate-pulse" />
          <p className="text-xl text-gray-500">No parcels pending delivery.</p>
        </motion.div>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-xl bg-base-200">
          <table className="table w-full table-zebra">
            <thead className="bg-base-300 text-base-content">
              <tr>
                <th>#</th>
                <th>Tracking ID</th>
                <th>Title</th>
                <th>Sender</th>
                <th>Service Center</th>
                <th>Cost (৳)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, idx) => (
                <motion.tr
                  key={parcel._id}
                  whileHover={{ scale: 1.02 }}
                  className="hover:bg-base-300 transition duration-300"
                >
                  <td>{idx + 1}</td>
                  <td className="font-mono">{parcel.trackingId}</td>
                  <td className="max-w-xs truncate">{parcel.parcelTitle}</td>
                  <td>{parcel.senderName}</td>
                  <td>{parcel.senderServiceCenter}</td>
                  <td>৳{parcel.totalPrice}</td>
                  <td>
                    <button
                      onClick={() => handleAssignClick(parcel)}
                      className="btn btn-sm btn-success flex items-center gap-2"
                    >
                      <FaCheckCircle /> Assign
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL */}
      <dialog id="assignModal" className="modal">
        <div className="modal-box w-full max-w-4xl">
          <h3 className="font-bold text-lg mb-4">
            Assign Rider for "{selectedParcel?.parcelTitle}"
          </h3>

          {ridersLoading ? (
            <p>Loading riders...</p>
          ) : matchingRiders.length === 0 ? (
            <p className="text-red-500">
              No riders found in {selectedParcel?.senderServiceCenter}.
            </p>
          ) : (
            <div className="overflow-x-auto rounded-xl shadow bg-base-200">
              <table className="table w-full table-zebra">
                <thead className="bg-base-300 text-base-content">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>District</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {matchingRiders.map((rider, idx) => (
                    <motion.tr
                      key={rider._id}
                      whileHover={{ scale: 1.01 }}
                      className="hover:bg-base-300 transition duration-200"
                    >
                      <td>{idx + 1}</td>
                      <td>{rider.name}</td>
                      <td>{rider.contact}</td>
                      <td>
                        <span className="badge badge-info badge-outline">
                          {rider.district}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => handleAssignToRider(rider)}
                          className="btn btn-xs btn-primary flex items-center gap-1"
                        >
                          <FaCheckCircle /> Assign
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </motion.div>
  );
}
