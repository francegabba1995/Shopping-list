let counter = 1


class Item {
  constructor(name , quantity) {
    if (typeof quantity !== 'number') {
      throw Error("quantity must be a number")
    }
    this.id = counter++
    this.name = name
    this.quantity = quantity
    
  }
}


module.exports = Item
