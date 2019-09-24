const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log(res.locals.models);
  res.json({ msg: 'TODO' });
});

module.exports = router;
