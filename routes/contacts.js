const router = require('express').Router();
const client = require('../connect.js');
const { ObjectId } = require('mongodb');

router.get('/', async (req, res) => {
  try {
    const contactsCollection = client.db('cse341').collection('contacts');
    const contacts = await contactsCollection.find({}).toArray();
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const contactsCollection = client.db('cse341').collection('contacts');
    const contact = await contactsCollection.findOne({ _id: new ObjectId(req.params.id) });

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json(contact);
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
