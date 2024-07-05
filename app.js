const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const contactsRouter = require('./routes/api/contacts');

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1);
  });

app.use('/api/contacts', contactsRouter);

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message
  });
});

const PORT = process.env.PORT || 3000; 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



module.exports = app;


/**
 * iYqQ2FnQeWDdfS4k
 * mongodb+srv://ramacandra:iYqQ2FnQeWDdfS4k@cluster0.hsz16bb.mongodb.net/
 * 
 * mongodb+srv://ramacandra:iYqQ2FnQeWDdfS4k@cluster0.hsz16bb.mongodb.net/db_contacts?retryWrites=true&w=majority&appName=Cluster0
 */

