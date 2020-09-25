const express = require('express')
const bodyParser = require('body-parser');

const app = express();

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// disable cors
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', '*')
  res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

const ShoppingList = require('./shoppingList')
const Item = require('./item')

let shoppingList = new ShoppingList()
/*let item1 = new Item(2, 'pizza')
let item2 = new Item(5, 'hamburger')
shoppingList.addItem(item1)
shoppingList.addItem(item2)
*/






app.post('/item', (req, res) => {
  const { name , quantity } = req.body;
  let n = shoppingList.getItemName(name)
  if (n === name) {
    let i = shoppingList.getItemforName(name)
    if (typeof quantity !== 'number') {
      res.status(400)
      res.send("quantity must be a number!")
    } else {
      i.quantity += quantity
      res.send("POST / ITEM / - 200")
      res.sendStatus(200);
      return
    }
  }

  let item;

  try {

    const { name , quantity } = req.body;
    item = new Item(name , quantity);

  } catch (e) {
    res.status(400)
    res.send(e.message)
    return
  }

  try {
    shoppingList.addItem(item)
    res.send("POST / ITEM / - 200")
    res.sendStatus(200)
  } catch (e) {
    console.log(e)
    res.status(403);
    res.send(e.message);
  }
}
)





app.put('/item/:id', (req, res) => {
  let i = shoppingList.getItem(req.params.id);
  if (i === undefined) {
    console.log("GET / ITEM /" + req.params.id + " - 404")
    res.status(404)
    res.send("Not found!");
    return;
  }

  const { name , quantity } = req.body;
  if (typeof quantity !== 'number') {
    res.status(400)
    res.send("quantity must be a number!")
  } else {
    i.name = name
    i.quantity = quantity
    res.send("item updated!")
    res.status(200);
  }
})


app.delete('/item/:id', (req, res) => {
  let i = shoppingList.getItem(req.params.id);
  if (i === undefined) {
    console.log("GET / ITEM /" + req.params.id + " - 404")
    res.status(404)
    res.send("Not found!");
    return;
  }
  let result = shoppingList.deleteItem(Number(req.params.id));
  if (!result) {
    res.status(500);
    res.send("Delete failed!");
    return;
  }

  res.status(200).send("item Delete!")
})


app.get('/item/:id', (req, res) => {
  console.log("GET / ITEM /" + req.params.id)
  let i = shoppingList.getItem(req.params.id);
  if (i === undefined) {
    console.log("GET / ITEM /" + req.params.id + " - 404")
    res.status(404)
    res.send("Not found!");
  } else {
    console.log("GET / ITEM /" + req.params.id + " - 200")
    res.send(i)
    res.sendStatus(200);

  }
})




app.listen("8080", () => {
  console.log("listen http request at localhost:8080")
});