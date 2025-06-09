'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useOrderStore from '@/store/orderStore';
import useAuthStore from '@/store/authStore';
import Link from 'next/link';

export default function Page({ params }) {
  const { id: orderId } = params;
  const router = useRouter();
  const { order, getOrder, updateOrderStatus } = useOrderStore();
  const { token } = useAuthStore();
  
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    if (orderId) {
      getOrder(orderId, token);
    }
  }, [getOrder, orderId, token]);
  
  useEffect(() => {
    if (order) {
      setStatus(order.status);
    }
  }, [order]);

  const handleStatusChange = async () => {
    setLoading(true);
    setError('');
    
    try {
      await updateOrderStatus(orderId, status, token);
    } catch (err) {
      setError(err.message || 'Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Order Details</h1>
        <Link 
          href="/admin/orders"
          className="text-sm text-gray-600 hover:text-black"
        >
          &larr; Back to Orders
        </Link>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md mb-6">
          {error}
        </div>
      )}
      
      {order ? (
        <div className="space-y-8">
          {/* Order Summary */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Order Information</h3>
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Date:</strong> {formatDate(order.createdAt)}</p>
                <p><strong>Status:</strong> 
                  <span className={`ml-2 px-2 py-1 rounded text-xs ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Customer</h3>
                <p><strong>Name:</strong> {order.shippingAddress?.name || 'N/A'}</p>
                <p><strong>Email:</strong> {order.user?.email || 'N/A'}</p>
                <p><strong>Phone:</strong> {order.shippingAddress?.phone || 'N/A'}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Payment</h3>
                <p><strong>Method:</strong> {order.paymentMethod}</p>
                <p><strong>Status:</strong> 
                  <span className={`ml-2 px-2 py-1 rounded text-xs ${
                    order.isPaid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.isPaid ? 'Paid' : 'Pending'}
                  </span>
                </p>
                {order.isPaid && (
                  <p><strong>Paid At:</strong> {formatDate(order.paidAt)}</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Order Items */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <h3 className="text-lg font-medium p-6 border-b">Order Items</h3>
            <div className="divide-y">
              {order.orderItems?.map((item) => (
                <div key={item._id} className="p-6 flex items-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden mr-4">
                    {item.image && (
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-600">{item.quantity} x ₹{item.price.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{(item.quantity * item.price).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Order Totals */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Order Summary</h3>
            <div className="space-y-2 max-w-xs ml-auto">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{order.subtotal?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>₹{order.shipping?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>₹{order.tax?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-bold text-lg">
                <span>Total:</span>
                <span>₹{order.orderTotal?.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          {/* Shipping Address */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Shipping Address</h3>
            <p>{order.shippingAddress?.name}</p>
            <p>{order.shippingAddress?.address}</p>
            <p>
              {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.postalCode}
            </p>
            <p>{order.shippingAddress?.country}</p>
            <p className="mt-2">Phone: {order.shippingAddress?.phone}</p>
          </div>
          
          {/* Update Status */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Update Order Status</h3>
            <div className="flex items-center gap-4">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <button
                onClick={handleStatusChange}
                disabled={loading || status === order.status}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Updating...' : 'Update Status'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
      )}
    </div>
  );
}