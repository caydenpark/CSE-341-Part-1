const router = require('express').Router();
const nameController = require('../controllers/names');

router.get('/', (req, res) => {
  res.send(nameController.getEmily());
});

router.get('/Sue', (req, res) => {
  res.send(nameController.getSue());
});

router.use('/contacts', require('./contacts'));

module.exports = router;
