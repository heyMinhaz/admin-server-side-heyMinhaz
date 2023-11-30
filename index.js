const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT ||5001;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

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

async function run() {
  try {
     const newsCollection = client.db("newspaper").collection("news");
     const userdatabase = client.db("newspaper").collection("users");
     const paymentCollection = client.db("newspaper").collection("payments");
    await client.connect();

   

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
  const query = {
    _id: new ObjectId(id),
  };
  const result = await newsCollection.findOne(query);
  res.send(result);
});
    
    app.patch("/users/admin/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          role: "admin",
        },
      };
      const result = await userdatabase.updateOne(filter, updatedDoc);
      res.send(result);
    });


  app.post('/create-payment-intent', async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100);
      console.log(amount, 'amount inside the intent')

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        payment_method_types: ['card']
      });

      res.send({
        clientSecret: paymentIntent.client_secret
      })
    });


    app.get('/payments/:email',  async (req, res) => {
      const query = { email: req.params.email }
      
      const result = await paymentCollection.find(query).toArray();
      res.send(result);
    })

    app.post('/payments', async (req, res) => {
      const payment = req.body;
      const paymentResult = await paymentCollection.insertOne(payment)
    });




app.post("/users", async (req, res) => {
  const user = req.body;

  const query = { email: user.email };
  const existingUser = await userdatabase.findOne(query);
  if (existingUser) {
    return res.send({ message: "user already exists", insertedId: null });
  }
  const result = await userdatabase.insertOne(user);
  res.send(result);
});


    


app.get("/users", async (req, res) => {
  const result = await userdatabase.find().toArray();
  res.send(result);
});

app.get("/users/admin/:email", async (req, res) => {
 

  const query = { email: email };
  const user = await userdatabase.findOne(query);
  let admin = false;
  if (user) {
    admin = user?.role === "admin";
  }
  res.send({ admin });
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