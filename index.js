const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT ||5001;
const { MongoClient, ServerApiVersion } = require("mongodb");

app.use(cors());
app.use(express.json());
// newspaper;
// Bqc5M4zoYl2tKH2q;


  
 
const uri =
  "mongodb+srv://newspaper:Bqc5M4zoYl2tKH2q@cluster0.7vvjepm.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});


;




async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const newsCollection = client.db("newspaper").collection('news');

app.post("/news", async (req, res) => {
  const artical = req.body;
  //   console.log(user);
  const result = await newsCollection.insertOne(artical);
  console.log(result);
  res.send(result); 
});
    
       app.get("/news", async (req, res) => {
         const cursor = newsCollection.find();
         const result = await cursor.toArray();
         res.send(result);
       }); 

   app.get("/news/:_id", async (req, res) => {
     const id = req.params._id;
     const query = { _id: new ObjectId(id) };
     const result = await newsCollection.findOne(query);
     res.send(result);
   });
  

  
 
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

 

app.get('/', (req, res) => {
    
res.send('newspaper')

}) 
app.listen(port, () => {
    
console.log(`hello,${port}`);

})