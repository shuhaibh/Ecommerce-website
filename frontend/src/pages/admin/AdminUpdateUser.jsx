import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserDetails, updateUser } from '../../services/userService';
import MessageBox from '../../components/common/MessageBox';
import Loader from '../../components/common/Loader';

const AdminUpdateUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  const { id: userId } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { success, user } = await getUserDetails(userId);
        if (success) {
          setName(user.name);
          setEmail(user.email);
          setRole(user.role);
        } else {
          throw new Error('User not found');
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.set('name', name);
    formData.set('email', email);
    formData.set('role', role);

    try {
      const data = await updateUser(userId, formData);
      if (data.success) {
        setSuccess('User updated successfully!');
        setTimeout(() => navigate('/admin/users'), 2000);
      } else {
        throw new Error('Failed to update user');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center">
      <div className="w-full max-w-lg">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 space-y-6">
          <h1 className="text-2xl font-bold text-center">Update User Role</h1>

          {error && <MessageBox variant="error">{error}</MessageBox>}
          {success && <MessageBox variant="success">{success}</MessageBox>}

          <div>
            <label className="block mb-2 text-sm font-medium">User Name</label>
            <input type="text" value={name} readOnly className="w-full p-2.5 border rounded-lg bg-gray-100 dark:bg-gray-700 cursor-not-allowed" />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Email</label>
            <input type="email" value={email} readOnly className="w-full p-2.5 border rounded-lg bg-gray-100 dark:bg-gray-700 cursor-not-allowed" />
          </div>
          <div>
            <label htmlFor="role" className="block mb-2 text-sm font-medium">Role</label>
            <select id="role" value={role} onChange={(e) => setRole(e.target.value)} required className="w-full p-2.5 border rounded-lg bg-white">
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="w-full mt-4 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400" disabled={updateLoading}>
            {updateLoading ? <Loader /> : 'Update Role'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminUpdateUser;
