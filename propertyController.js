// Controller for handling property related logic
exports.getProperties = (req, res) => {
    // Mock data for now
    res.json([
        { id: 1, title: 'Luxury Villa', price: '₹5,00,00,000' }
    ]);
};

exports.addProperty = (req, res) => {
    const { title, price } = req.body;
    // Logic to add property would go here
    res.status(201).json({ message: 'Property added successfully', data: { title, price } });
};
