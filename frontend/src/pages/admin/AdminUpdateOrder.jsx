import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderDetails, updateOrderStatus } from '../../services/adminService';
import Loader from '../../components/common/Loader';
import MessageBox from '../../components/common/MessageBox';

const AdminUpdateOrder = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(true);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const data = await getOrderDetails(orderId);
                setOrder(data);
                setStatus(data.orderStatus);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch order details.');
            } finally {
                setLoading(false);
            }
        };
        fetchOrderDetails();
    }, [orderId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdateLoading(true);
        try {
            const { message } = await updateOrderStatus(orderId, { status });
            setSuccess(message || 'Order status updated successfully!');
            setTimeout(() => navigate('/admin/orders'), 1500);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update order.');
        } finally {
            setUpdateLoading(false);
        }
    };

    if (loading) return <Loader />;
    if (error && !order) return <MessageBox variant="error">{error}</MessageBox>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">Update Order</h1>
            <p className="text-sm text-gray-500 mb-8">ID: {order?._id}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Order Items</h3>
                    <div className="space-y-4">
                        {order?.orderItems.map(item => (
                            <div key={item._id} className="flex items-center justify-between border-b dark:border-gray-700 pb-2">
                                <span className="text-gray-800 dark:text-gray-200">{item.name}</span>
                                <span className="text-gray-600 dark:text-gray-400">{item.quantity} x ${item.price.toFixed(2)}</span>
                            </div>
                        ))}
                         <div className="flex items-center justify-between pt-4 font-bold">
                            <span className="text-gray-800 dark:text-white">Total</span>
                            <span className="text-gray-800 dark:text-white">${order?.totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4">Customer & Shipping</h3>
                        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                            <p><strong>User:</strong> {order?.user_id?.name}</p>
                            <p><strong>Email:</strong> {order?.user_id?.email}</p>
                            <p><strong>Address:</strong> {`${order?.shippingInfo.address}, ${order?.shippingInfo.city}, ${order?.shippingInfo.postalCode}`}</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
                        <h3 className="text-xl font-semibold">Change Order Status</h3>
                        {error && <MessageBox variant="error">{error}</MessageBox>}
                        {success && <MessageBox variant="success">{success}</MessageBox>}

                        <div>
                            <label htmlFor="status" className="block mb-2 text-sm font-medium">Status</label>
                            <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} className="w-full p-2.5 border rounded-lg dark:bg-gray-900 dark:border-gray-600">
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                        <button type="submit" className="w-full py-2.5 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50" disabled={updateLoading}>
                            {updateLoading ? 'Updating...' : 'Update Status'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminUpdateOrder;