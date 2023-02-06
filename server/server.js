const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
//  Handling uncaughtException
process.on('uncaughtException', (err) => {
  console.log(
    'uncaught exception❗ Shutting Down .....',
  );
  console.log(err.name, err.message);
  console.log(err);
  // console.log(err.stack);
  process.exit(1);
});

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
);

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `MongoDB connected ${connect.connection.host}`,
    );
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

// connect to Database
connectDB();

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`server runs on port ${port}`);
});

//  Handling unhandledRejection
process.on('unhandledRejection', (err) => {
  console.log(
    'Unhandled Rejection❗ Shutting Down .....',
  );
  console.log(err.name);
  console.log(err.message);
  server.close(() => {
    process.exit(1);
  });
});

module.exports = connectDB;
