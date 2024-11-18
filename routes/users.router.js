const express = require('express');
const router = express.Router();
const UsersService = require('../services/users.service');
const service = new UsersService();
router.get('/', (req, res) => {
  const { limit, offset } = req.query;
  const users = service.find(limit, offset);
  if (limit && offset) {
    res.json({ users });
  }
  res(404).send('Not Found');
});

module.exports = router;
