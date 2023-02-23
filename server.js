const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.set('strictQuery', false);
const app = express();
const port = process.env.PORT || 3000;

// Set up bodyParser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 const DB='mongodb+srv://satyambhaskar328:Satyam0912@cluster0.9ach4pl.mongodb.net/formdata?retryWrites=true&w=majority';
// Connect to MongoDB using Mongoose
mongoose.connect(DB)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB', err));

// Define schema for form data
const FormDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

// Define model for form data
const FormData = mongoose.model('FormData', FormDataSchema);

// Serve the HTML form at the root URL
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/form.html');
});

// Define route to handle form submission
app.post('/submit', async (req, res) => {
  // Create a new FormData instance from the submitted form data
  const formData = new FormData({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  });

  try {
    // Save the form data to MongoDB using async/await
    await formData.save();
    res.send('Form data saved successfully!');
  } catch (error) {
    res.status(500).send('Error saving form data to database');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
