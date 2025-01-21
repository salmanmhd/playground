"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// amount are in rupees
let nextOrderId = 1;
let nextPizzaId = 1;
const menu = [
    { id: nextPizzaId++, name: 'Margherita', price: 120 },
    { id: nextPizzaId++, name: 'Pepperoni', price: 150 },
    { id: nextPizzaId++, name: 'Hawaiian', price: 180 },
    { id: nextPizzaId++, name: 'Veggie', price: 160 },
    { id: nextPizzaId++, name: 'Cheese', price: 140 },
];
let cashInRegister = 1000;
const orderQueue = [];
const newPizza = { name: 'kabab pizza', price: 150 };
addNewPizza(newPizza);
function addNewPizza(pizzaObj) {
    const pizza = Object.assign(Object.assign({}, pizzaObj), { id: nextPizzaId++ });
    menu.push(pizza);
}
console.log(menu);
function placeOrder(pizzaName) {
    const selectedPizza = menu.find((pizzaObj) => pizzaObj.name === pizzaName);
    if (!selectedPizza)
        throw new Error('no pizza found');
    cashInRegister += Number(selectedPizza.price);
    const newOrder = {
        id: nextOrderId++,
        pizza: selectedPizza,
        status: 'ordered',
    };
    orderQueue.push(newOrder);
    return newOrder;
}
function completeOrder(orderId) {
    const order = orderQueue.find((el) => el.id === orderId);
    if (!order)
        throw new Error('no order found with that id');
    order.status = 'completed';
    return order;
}
function getPizzaDetail(identifier) {
    if (typeof identifier === 'string') {
        const newPizza = menu.find((el) => el.name === identifier);
        if (!newPizza)
            throw new Error('pizza not found');
        return newPizza;
    }
    else {
        return menu.find((el) => el.id === identifier);
    }
}
addNewPizza({ name: 'bbq chicken pizza', price: 120 });
