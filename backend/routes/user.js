const express = require('express');
const router = express.Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { User } = res.locals.models;
  const user = await User.findById(id);
  if (!user) res.send('Brak usera o podanym id');
  res.send(user);
});

module.exports = router;
