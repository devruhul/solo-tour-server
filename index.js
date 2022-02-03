
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();

const app = express()
const port = 5000

// middlewars
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6jlv6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("solo_tour");
        const placeCollection = database.collection("places");

        // POST API to add places
        app.post('/places', async (req, res) => {
            const places = req.body
            const result = await placeCollection.insertOne(places)
            res.json(result)
        })

        // GET API to find all places
      

    } finally {
        //   await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('running solo tour server')
})

app.listen(port, () => {
    console.log('running server at', port)
})