const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/form.html');
});

// handle form submission
app.post('/submit', (req, res) => {
  const data = req.body;

  // connect to MongoDB
  MongoClient.connect('mongodb://127.0.0.1/mydb', (err, client) => {
    if (err) throw err;

    const db = client.db('mydb');
    const collection = db.collection('formdata');

    // insert the form data into the database
    collection.insertOne(data, (err, result) => {
      if (err) throw err;

      console.log(result);
      res.send('Form submitted successfully!');
      client.close();
    });
  });
});

// start the server
app.listen(port, () => {
  console.log(`Server listening`);
});