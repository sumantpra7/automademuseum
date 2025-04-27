// 1. Import packages
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// 2. Middlewares
app.use(express.json()); // So your server can understand JSON body

// 3. Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://sumantpra7:AGhIdnTbTO1We932@cluster0.8hngl4d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('✅ Connected to MongoDB!'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// 4. Define a booking schema
const bookingSchema = new mongoose.Schema({
  name: String,
  aadhaar: String,
  phone: String,
});

const Booking = mongoose.model('Booking', bookingSchema);

// 5. Define an endpoint to save booking data
app.post('/book-ticket', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).send('🎟️ Booking saved!');
  } catch (error) {
    res.status(400).send('❌ Error saving booking');
  }
});

// 6. Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
