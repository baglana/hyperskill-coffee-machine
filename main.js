// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input');

/*
console.log(
`Starting to make a coffee
Grinding coffee beans
Boiling water
Mixing boiled water with crushed coffee beans
Pouring coffee into the cup
Pouring some milk into the cup
Coffee is ready!`
);
*/

function Ingredient(name, amount, unit) {
  this.name = name;
  this.amount = amount;
  this.unit = unit;
}

const coffee = [
  new Ingredient("water", 200, "ml"),
  new Ingredient("milk", 50, "ml"),
  new Ingredient("coffee beans", 15, "g")
];

let coffeeMachine = {
  readSuppliesAmount() {
    coffee.forEach((ingredient) => {
      let prompt= `Write how many ${ingredient.unit}`;
      prompt += ` of ${ingredient.name} the coffee machine has:\n`;
      this[ingredient.name] = input(prompt);
    })
    // console.log(`Available cups: ${this.getAvailableCups()}`);
  },

  getAvailableCups() {
    let availableCups = Infinity;
    coffee.forEach((ingredient) => {
      availableCups = Math.min(availableCups
        , Math.floor(this[ingredient.name] / ingredient.amount));
    });
    return availableCups;
  },

  readOrder() {
    const prompt = "Write how many cups of coffee you will need:\n";
    this.orderedCups = input(prompt);
  },

  processOrder() {
    const diff = this.getAvailableCups() - this.orderedCups;
    const enoughSuppliesMsg
      = "Yes, I can make that amount of coffee";
    const notEnoughSuppliesMsg
        = `No, I can make only ${this.getAvailableCups()} cups of coffee`;
    const extraSuppliesMsg
        = ` (and even ${diff} more than that)`;
    let response = "";
    if (diff < 0) {
      response = notEnoughSuppliesMsg;
    } else {
      response = enoughSuppliesMsg;
      if (diff > 0) response += extraSuppliesMsg;
    }
    console.log(response);
  },

  init() {
    this.readSuppliesAmount();
    this.readOrder();
    this.processOrder();
  }
};

coffeeMachine.init();