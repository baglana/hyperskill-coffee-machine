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

function Coffee(id, name, water, milk, coffeeBeans, price) {
  this.id = id;
  this.name = name;
  this.ingredients = [
    new Ingredient("water", water, "ml"),
    new Ingredient("milk", milk, "ml"),
    new Ingredient("coffeeBeans", coffeeBeans, "g"),
  ];
  this.price = price;
}

const coffeeFlavors = [
  new Coffee(1, "espresso", 250, 0, 16, 4),
  new Coffee(2, "latte", 350, 75, 20, 7),
  new Coffee(3, "cappuccino", 200, 100, 12, 6)
];

function CoffeeMachine(water, milk, coffeeBeans, dispCups, money) {
  this.water = water;
  this.milk = milk;
  this.coffeeBeans = coffeeBeans;
  this.dispCups = dispCups;
  this.money = money;
  
  this.printState = () => {
    console.log("The coffee machine has:");
    console.log(`${this.water} ml of water`);
    console.log(`${this.milk} ml of milk`);
    console.log(`${this.coffeeBeans} g of coffee beans`);
    console.log(`${this.dispCups} disposable cups`);
    console.log(`$${this.money} of money\n`);
  };
  
  this.replenishSupplies = () => {
    this.water += Number(input(
      "Write how many ml of water you want to add:\n"));
    this.milk += Number(input(
      "Write how many ml of milk you want to add:\n"));
    this.coffeeBeans += Number(input(
      "Write how many grams of coffee beans you want to add:\n"));
    this.dispCups += Number(input(
      "Write how many disposable cups you want to add:\n"));
    console.log();
  };

  this.askForChoice = () => {
    let prompt = "What do you want to buy? ";
    coffeeFlavors.forEach((flavor) => {
      prompt += `${flavor.id} - ${flavor.name}, `;
    })
    prompt = prompt.slice(0, -2);
    prompt += ":\n";
    return input(prompt);
  }
  
  this.processOrder = (id) => {
    const flavor = coffeeFlavors.find(f => f.id === id);
    let insufficientIngredient;
    flavor.ingredients.forEach(ingredient => {
      if (this[ingredient.name] < ingredient.amount) {
        insufficientIngredient = ingredient.name;
      }
    });
    if (insufficientIngredient !== undefined) {
      console.log(`Sorry, not enough ${insufficientIngredient}!\n`);
      return;
    }
    console.log("I have enough resources, making you a coffee!\n");
    flavor.ingredients.forEach(ingredient => {
      this[ingredient.name] -= ingredient.amount;
    });
    this.dispCups--;
    this.money += flavor.price;
  }
  
  this.sell = () => {
    let choice = this.askForChoice();
    if (choice === "back") return;
    this.processOrder(Number(choice));
  }

  this.giveMoney = () => {
    const givenMoney = this.money;
    this.money -= givenMoney;
    console.log(`I gave you $${givenMoney}\n`);
  }

  this.promptUser = () => {
    let choice;
    do {
      console.log("Write action (buy, fill, take, remaining, exit):");
      choice = input();
      console.log();

      switch (choice) {
        case "buy":
          this.sell();
          break;
        case "fill":
          this.replenishSupplies();
          break;
        case "take":
          this.giveMoney();
          break;
        case "remaining":
          this.printState();
          break;
        default:
          break;
      }
    } while (choice !== "exit");
  }

  this.start = () => {
    this.promptUser();
  }
  
}

const coffeeMachine
  = new CoffeeMachine(400, 540, 120, 9, 550);
coffeeMachine.start();