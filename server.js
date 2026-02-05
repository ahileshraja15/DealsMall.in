const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");
const propertyRoutes = require('./routes/propertyRoutes');

const app = express();
const PORT = 5000;

const path = require('path');

app.use(cors());
app.use(express.json());

// Serve Static Files from Frontend
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Routes
app.use('/api/properties', propertyRoutes);

// --- Socket.io Setup ---
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins for now
        methods: ["GET", "POST"]
    }
});

// In-Memory Storage (Mock DB)
let items = [
    { id: 1, title: 'Modern Apartment in Bandra', category: 'Properties', price: '₹2,50,00,000', rating: 4.8, image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    // Electronics
    { id: 10, title: 'Apple iPhone 15 Pro Max', category: 'Electronics', price: '₹1,59,900', rating: 4.8, image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    // Fashion
    { id: 20, title: 'Nike Air Jordan 1 High', category: 'Fashion', price: '₹16,995', rating: 4.6, image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    // Grocery
    { id: 30, title: 'Fortune Basmati Rice (5kg)', category: 'Grocery', price: '₹650', rating: 4.5, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    // Home
    { id: 40, title: 'Dyson V15 Detect Vacuum', category: 'Home', price: '₹65,900', rating: 4.7, image: 'https://images.unsplash.com/photo-1558317374-a354d5f3d463?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    // Beauty
    { id: 50, title: 'Maybelline New York Fit Me Foundation', category: 'Beauty', price: '₹549', rating: 4.4, image: 'https://images.unsplash.com/photo-1631730486784-5456119f69ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    // Books
    { id: 60, title: 'Atomic Habits by James Clear', category: 'Books', price: '₹450', rating: 4.9, image: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    // Toys
    { id: 70, title: 'LEGO Classic Brick Box', category: 'Toys', price: '₹4,499', rating: 4.9, image: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
];

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Send initial data to the connected user
    socket.emit('initial_data', items);

    socket.on('add_item', (newItem) => {
        console.log('New Item Received:', newItem.title);
        items.unshift(newItem); // Add to beginning
        // Broadcast to EVERYONE (including sender, for simplicity of state sync)
        io.emit('new_item', newItem);
        // Also emit updated list to keep everyone in sync
        io.emit('update_items', items);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Catch-all route to serve React App
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
