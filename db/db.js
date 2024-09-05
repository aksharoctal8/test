const mongoose = require('mongoose');

const connectDatabase = () => {
  mongoose.connect(process.env.DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
    .then(() => console.log('Database Connected'))
    .catch((err) => console.error('Database connection error:', err));
};

module.exports = connectDatabase;
