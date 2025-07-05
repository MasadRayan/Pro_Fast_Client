import React, { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FiSearch, FiShield, FiMail, FiUser, FiClock } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { useQuery, useMutation } from '@tanstack/react-query';

const MakeAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const [emailQuery, setEmailQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState(null); // for modal
    const [hasSearched, setHasSearched] = useState(false);

    // Search API - only run on button click
    const { data: users = [], isFetching, refetch } = useQuery({
        queryKey: ['find-user', emailQuery],
        enabled: false,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/search?email=${emailQuery}`);
            return res.data;
        },
        retry: false,
        onError: (err) => {
            Swal.fire('Error', err.response?.data?.error || 'User not found', 'error');
        }
    });

    // Role change API
    const mutation = useMutation({
        mutationFn: async ({ id, role }) =>
            await axiosSecure.patch(`/users/${id}/role`, { role }),
        onSuccess: (_, variables) => {
            Swal.fire('Success', `Role changed to ${variables.role}`, 'success');
            refetch();
            setSelectedUser(null); // close modal if open
        },
        onError: (err) => {
            Swal.fire('Error', err.response?.data?.error || 'Failed to change role', 'error');
        }
    });

    const handleSearch = () => {
        if (!emailQuery) return;
        setHasSearched(true);
        refetch();
    };

    const handleChangeRole = (id, currentRole) => {
        const newRole = currentRole === 'admin' ? 'user' : 'admin';

        Swal.fire({
            title: 'Are you sure?',
            text: `Change role to "${newRole}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3b82f6',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, change!'
        }).then(result => {
            if (result.isConfirmed) {
                mutation.mutate({ id, role: newRole });
            }
        });
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-base-100 shadow-xl rounded-3xl">
            <h2 className="text-3xl font-bold text-center text-primary mb-6">Make Admin</h2>

            <div className="flex gap-2 mb-6">
                <input
                    type="email"
                    placeholder="Enter user email"
                    className="input input-bordered w-full"
                    value={emailQuery}
                    onChange={(e) => setEmailQuery(e.target.value)}
                />
                <button
                    onClick={handleSearch}
                    className="btn btn-primary"
                    disabled={!emailQuery}
                >
                    <FiSearch /> {isFetching ? 'Searching...' : 'Search'}
                </button>
            </div>

            {users.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Created</th>
                                <th>Last Login</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>{user.displayName || 'N/A'}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span className={`badge 
                                            ${user.role === 'admin' ? 'badge-success' : 'badge-warning'}`}>
                                            {user.role}
                                        </span>
                                    </td>

                                    <td>{user.createdAt ? new Date(user.createdAt).toLocaleString() : 'N/A'}</td>
                                    <td>{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'N/A'}</td>
                                    <td className="flex justify-center gap-2">
                                        <button
                                            onClick={() => handleChangeRole(user._id, user.role)}
                                            className={`btn btn-sm ${user.role === 'admin' ? 'btn-warning' : 'btn-success'}`}
                                            disabled={mutation.isLoading}
                                        >
                                            {user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                                        </button>
                                        <button
                                            onClick={() => setSelectedUser(user)}
                                            className="btn btn-info btn-sm"
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                hasSearched && !isFetching && (
                    <p className="text-center mt-4 text-gray-500">No users found.</p>
                )
            )}

            {/* Modal for Viewing User Details */}
            {selectedUser && (
                <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
                    <div className="bg-base-100 rounded-xl shadow-lg max-w-md w-full p-6 relative">
                        <button
                            onClick={() => setSelectedUser(null)}
                            className="btn btn-sm btn-circle absolute top-3 right-3"
                        >
                            ✕
                        </button>
                        <h3 className="text-2xl font-semibold mb-4">User Details</h3>
                        <div className="flex flex-col space-y-3">
                            <div className="flex items-center gap-2"><FiUser className="text-primary" /> <strong>Name:</strong> {selectedUser.displayName || 'N/A'}</div>
                            <div className="flex items-center gap-2"><FiMail className="text-primary" /> <strong>Email:</strong> {selectedUser.email}</div>
                            <div className="flex items-center gap-2"><FiShield className="text-primary" /> <strong>Role:</strong> <span className="badge badge-outline">{selectedUser.role}</span></div>
                            <div className="flex items-center gap-2"><FiClock className="text-primary" /> <strong>Created:</strong> {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleString() : 'N/A'}</div>
                            <div className="flex items-center gap-2"><FiClock className="text-primary" /> <strong>Last Login:</strong> {selectedUser.lastLogin ? new Date(selectedUser.lastLogin).toLocaleString() : 'N/A'}</div>
                        </div>

                        <div className="flex gap-2 mt-6 justify-end">
                            <button
                                onClick={() => handleChangeRole(selectedUser._id, selectedUser.role)}
                                className={`btn btn-sm ${selectedUser.role === 'admin' ? 'btn-warning' : 'btn-success'}`}
                                disabled={mutation.isLoading}
                            >
                                {selectedUser.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MakeAdmin;
