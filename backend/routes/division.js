const express = require('express');
const router = express.Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { Division } = res.locals.models;
  const division = await Division.findById(id);
  if (!division) res.send('Nie ma dywizji o takim id, sory :(');
  res.send(division);
});

module.exports = router;