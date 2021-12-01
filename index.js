const express = require("express");
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

require('dotenv').config();

const cors = require('cors')
const app = express();
app.use(cors())
const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hcshw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run(){
    try {
        await client.connect();
        const database = client.db("portfolio");
        const projectsCollection = database.collection("projects");

        app.get('/projects', async (req, res)=>{
            const cursor = projectsCollection.find({});
            const projects = await cursor.toArray();
            res.send(projects);
        })

        app.get('/projects/:id', async (req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
            const project = await projectsCollection.findOne(query);
            res.json(project)
        })

        app.post('/projects', async (req, res)=>{
            const project = {
                name: "Smart Diagnostic Center",
                material: "React, React-Router, VsCode, Firebase, Heroku ",
                liveLink: "https://react-smart-diagnostic-center.web.app/home",
                gitServer: "",
                gitClient: "https://github.com/sanaul01/healthcare-service",
                img1: "https://i.ibb.co/P9DDSWB/Diagnostic1.png",
                img2: "https://i.ibb.co/1MQXtVy/Diagnostic3.png",
                img3: "https://i.ibb.co/bPqwYZJ/Diagnostic2.png",
                img4: "https://i.ibb.co/bPqwYZJ/Diagnostic2.png",
                img5: "https://i.ibb.co/bPqwYZJ/Diagnostic2.png",
                description: "This site is created by ReactJS. It is a business or shopping site. It's a full-stack website. Users will see into this site bike and if they want to buy any bike firstly they will be looked in and then pressed order now button for order any bike",
            }

            const result = await projectsCollection.insertOne(project)
            console.log(result)
        })
    }
    finally {
        // await client.close();
      }
}

run().catch(console.dir)

app.get('/', (req, res)=>{
    res.send("Hellow Projects")
});

app.listen(port, ()=>{
    console.log("listening", port)
})