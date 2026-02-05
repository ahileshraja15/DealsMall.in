import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CreditCard, Smartphone, Building, CheckCircle, ShieldCheck } from 'lucide-react';
import { useUser } from '../App';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { addOrder } = useUser();

    const [selectedMethod, setSelectedMethod] = useState('upi');
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);

    const item = location.state?.item || {
        title: 'Premium Property Booking',
        price: '₹50,000',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    };

    const handlePayment = () => {
        setProcessing(true);
        setTimeout(() => {
            addOrder(item); // Add to history
            setProcessing(false);
            setSuccess(true);
            setTimeout(() => {
                navigate('/orders'); // Redirect to orders instead of marketplace
            }, 3000);
        }, 2000);
    };

    if (success) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6"
                >
                    <CheckCircle className="w-12 h-12 text-green-600" />
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
                <p className="text-gray-500 mb-8">Redirecting you to your orders...</p>
                <div className="w-64 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 3 }}
                        className="h-full bg-green-500"
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
                    <button onClick={() => navigate(-1)} className="mr-4 p-2 hover:bg-gray-100 rounded-full">
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800">Payments</h1>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Payment Methods */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="bg-brand text-white w-6 h-6 flex items-center justify-center rounded text-xs">1</span>
                            Payment Options
                        </h3>

                        <div className="space-y-4">
                            {/* UPI */}
                            <label className={`flex items-start p-4 border rounded-lg cursor-pointer transition-all ${selectedMethod === 'upi' ? 'border-brand bg-blue-50/30' : 'border-gray-200 hover:border-gray-300'}`}>
                                <input type="radio" name="payment" className="mt-1" checked={selectedMethod === 'upi'} onChange={() => setSelectedMethod('upi')} />
                                <div className="ml-4 flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Smartphone className="w-5 h-5 text-gray-600" />
                                        <span className="font-semibold text-gray-800">UPI (GPay, PhonePe, Paytm)</span>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-3">Pay directly from your bank account</p>
                                    <AnimatePresence>
                                        {selectedMethod === 'upi' && (
                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                                                <input type="text" placeholder="Enter UPI ID" className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-brand outline-none" />
                                                <div className="mt-2 text-xs text-green-600 font-medium">Safe & Secure Payment</div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </label>

                            {/* Cards */}
                            <label className={`flex items-start p-4 border rounded-lg cursor-pointer transition-all ${selectedMethod === 'card' ? 'border-brand bg-blue-50/30' : 'border-gray-200 hover:border-gray-300'}`}>
                                <input type="radio" name="payment" className="mt-1" checked={selectedMethod === 'card'} onChange={() => setSelectedMethod('card')} />
                                <div className="ml-4 flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <CreditCard className="w-5 h-5 text-gray-600" />
                                        <span className="font-semibold text-gray-800">Credit / Debit / ATM Card</span>
                                    </div>
                                    <p className="text-sm text-gray-500">Visa, MasterCard, Rupay & more</p>
                                </div>
                            </label>

                            {/* Net Banking */}
                            <label className={`flex items-start p-4 border rounded-lg cursor-pointer transition-all ${selectedMethod === 'netbanking' ? 'border-brand bg-blue-50/30' : 'border-gray-200 hover:border-gray-300'}`}>
                                <input type="radio" name="payment" className="mt-1" checked={selectedMethod === 'netbanking'} onChange={() => setSelectedMethod('netbanking')} />
                                <div className="ml-4 flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Building className="w-5 h-5 text-gray-600" />
                                        <span className="font-semibold text-gray-800">Net Banking</span>
                                    </div>
                                    <p className="text-sm text-gray-500">All Indian banks supported</p>
                                </div>
                            </label>
                        </div>
                    </div>

                    <button
                        onClick={handlePayment}
                        disabled={processing}
                        className={`w-full py-4 rounded-lg shadow-lg font-bold text-white text-lg transition-all ${processing ? 'bg-gray-400 cursor-not-allowed' : 'bg-secondary hover:bg-orange-600'}`}
                    >
                        {processing ? 'Processing Securely...' : `Pay ${item.price}`}
                    </button>

                    <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mt-4">
                        <ShieldCheck className="w-4 h-4" />
                        <span>100% Secure Payments powered by Razorpay</span>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                        <h3 className="font-bold text-gray-500 uppercase text-sm mb-4">Price Details</h3>

                        <div className="flex items-start gap-4 mb-6 pb-6 border-b border-gray-100">
                            <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded" />
                            <div>
                                <h4 className="font-medium text-gray-800 line-clamp-2">{item.title}</h4>
                                <div className="text-green-600 text-sm mt-1">In Stock</div>
                            </div>
                        </div>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-gray-700">
                                <span>Price (1 item)</span>
                                <span>{item.price}</span>
                            </div>
                            <div className="flex justify-between text-gray-700">
                                <span>Booking Fees</span>
                                <span className="text-green-600">FREE</span>
                            </div>
                            <div className="flex justify-between text-gray-700">
                                <span>Platform Charges</span>
                                <span>₹99</span>
                            </div>
                        </div>

                        <div className="flex justify-between font-bold text-xl text-gray-900 border-t border-dashed border-gray-300 pt-4">
                            <span>Total Amount</span>
                            <span>{item.price}</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Payment;
