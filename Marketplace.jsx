import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, Bell, Plus, Star, Heart, User, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AddPropertyModal from '../components/AddPropertyModal';
import { useUser, useMarketplace } from '../App';

const Marketplace = () => {
    const navigate = useNavigate();
    const { addToCart, cart } = useUser();
    const { items } = useMarketplace();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Filter logic
    let displayedItems = items.filter(item => {
        const matchesCategory = filter === 'All' || item.category === filter;
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Dynamic Search Fallback (Mocking "Any Product")
    if (displayedItems.length === 0 && searchQuery.length > 2) {
        displayedItems = [{
            id: 9999,
            title: searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1),
            category: 'Search Result',
            price: '₹' + (Math.floor(Math.random() * 10000) + 500),
            rating: 4.5,
            image: `https://loremflickr.com/600/600/${searchQuery.replace(/\s+/g, ',')}/all`
        }];
    }

    const handleAddToCart = (e, item) => {
        e.stopPropagation();
        const added = addToCart(item);
        if (added) {
            // Optional: visual feedback toast
        } else {
            alert('Item already in cart!');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-brand text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/marketplace')}>
                        <div className="text-xl font-bold italic tracking-tighter">Deals<span className="text-yellow-400">Mall</span></div>
                        <div className="hidden sm:block text-xs italic opacity-80 mt-1">Plus <span className="text-yellow-400 font-bold">+</span></div>
                    </div>

                    <div className="flex-1 max-w-2xl relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for products, brands and more"
                            className="w-full py-2 px-4 pr-10 rounded-sm text-gray-800 focus:outline-none shadow-sm"
                        />
                        <Search className="absolute right-3 top-2.5 text-brand w-5 h-5" />
                    </div>

                    <div className="flex items-center gap-6 font-medium">
                        <div className="hidden sm:flex items-center gap-1 cursor-pointer hover:text-gray-200" onClick={() => navigate('/profile')}>
                            <User className="w-5 h-5" />
                            <span>Profile</span>
                        </div>
                        <div className="flex items-center gap-1 cursor-pointer hover:text-gray-200" onClick={() => navigate('/cart')}>
                            <div className="relative">
                                <ShoppingCart className="w-5 h-5" />
                                {cart.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                                        {cart.length}
                                    </span>
                                )}
                            </div>
                            <span className="hidden sm:block">Cart</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Categories */}
            <div className="bg-white shadow-sm border-b overflow-x-auto">
                <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between min-w-max gap-8 text-sm font-medium text-gray-700">
                    {['All', 'Electronics', 'Fashion', 'Grocery', 'Home', 'Properties', 'Toys', 'Books', 'Beauty'].map((cat, i) => (
                        <div
                            key={i}
                            onClick={() => setFilter(cat)}
                            className={`cursor-pointer transition-all flex flex-col items-center gap-1 group ${filter === cat ? 'text-brand scale-105' : 'hover:text-brand'}`}
                        >
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${filter === cat ? 'bg-blue-100 ring-2 ring-brand ring-offset-2' : 'bg-gray-100 group-hover:bg-blue-50'}`}>
                                {cat === 'All' && <Sparkles className="w-5 h-5" />}
                                {cat === 'Electronics' && <span className="text-xl">📱</span>}
                                {cat === 'Fashion' && <span className="text-xl">👕</span>}
                                {cat === 'Grocery' && <span className="text-xl">🥦</span>}
                                {cat === 'Home' && <span className="text-xl">🏠</span>}
                                {cat === 'Properties' && <span className="text-xl">🏢</span>}
                                {cat === 'Toys' && <span className="text-xl">🧸</span>}
                                {cat === 'Books' && <span className="text-xl">📚</span>}
                                {cat === 'Beauty' && <span className="text-xl">💄</span>}
                            </div>
                            <span className={filter === cat ? 'font-bold' : ''}>{cat}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-6">
                {/* Banner */}
                <div className="w-full h-48 md:h-72 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl shadow-lg mb-8 relative overflow-hidden flex items-center px-10">
                    <div className="text-white z-10 w-2/3">
                        <h2 className="text-3xl md:text-5xl font-bold mb-2">The Big Sale</h2>
                        <p className="text-lg opacity-90 mb-6">Up to 80% Off on everything found in daily life.</p>
                        <button onClick={() => setFilter('Fashion')} className="bg-white text-indigo-600 px-8 py-3 rounded-xl shadow-lg font-bold hover:bg-gray-50 transition-colors">
                            Shop Now
                        </button>
                    </div>
                    <div className="absolute right-0 top-0 h-full w-1/2 bg-white/10 skew-x-12 transform translate-x-20"></div>
                </div>

                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        {filter === 'All' ? 'Trending Now' : filter}
                        <span className="text-gray-400 text-base font-normal">({displayedItems.length} items)</span>
                    </h3>
                </div>

                {/* Grid */}
                {displayedItems.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {displayedItems.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100 flex flex-col relative"
                                onClick={() => navigate('/payment', { state: { item } })}
                            >
                                <div className="aspect-square overflow-hidden rounded-t-lg bg-gray-100 relative">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
                                    />
                                    <div className="absolute top-2 right-2 bg-white/50 backdrop-blur rounded-full p-1.5 hover:bg-red-50 hover:text-red-500 transition-colors">
                                        <Heart className="w-4 h-4" />
                                    </div>
                                </div>

                                <div className="p-3 flex-1 flex flex-col">
                                    <div className="text-xs text-gray-500 mb-1">{item.category}</div>
                                    <h3 className="text-sm font-medium text-gray-800 mb-1 line-clamp-2 leading-tight min-h-[2.5em]">{item.title}</h3>

                                    <div className="flex items-center gap-1 mb-2">
                                        <div className="bg-green-600 text-white text-[10px] px-1.5 py-0.5 rounded flex items-center gap-0.5 font-bold">
                                            {item.rating} <Star className="w-2.5 h-2.5 fill-current" />
                                        </div>
                                        <span className="text-gray-400 text-xs">({Math.floor(Math.random() * 5000)})</span>
                                    </div>

                                    <div className="mt-auto">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-lg font-bold text-gray-900">{item.price}</span>
                                            <span className="text-xs text-green-600 font-bold">20% off</span>
                                        </div>

                                        <button
                                            onClick={(e) => handleAddToCart(e, item)}
                                            className="w-full py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-sm rounded transition-colors flex items-center justify-center gap-2"
                                        >
                                            <ShoppingCart className="w-4 h-4" /> Add
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-gray-400">
                        <p>No items found in {filter}. Check back soon!</p>
                    </div>
                )}
            </main>

            {/* Fab for Realtime Share */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsAddModalOpen(true)}
                className="fixed bottom-8 right-8 bg-black text-white p-4 rounded-full shadow-2xl hover:bg-gray-800 transition-colors z-30 flex items-center gap-2 pr-6"
            >
                <Plus className="w-6 h-6" />
                <span className="font-bold">Sell Item</span>
            </motion.button>

            <AddPropertyModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
        </div>
    );
};

export default Marketplace;
