//Fruit API
require("dotenv").config

const fruits = require('./fruits.json')
const express = require("express");
const app = express();
const port = process.env.PORT

app.use(express.json())

app.get('/', (req, res) => {
  res.send("Hello Fruit API")
})

app.get('/fruits', (req, res) => {
  res.send(fruits)
})

const getFruitIndex = name => {
  //takes in lowercase fruit name and returns index or -1
  return fruits.findIndex((fruit) => fruit.name.toLowerCase() == name)
}

app.post('/fruits', (req,res) => {
  //check if fruit exists
  const fi = getFruitIndex(req.body.name.toLowerCase());
  if (fi > -1) {
    //fruit can be found
    res.status(409).send("The fruit already exists")
  }else {
    //create an array of all ids
      const ids = fruits.map((fruit) => fruit.id);
    //get maximum id
    let maxId = Math.max(...ids);
    //increment that by one
    maxId++
    //adjust id to new maxId
    req.body.id = maxId;

    fruits.push(req.body)
    res.status(201).send(req.body)
  }
})

app.delete('.fruits/:name', (req,res) => {
  const fi =  getFruitIndex(req.params.name.toLowerCase());
  if (fi == -1) {
    // fruit cant be found
    res.status(404).send("fruit cannot be found")
  } else {
    fruit.splice(fi,1);
    res.sendStatus(200)
  }
})

app.get('/fruits/:name', (req, res) => {
 // res.send(`Return a fruit with ${req.params.name} name`)
  const name = req.params.name.toLowerCase();
  const fruit = fruits.find(fruit => fruit.name.toLowerCase() == name);
  if (fruit == undefined) {
    res.status(404).send("The fruit doesn't exist")
  }else {
    res.send(fruit)
  }
})

app.listen(port, () =>{
  console.log(`Server is now listening on port ${port}`)
})