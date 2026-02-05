import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, CheckCircle } from 'lucide-react';
import { useUser } from '../App';

const Orders = () => {
    const navigate = useNavigate();
    const { orders } = useUser();

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
                    <button onClick={() => navigate('/marketplace')} className="mr-4 p-2 hover:bg-gray-100 rounded-full">
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800">My Orders</h1>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8">
                {orders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-20 text-center">
                        <div className="bg-gray-100 p-6 rounded-full mb-4">
                            <Package className="w-12 h-12 text-gray-400" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">No orders yet</h2>
                        <p className="text-gray-500 mb-6">Go ahead and explore our properties.</p>
                        <button onClick={() => navigate('/marketplace')} className="bg-brand text-white px-6 py-2 rounded shadow font-bold">
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4 max-w-4xl mx-auto">
                        {orders.map((order, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex gap-4 hover:shadow-md transition-shadow"
                            >
                                <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden">
                                    <img src={order.image} alt={order.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-semibold text-gray-800">{order.title}</h3>
                                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center gap-1 font-bold">
                                            <CheckCircle className="w-3 h-3" /> PAID
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">Order ID: #{order.orderId}</p>
                                    <p className="text-sm text-gray-500">Ordered on: {order.date}</p>
                                    <div className="mt-2 font-bold text-gray-900">{order.price}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Orders;
