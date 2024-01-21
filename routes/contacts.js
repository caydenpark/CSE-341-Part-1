const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = 3000

const uri = 'mongodb+srv://caydenpark:Gametime1%21@cluster0.8xys8ja.mongodb.net/';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/contacts', async (req, res) => {
    try {
        await client.connect();
        const contactsCollection = client.db('cse341').collection('contacts');
        const contacts = await contactsCollection.find({}).toArray();
        res.json(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).send('Internal Server Error');
    } finally {
        await client.close();
    }
});

app.get('/contacts/:id', async (req, res) => {
    try {
        await client.connect();
        const contactsCollection = client.db('cse341').collection('contacts');
        const contact = await contactsCollection.findOne({ _id: ObjectId(req.params.id) });

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.json(contact);
    } catch (error) {
        console.error('Error fetching contact:', error);
        res.status(500).send('Internal Server Error');
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});