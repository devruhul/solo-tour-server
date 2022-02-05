const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();

const app = express()
const port = process.env.PORT || 5000

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
        const orderCollection = database.collection("orders");
        const contactCollection = database.collection("contact");

        // POST API to add places
        app.post('/places', async (req, res) => {
            const places = req.body
            const result = await placeCollection.insertOne(places)
            res.json(result)
        })

        // GET API to find all places
        app.get('/places', async (req, res) => {
            const cursor = placeCollection.find({})
            const result = await cursor.toArray()
            res.json(result)
        })

        // get place by id
        app.get('/places/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await placeCollection.findOne(query)
            res.json(result)
        })

        // add post api to add orders
        app.post('/orders', async (req, res) => {
            const orders = req.body
            const result = await orderCollection.insertOne(orders)
            res.json(result)
        })

        // get all orders
        app.get('/orders', async (req, res) => {
            const cursor = orderCollection.find({})
            const result = await cursor.toArray()
            res.json(result)
        })

        // get orders id
        app.get('/orders/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await orderCollection.findOne(query)
            res.json(result)
        })

        // delete order by id
        app.delete('/orders/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await orderCollection.deleteOne(query)
            res.json(result)
        })

        // POST APi to insert message
        app.post('/contact', async (req, res) => {
            const contact = req.body
            const result = await contactCollection.insertOne(contact)
            res.json(result)
        })

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