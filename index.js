const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const { ObjectID } = require("bson");
app.use(cors());
app.use(express.json());
const uri =
  "mongodb+srv://dbuser1:89NuSGyMNpr6nn4o@cluster0.755op.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const noticeCollection = client
      .db("digilabs-internship")
      .collection("notice");
    const imageCollection = client
      .db("digilabs-internship")
      .collection("pictures");
    const contactCollection = client
      .db("digilabs-internship")
      .collection("contactData");
    app.get("/notices", async (req, res) => {
      const query = {};
      const cursor = noticeCollection.find(query);
      const notices = await cursor.toArray();
      res.send(notices);
    });
    app.get("/picture", async (req, res) => {
      const query = {};
      const cursor = imageCollection.find(query);
      const images = await cursor.toArray();
      res.send(images);
    });
    app.post("/picture", async (req, res) => {
      const imageUrl = req.body.displayUrl;
      console.log(imageUrl);
      const query = { imageUrl };
      const result = await imageCollection.insertOne(query);
    });
    app.post("/contactData", async (req, res) => {
      console.log(req.body);
      const contactData = req.body;
      const query = { contactData };
      const result = await contactCollection.insertOne(query);
    });
    app.get("/contactData", async (req, res) => {
      const query = {};
      const cursor = contactCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    app.delete("/notices/:id", async (req, res) => {
      console.log(req.params.id);
      const id = req.params.id;
      const query = { _id: ObjectID(id) };
      const result = await noticeCollection.deleteOne(query);
      res.send(result);
    });
    app.delete("/picture/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: ObjectID(id) };
      const result = await imageCollection.deleteOne(query);
      res.send(result);
    });
    app.post("/notices", async (req, res) => {
      console.log(req.body);
      const newNotice = req.body;
      const query = newNotice;
      const result = await noticeCollection.insertOne(query);
      res.send(result);
    });
    app.put("/notices/:id", async (req, res) => {
      console.log(req.body);
      console.log(req.params.id);
      const id = req.params.id;
      const update = req.body;
      const filter = { _id: ObjectID(id) };
      const updateDoc = {
        $set: { title: update.title, body: update.body, time: update.time },
      };
      console.log(updateDoc);
      const result = await noticeCollection.updateOne(filter, updateDoc);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
