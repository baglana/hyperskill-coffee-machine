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

const readCups = () => {
  const prompt = "Write how many cups of coffee you will need:\n";
  return input(prompt);
};

const calcIngredients = (cups) => {
  console.log(`For ${cups} cups of coffee you will need:`);

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

  coffee.forEach((ingredient) => {
    let line = ingredient.amount * cups + " ";
    line += ingredient.unit + " of ";
    line += ingredient.name;
    console.log(line);
  })
}

calcIngredients(readCups());