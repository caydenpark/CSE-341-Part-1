const router = require('express').Router();
const client = require('../connect.js');
const { ObjectId } = require('mongodb');

// Get all contacts
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

// Get one contact using _id
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

// Create a new contact
router.post('/', async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  try {
    const contactsCollection = client.db('cse341').collection('contacts');
    const contact = await contactsCollection.insertOne(req.body);
    res.json(contact);
    res.status(201).send();
    return contact._id;
  } catch (error) {
    console.error('Error creating contact:', error);
    // res.status(500).send('Internal Server Error');
  }
});

// Update a contact
router.put('/:id', async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  try {
    const contactsCollection = client.db('cse341').collection('contacts');
    const contact = await contactsCollection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Delete a contact
router.delete('/:id', async (req, res) => {
  try {
    const contactsCollection = client.db('cse341').collection('contacts');
    const contact = await contactsCollection.deleteOne({ _id: new ObjectId(req.params.id) });

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
