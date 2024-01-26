const express = require('express');
const axios = require('axios');
const app = express();


app.use(express.static('public'));
app.use(express.json());

const netApiBaseUrl = 'https://itemsdotnetapi20240123140853.azurewebsites.net';
// Fetch all items
app.get('/api/items', async (req, res) => {
    try {
        const response = await axios.get(`${netApiBaseUrl}/items`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching items');
    }
});

// Add a new item
app.post('/api/items', async (req, res) => {
    try {
        await axios.post(`${netApiBaseUrl}/items`, req.body);
        res.send('Item added successfully');
    } catch (error) {
        res.status(500).send('Error adding item');
    }
});

// Update an item
app.put('/api/items/:id', async (req, res) => {
    try {
        await axios.put(`${netApiBaseUrl}/items/${req.params.id}`, req.body);
        res.send('Item updated successfully');
    } catch (error) {
        res.status(500).send('Error updating item');
    }
});

// Delete an item
app.delete('/api/items/:id', async (req, res) => {
    try {
        await axios.delete(`${netApiBaseUrl}/items/${req.params.id}`);
        res.send('Item deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting item');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Express server running on port ${port}`));


