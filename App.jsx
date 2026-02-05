import { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import Login from './pages/Login';
import Marketplace from './pages/Marketplace';
import Payment from './pages/Payment';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import RealtimeOverlay from './components/RealtimeOverlay';

// --- Context Definitions ---
export const MarketplaceContext = createContext();
export const UserContext = createContext();

// --- Hooks ---
export const useMarketplace = () => useContext(MarketplaceContext);
export const useUser = () => useContext(UserContext);

// Initialize Socket outside component to prevent multiple connections
const socket = io('http://localhost:5000');

function App() {
  const [items, setItems] = useState([]);
  const [sharedItem, setSharedItem] = useState(null);

  // User State
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Listen for initial data
    socket.on('initial_data', (data) => {
      setItems(data);
    });

    // Listen for updates to the full list
    socket.on('update_items', (updatedItems) => {
      setItems(updatedItems);
    });

    // Listen for new item broadcast
    socket.on('new_item', (item) => {
      setSharedItem(item); // Show overlay
      // Note: 'update_items' also fires to update the list, 
      // but 'new_item' is specifically for the alert.
    });

    return () => {
      socket.off('initial_data');
      socket.off('update_items');
      socket.off('new_item');
    };
  }, []);

  // Actions
  const triggerShare = (item) => {
    // Emit event to server instead of local setSharedItem
    socket.emit('add_item', item);
  };

  const addToCart = (item) => {
    if (!cart.find(i => i.id === item.id)) {
      setCart([...cart, item]);
      return true; // Success
    }
    return false; // Already in cart
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const addOrder = (item) => {
    const order = { ...item, date: new Date().toLocaleDateString(), orderId: Math.floor(Math.random() * 100000) };
    setOrders([order, ...orders]);
    // Remove from cart if purchased
    removeFromCart(item.id);
  };

  return (
    <MarketplaceContext.Provider value={{ items, triggerShare }}>
      <UserContext.Provider value={{ cart, orders, addToCart, removeFromCart, addOrder }}>
        <Router>
          <div className="min-h-screen bg-slate-50 relative overflow-hidden">
            {/* Realtime Overlay is Global */}
            <RealtimeOverlay item={sharedItem} onClose={() => setSharedItem(null)} />

            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </Router>
      </UserContext.Provider>
    </MarketplaceContext.Provider>
  );
}

export default App;
