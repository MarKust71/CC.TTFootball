const express = require('express');
const router = express.Router();
const path = require('path');

if (process.env.NODE_ENV === 'production') {
  // Handle React routing, return all requests to React app
  router.get('*', function(req, res) {
    // console.log(process.env);
    // console.log(path.join(__dirname));
    // console.log(path.join(__dirname, '..', 'frontend/build', 'index.html'));
    // res.sendFile(path.join(__dirname, '..', 'frontend/build', 'index.html'));
    res.sendFile(path.join('/app/frontend/build', 'index.html'));
  });
} else {
  router.get('/', (req, res) => {
    if (process.env.TEST_ENV) {
      if (process.env.PORT) {
        res.send(`Hello, players! Welcome on port ${process.env.PORT}! (${process.env.TEST_ENV})`);
      } else {
        res.send(`Hello, players! Welcome on board! (${process.env.TEST_ENV})`);
      }
    } else {
      if (process.env.PORT) {
        res.send(`Hello, players! Welcome on port ${process.env.PORT}!`);
      } else {
        res.send(`Hello, players! Welcome on board!`);
      }
    }
  });
  
  }


module.exports = router;
