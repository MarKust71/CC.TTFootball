const express = require('express');
const router = express.Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { User } = res.locals.models;
  const user = await User.findById(id);
  if (!user) res.send('Brak usera o podanym id');
  res.send(user);
});

router.put('/:id', async (req, res) => {
  const userId = req.params.id;
  const { User } = res.locals.models;
  console.log(userId, req.body);
  const user = await User.findByIdAndUpdate(userId, req.body, {new: true});
  console.log(user);
});

module.exports = router;
