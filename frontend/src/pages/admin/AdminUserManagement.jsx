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
      if (data.success) {
        setUsers(data.users);
      } else {
        throw new Error('Could not fetch users');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const { success, message } = await deleteUser(id);
        if (success) {
          setSuccess(message || 'User deleted successfully.');
          fetchAllUsers(); // Refresh the list
        } else {
          throw new Error('Failed to delete user.');
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'An error occurred.');
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
              <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase">User ID</th>
              <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase">Name</th>
              <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase">Email</th>
              <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase">Role</th>
              <th className="px-5 py-3 border-b-2"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-5 py-5 border-b text-sm">{user._id}</td>
                <td className="px-5 py-5 border-b text-sm">{user.name}</td>
                <td className="px-5 py-5 border-b text-sm">{user.email}</td>
                <td className="px-5 py-5 border-b text-sm">
                  <span className={`capitalize ${user.role === 'admin' ? 'font-semibold text-red-600' : ''}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-5 py-5 border-b text-sm text-right space-x-2">
                  <Link to={`/admin/user/${user._id}`} className="text-blue-600 hover:underline">Edit</Link>
                  <button onClick={() => handleDelete(user._id)} className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUserManagement;
