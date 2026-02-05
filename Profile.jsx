import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Settings, Shield, Bell, LogOut, CreditCard, Heart } from 'lucide-react';
import { useUser } from '../App';

const Profile = () => {
    const navigate = useNavigate();
    const { orders } = useUser();

    // Mock User Data
    const user = {
        name: "Sanra User",
        email: "sanra@example.com",
        id: "USR-2026-X99",
        phone: "+91 98765 43210",
        joinDate: "Jan 2026"
    };

    const settingsOptions = [
        { icon: Bell, title: "Notifications", desc: "Manage your alerts" },
        { icon: Shield, title: "Security & Privacy", desc: "Password, 2FA" },
        { icon: CreditCard, title: "Saved Cards", desc: "Manage payment methods" },
        { icon: Heart, title: "Wishlist", desc: "Your favorite items" },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
                    <button onClick={() => navigate('/marketplace')} className="mr-4 p-2 hover:bg-gray-100 rounded-full">
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800">My Profile</h1>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-4 py-8">
                {/* User Card */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-white rounded-2xl shadow-sm p-6 mb-8 flex items-center gap-6 border border-gray-100"
                >
                    <div className="w-24 h-24 bg-gradient-to-br from-brand to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                        {user.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                        <p className="text-gray-500">{user.email}</p>
                        <p className="text-gray-500">{user.phone}</p>
                        <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-brand text-sm font-medium border border-blue-100">
                            ID: {user.id}
                        </div>
                    </div>
                    <button
                        onClick={() => navigate('/')}
                        className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                        title="Logout"
                    >
                        <LogOut className="w-6 h-6" />
                    </button>
                </motion.div>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div onClick={() => navigate('/orders')} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow">
                        <div className="text-3xl font-bold text-gray-800 mb-1">{orders.length}</div>
                        <div className="text-gray-500 text-sm font-medium">Total Orders</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="text-3xl font-bold text-gray-800 mb-1">Active</div>
                        <div className="text-gray-500 text-sm font-medium">Account Status</div>
                    </div>
                </div>

                {/* Settings Grid */}
                <h3 className="text-lg font-bold text-gray-800 mb-4 px-1">Account Settings</h3>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {settingsOptions.map((item, idx) => (
                        <div
                            key={idx}
                            className="flex items-center gap-4 p-5 hover:bg-gray-50 border-b last:border-0 border-gray-50 cursor-pointer transition-colors"
                        >
                            <div className="p-3 bg-gray-100 rounded-lg text-gray-600">
                                <item.icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-800">{item.title}</h4>
                                <p className="text-sm text-gray-500">{item.desc}</p>
                            </div>
                            <ArrowLeft className="w-5 h-5 text-gray-300 rotate-180" />
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Profile;
