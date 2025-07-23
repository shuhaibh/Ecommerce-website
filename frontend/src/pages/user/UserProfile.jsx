import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { updateProfile } from '../../services/authService';
import Loader from '../../components/common/Loader';
import MessageBox from '../../components/common/MessageBox';

const UserProfile = () => {
  const { user, loadUser } = useAuth(); // Assuming loadUser is exposed from AuthContext to refresh state
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
      setAvatarPreview(user.avatar?.url);
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
    formData.set('name', name);
    formData.set('email', email);
    if (avatar) {
      formData.set('avatar', avatar);
    }

    try {
      const data = await updateProfile(formData);
      if (data.success) {
        setSuccess('Profile updated successfully!');
        // Reload user data in the context to reflect changes globally
        if (loadUser) {
          await loadUser();
        }
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred.');
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
          <h1 className="text-2xl font-bold text-center">My Profile</h1>

          {error && <MessageBox variant="error">{error}</MessageBox>}
          {success && <MessageBox variant="success">{success}</MessageBox>}

          <div className="flex justify-center">
            <div className="relative">
              <img src={avatarPreview} alt="Avatar" className="w-32 h-32 rounded-full object-cover border-4 border-gray-200" />
              <label htmlFor="avatar" className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700">
                ✏️
                <input type="file" id="avatar" className="hidden" accept="image/*" onChange={handleAvatarChange} />
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium">Full Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-2.5 border rounded-lg" />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">Email Address</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-2.5 border rounded-lg" />
          </div>

          <button type="submit" className="w-full mt-4 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400" disabled={loading}>
            {loading ? <Loader /> : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
