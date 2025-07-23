import React, { useState } from 'react';
import { forgotPassword } from '../../services/authService';
import Loader from '../../components/common/Loader';
import MessageBox from '../../components/common/MessageBox';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const data = await forgotPassword(email);
      if (data.success) {
        setSuccess(data.message);
      } else {
        throw new Error('Failed to send password reset email.');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 flex justify-center">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 space-y-6">
          <h1 className="text-2xl font-bold text-center">Forgot Password</h1>

          {error && <MessageBox variant="error">{error}</MessageBox>}
          {success && <MessageBox variant="success">{success}</MessageBox>}

          {!success && (
            <>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-2.5 border rounded-lg"
                  placeholder="Enter your registered email"
                />
              </div>
              <button
                type="submit"
                className="w-full mt-4 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                disabled={loading}
              >
                {loading ? <Loader /> : 'Send Reset Link'}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
