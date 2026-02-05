import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate Verification
        setTimeout(() => {
            setIsVerified(true);
            setTimeout(() => {
                navigate('/marketplace');
            }, 1000); // Wait a bit to show verification success
        }, 2000); // 2 seconds fake loading
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 text-white relative overflow-hidden"
            >
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/30 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/30 rounded-full blur-3xl -ml-16 -mb-16"></div>

                <div className="relative z-10">
                    <div className="text-center mb-10">
                        <img src="https://img.icons8.com/?size=100&id=103387&format=png&color=FFFFFF" alt="Logo" className="w-16 h-16 mx-auto mb-4 drop-shadow-lg" />
                        <h1 className="text-3xl font-bold mb-2 tracking-tight">Welcome Back</h1>
                        <p className="text-blue-100/80">Login to PropertyDeals Marketplace</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-blue-100 ml-1">Account ID / Email</label>
                            <div className="relative group">
                                <User className="absolute left-3 top-3.5 w-5 h-5 text-blue-200 group-focus-within:text-white transition-colors" />
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-blue-100 ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-blue-200 group-focus-within:text-white transition-colors" />
                                <input
                                    type="password"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-4 rounded-xl font-bold shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 
                                ${isVerified
                                    ? 'bg-green-500 hover:bg-green-600'
                                    : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:scale-[1.02] hover:shadow-blue-500/25'
                                }`}
                        >
                            {isLoading ? (
                                isVerified ? (
                                    <>
                                        <CheckCircle2 className="w-5 h-5 animate-bounce" />
                                        <span>Verified!</span>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>Verifying Credentials...</span>
                                    </>
                                )
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-blue-200/60">
                        <p>FSD Project by <span className="text-white font-medium">PropertyDeals Team</span></p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
