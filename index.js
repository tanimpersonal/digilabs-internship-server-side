const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;
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

    app.get("/notices", async (req, res) => {
      const query = {};
      const cursor = noticeCollection.find(query);
      const notices = await cursor.toArray();
      res.send(notices);
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
