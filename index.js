const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
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
