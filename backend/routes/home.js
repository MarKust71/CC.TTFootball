const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (process.env.PORT) {
        res.send(`Hello, players! Welcome on port ${process.env.PORT}!`);
    } else {
        res.send(`Hello, players! Welcome on board!`);
    }
})

module.exports = router;
