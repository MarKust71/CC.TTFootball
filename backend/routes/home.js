const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (process.env.TEST_ENV) {
        if (process.env.PORT) {
            res.send(`(1) Hello, players! Welcome on port ${process.env.PORT}! (${process.env.TEST_ENV})`);
        } else {
            res.send(`(2) Hello, players! Welcome on board! (${process.env.TEST_ENV}) (${process.env.PORT_LOCAL})`);
        }
    } else {
        if (process.env.PORT) {
            res.send(`(3) Hello, players! Welcome on port ${process.env.PORT}!`);
        } else {
            res.send(`(4) Hello, players! Welcome on board!`);
        }
    }
  } else {
    if (process.env.PORT) {
      res.send(`Hello, players! Welcome on port ${process.env.PORT}!`);
    } else {
      res.send(`Hello, players! Welcome on board!`);
    }
  }
});

module.exports = router;
