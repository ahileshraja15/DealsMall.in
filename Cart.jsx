import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Trash2, ShoppingBag } from 'lucide-react';
import { useUser } from '../App';

const Cart = () => {
    const navigate = useNavigate();
    const { cart, removeFromCart } = useUser();

    const totalAmount = cart.length > 0 ? "Calculated at checkout" : "0";

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
                    <button onClick={() => navigate(-1)} className="mr-4 p-2 hover:bg-gray-100 rounded-full">
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800">My Cart ({cart.length})</h1>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8">
                {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-20 text-center">
                        <div className="bg-blue-50 p-6 rounded-full mb-4">
                            <ShoppingBag className="w-12 h-12 text-brand" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Cart is Empty</h2>
                        <p className="text-gray-500 mb-8">Add properties to your cart to see them here.</p>
                        <button onClick={() => navigate('/marketplace')} className="bg-brand text-white px-6 py-3 rounded shadow hover:bg-blue-700 font-bold">
                            Shop Now
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-4">
                            {cart.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="bg-white rounded-lg p-4 shadow-sm flex gap-4"
                                >
                                    <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded" />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg text-gray-800">{item.title}</h3>
                                        <div className="text-xl font-bold text-gray-900 mt-1">{item.price}</div>
                                        <div className="mt-4 flex gap-4">
                                            <button
                                                onClick={() => navigate('/payment', { state: { item } })}
                                                className="px-4 py-2 bg-brand text-white text-sm font-bold rounded shadow-sm hover:bg-blue-700"
                                            >
                                                Buy Now
                                            </button>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="px-4 py-2 border border-gray-300 text-gray-600 text-sm font-bold rounded hover:bg-gray-50 flex items-center gap-2"
                                            >
                                                <Trash2 className="w-4 h-4" /> Remove
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                                <h3 className="font-bold text-gray-500 uppercase text-sm mb-4">Price Details</h3>
                                <div className="flex justify-between text-gray-900 font-bold text-lg border-t pt-4 mt-4">
                                    <span>Total Items</span>
                                    <span>{cart.length}</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-4">Proceed to Buy to complete purchase one by one (MVP).</p>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Cart;
