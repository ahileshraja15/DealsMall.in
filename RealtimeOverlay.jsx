import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

const RealtimeOverlay = ({ item, onClose }) => {
    useEffect(() => {
        if (item) {
            const timer = setTimeout(() => {
                onClose();
            }, 4000); // 4 seconds disappear
            return () => clearTimeout(timer);
        }
    }, [item, onClose]);

    return (
        <AnimatePresence>
            {item && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                >
                    <div className="relative w-full max-w-lg p-6 mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden glass">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" />

                        <div className="text-center">
                            <motion.div
                                initial={{ y: -20 }}
                                animate={{ y: 0 }}
                                className="inline-block px-4 py-1 mb-4 text-xs font-bold tracking-wider text-white uppercase bg-red-500 rounded-full animate-bounce"
                            >
                                New Listing Live!
                            </motion.div>

                            <div className="aspect-video w-full mb-6 rounded-xl overflow-hidden shadow-inner bg-gray-100">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <h2 className="text-3xl font-bold text-gray-800 mb-2">{item.title}</h2>
                            <p className="text-2xl font-bold text-brand">{item.price}</p>
                            <p className="mt-4 text-gray-500 text-sm">Visible to all users in realtime...</p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default RealtimeOverlay;
