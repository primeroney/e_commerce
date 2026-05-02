const express = require('express');
const router = express.Router();
// Cart is managed on the frontend (localStorage) for simplicity
// This route is for any server-side cart operations if needed

router.get('/info', (req, res) => {
  res.json({ message: 'Cart is managed client-side with localStorage' });
});

module.exports = router;
