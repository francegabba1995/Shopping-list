const ShoppingList = require('./shoppingList')
const Item = require('./item')
let shoppingList = new ShoppingList()
let item1 = new Item(16, 'pizza')

shoppingList.addItem(item1)


//testaddItem
test("Return error", () => {
  expect(() => {
    let item2 = new Item('5' , 'hamburger')
    shoppingList.addItem(item2);
  }).toThrow("quantity must be a number");
})

// test getItem
test("Returns item1", () => {
  expect(shoppingList.getItem(1)).toBe(item1);
})
// test not found
test("Returns undefined", () => {
  expect(shoppingList.getItem(3)).toBe(undefined);
})



//test getItemforName
test("Returns item1", () => {
  expect(shoppingList.getItemforName('pizza')).toBe(item1);
})

//test getItemName
test("Returns pizza", () => {
  expect(shoppingList.getItemName('pizza')).toBe('pizza');
})



//test deleteItem
test("Return error", () => {
  expect(() => {
    shoppingList.deleteItem('1');
  }).toThrow("id must be a number");
})

test("Returns true", () => {
  expect(shoppingList.deleteItem(1)).toBe(true);
})







