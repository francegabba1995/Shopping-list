

class ShoppingList {
  constructor() {
    this.shoppingList = new Map()
  }

  addItem(item) {
    this.shoppingList.set(item.id, item)
  }


  getItemforName(name) {
    for (let element of this.shoppingList.values())
      if (name === element.name) {
        return element
      }
  }

  getItem(id) {
    return this.shoppingList.get(Number(id));
  }

  deleteItem(id) {
    if (typeof id !== 'number') {
      throw Error("id must be a number");
    }

    return this.shoppingList.delete(id);
  }

  getItemName(name) {
    for (let element of this.shoppingList.values()) {
      if (element.name === name) {
        return element.name
      }
    }
  }



}



module.exports = ShoppingList