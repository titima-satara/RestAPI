const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json());

const { MongoClient } = require("mongodb");
const uri = "mongodb://titima:1234@localhost:27017";

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

//Create
  app.post('/flightBKKACNX/create', async(req, res) => {
    const flightBKKACNX = req.body;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('mydb').collection('flightsBKKACNX').insertOne({
        id: parseInt(flightBKKACNX.id),
        airline: flightBKKACNX.airline,
        origin: flightBKKACNX.origin,
        Departures: flightBKKACNX.Departures,
        Plāythāng: flightBKKACNX.Plāythāng,
        Arrivals: flightBKKACNX.Arrivals,
        traveltime: flightBKKACNX.traveltime,
        price: flightBKKACNX.price
    });
  await client.close();
  res.status(200).send({
    "status": "ok",
    "message": "flight with ID = "+flightBKKACNX+" is created",
    "flight": flightBKKACNX
  });
})

//Read All
  app.get('/flightBKKACNX', async(req, res) => {
    const id = parseInt(req.params.id);
    const client = new MongoClient(uri);
    await client.connect();
    const flightsBKKACNX = await client.db('mydb').collection('flightsBKKACNX').find({}).toArray();
    await client.close();
    res.status(200).send(flightsBKKACNX);
  })

//Read by id
  app.get('/flightBKKACNX/:id', async(req, res) => {
    const id = parseInt(req.params.id);
    const client = new MongoClient(uri);
    await client.connect();
    const flightBKKACNX = await client.db('mydb').collection('flightsBKKACNX').findOne({"id": id});
    await client.close();
    res.status(200).send({
      "status": "ok",
      "flight": flightBKKACNX
    });
  })

//Update
  app.put('/flightBKKACNX/update', async(req, res) => {
    const flightBKKACNX = req.body;
    const id = parseInt(flightBKKACNX.id);
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('mydb').collection('flightsBKKACNX').updateOne({'id': id}, {"$set": {
        id: parseInt(flightBKKACNX.id),
        airline: flightBKKACNX.airline,
        origin: flightBKKACNX.origin,
        Departures: flightBKKACNX.Departures,
        Plāythāng: flightBKKACNX.Plāythāng,
        Arrivals: flightBKKACNX.Arrivals,
        traveltime: flightBKKACNX.traveltime,
        price: flightBKKACNX.price
    }});
    await client.close();
    res.status(200).send({
      "status": "ok",
      "message": "flight with ID = "+id+" is updated",
      "flight": flightBKKACNX
    });
  })

//Delete
  app.delete('/flightBKKACNX/delete', async(req, res) => {
    const id = parseInt(req.body.id);
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('mydb').collection('flightsBKKACNX').deleteOne({'id': id});
    await client.close();
    res.status(200).send({
      "status": "ok",
      "message": "flight with ID = "+id+" is deleted"
    });
  })