const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();
//
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;

//
const uri = `mongodb+srv://${process.env.SECRET_USER}:${process.env.SECRET_PASS}@cluster0.i3j1g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// database conection
async function run() {
  try {
    await client.connect();
    const database = client.db("assigenment-11");
    const place = database.collection("destinetion");
    const users = database.collection("users");
    // get api
    app.get("/place", async (req, res) => {
      const cursor = place.find({});
      const result = await cursor.toArray();
      res.json(result);
    });
    app.get("/place/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await place.findOne(query);
      res.json(result);
    });
    //
    // user api  post
    app.post("/users", async (req, res) => {
      const userDetail = req.body;
      const result = await users.insertOne(userDetail);
      res.json(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);
//
app.get("/", (req, res) => {
  res.send("assigenment -11 server");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
