const axios = require('axios');
const express = require('express');
const app = express();
const port = 1337;

app.use(express.static('dist'));

app.get('/who_is_online', async (req, res) => {
    try {
        const { data } = await axios.get('http://207.153.21.155:1337/who_is_online');
        res.send(data);
    } catch (e) {
        res.send({ error: e });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
});