import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { updateProfile } from '../../services/authService';
import Loader from '../../components/common/Loader';
import MessageBox from '../../components/common/MessageBox';

const UserProfile = () => {
  const { user, loadUser } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      // Corrected to use 'profileImage' from your user model
      setAvatarPreview(user.profileImage); 
    }
  }, [user]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    if (avatar) {
      // --- THIS IS THE KEY FIX ---
      // Changed 'avatar' to 'profileImage' to match the backend route
      formData.append('profileImage', avatar);
    }

    try {
      // Assuming your updateProfile service is correctly configured
      const data = await updateProfile(formData); 
      
      // Check for the response structure from your controller
      if (data && data.data) {
        setSuccess('Profile updated successfully!');
        if (loadUser) {
          await loadUser();
        }
      } else {
        throw new Error(data.message || 'Failed to update profile');
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center">
      <div className="w-full max-w-lg">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 space-y-6">
          <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">My Profile</h1>

          {error && <MessageBox variant="error">{error}</MessageBox>}
          {success && <MessageBox variant="success">{success}</MessageBox>}

          <div className="flex justify-center">
            <div className="relative">
              <img src={avatarPreview} alt="Avatar" className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 dark:border-gray-600" />
              <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700">
                ✏️
                <input type="file" id="avatar-upload" className="hidden" accept="image/*" onChange={handleAvatarChange} />
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Full Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-2.5 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email Address</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-2.5 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          </div>

          <button type="submit" className="w-full mt-4 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400" disabled={loading}>
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
