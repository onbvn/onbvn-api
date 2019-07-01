const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    success: true,
    message: 'Hello from OnBVN API.'
  })
});

module.exports = router;
