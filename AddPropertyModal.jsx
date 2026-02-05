import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, DollarSign, Tag, ImageIcon } from 'lucide-react';
import { useMarketplace } from '../App';

const AddPropertyModal = ({ isOpen, onClose }) => {
    const { triggerShare } = useMarketplace();
    const [formData, setFormData] = useState({
        title: '',
        category: 'Electronics',
        price: '',
        image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    });

    // Auto-fetch image based on title
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (formData.title.length > 2) {
                const searchTerm = formData.title.trim().replace(/\s+/g, ',');
                setFormData(prev => ({
                    ...prev,
                    image: `https://loremflickr.com/800/600/${searchTerm}/all`
                }));
            }
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [formData.title]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newItem = {
            id: Date.now(),
            title: formData.title,
            category: formData.category,
            price: formData.price.startsWith('₹') ? formData.price : `₹${formData.price}`,
            image: formData.image,
            rating: 5.0,
            reviews: 0
        };

        triggerShare(newItem);
        onClose();
        setTimeout(() => setFormData({ ...formData, title: '', price: '' }), 500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        className="relative z-50 w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
                    >
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800">List Item for Sale</h2>
                            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Product Title</label>
                                <div className="relative">
                                    <Tag className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="e.g. Gaming Laptop"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <select
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        <option>Electronics</option>
                                        <option>Fashion</option>
                                        <option>Grocery</option>
                                        <option>Home</option>
                                        <option>Properties</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            required
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            placeholder="1000"
                                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">Image URL</label>
                                <div className="flex items-center space-x-4">
                                    <img src={formData.image} alt="Preview" className="w-16 h-16 rounded-lg object-cover border border-gray-200" />
                                    <input
                                        type="text"
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        className="flex-1 px-4 py-2 text-sm border border-gray-200 rounded-lg outline-none"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-black text-white font-bold rounded-xl shadow-lg hover:bg-gray-800 transition-all flex items-center justify-center space-x-2"
                            >
                                <Upload className="w-5 h-5" />
                                <span>Broadcast Live Deal</span>
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AddPropertyModal;
