const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const todoRoutes = require('./routes/todos');

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/todos', todoRoutes);





sequelize.sync().then(() => {
    app.listen(5000, () => {
      console.log('Server is running on port 5000');
    });
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  });









// Authenticate and Sync
// sequelize.authenticate()
//   .then(() => {
//     return sequelize.sync(); // Sync after successful authentication
//   })
//   .then(() => {
//     console.log('Database & tables created!');
//     app.listen(5000, () => {
//       console.log('Server is running on port 5000');
//     });
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });