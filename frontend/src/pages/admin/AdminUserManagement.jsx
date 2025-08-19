import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllUsers, deleteUser } from '../../services/userService';
import Loader from '../../components/common/Loader';
import MessageBox from '../../components/common/MessageBox';

const AdminUserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const fetchAllUsers = async () => {
        setLoading(true);
        try {
            const data = await getAllUsers();
            setUsers(data);
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred while fetching users.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            try {
                const { message } = await deleteUser(id);
                setSuccess(message || 'User deleted successfully.');
                setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to delete user.');
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
                Manage All Users
            </h1>

            {loading && <Loader />}
            {error && <MessageBox variant="error">{error}</MessageBox>}
            {success && <MessageBox variant="success">{success}</MessageBox>}
            
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-700 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">User ID</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-700 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Name</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-700 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Email</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-700 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Role</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-700"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                <td className="px-5 py-5 border-b border-gray-200 dark:border-gray-700 text-sm">
                                    <p className="text-gray-900 dark:text-white whitespace-no-wrap">{user._id}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 dark:border-gray-700 text-sm">
                                    <p className="text-gray-900 dark:text-white whitespace-no-wrap">{user.name}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 dark:border-gray-700 text-sm">
                                    <p className="text-gray-900 dark:text-white whitespace-no-wrap">{user.email}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 dark:border-gray-700 text-sm">
                                    <span className={`capitalize ${user.role === 'admin' ? 'font-semibold text-red-600' : 'text-gray-900 dark:text-white'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 dark:border-gray-700 text-sm text-right space-x-4">
                                    <Link to={`/admin/user/${user._id}`} className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 font-semibold">Edit</Link>
                                    <button onClick={() => handleDelete(user._id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 font-semibold">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {!loading && users.length === 0 && (
                    <div className="text-center py-10">
                        <p className="text-gray-500">No users found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminUserManagement;