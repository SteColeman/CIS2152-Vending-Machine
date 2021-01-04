//readlineSync is used to read a users input throughout the application
const readlineSync = require("readline-sync");

//creating a prototype for all items in the vending machine
function Item() {
  this.name = "";
  this.price = "";
  this.prodNumber = "";
}

//creating an object for each item
var coke = new Item();
coke.name = "Coca~Cola";
coke.price = 0.85;
coke.prodNumber = 1;

var rio = new Item();
rio.name = "Rio";
rio.price = 0.85;
rio.prodNumber = 2;

var water = new Item();
water.name = "Water";
water.price = 0.55;
water.prodNumber = 3;

var up7 = new Item();
up7.name = "7UP";
up7.price = 0.85;
up7.prodNumber = 4;

var bournville = new Item();
bournville.name = "Bourneville";
bournville.price = 1.20;
bournville.prodNumber = 5;

var twirl = new Item();
twirl.name = "Twirl";
twirl.price = 0.75;
twirl.prodNumber = 6;

var twix = new Item();
twix.name = "Twix";
twix.price = 0.95;
twix.prodNumber = 7;

var flake = new Item();
flake.name = "Flake";
flake.price = 0.95;
flake.prodNumber = 8;

var userChoice; //global variable for the users current number choice
var userBal; //global variable for the users current balance
var userItem; //global variable for  the item the user has selected

//call the function funcorder() to start the vending machine
funcOrder()

//funcOrder() contains the functions to run the vending machine in a specific order.
function funcOrder() {
  userInterface()
  insertMoney()
  prodChoice()
  remainingBal()
  anotherPurchase()
}

//funcOrder1() is only called when a customer wants to purchase another item after the first purchase.
//the only difference to funcorder() is there is no insertMoney() function
function funcOrder1() {
  userInterface()
  prodChoice()
  remainingBal()
  anotherPurchase()
}

//prodChoice() is the function that contains the majority of the vending machines working. This asks the customer
//What item they would like using the readlineSync function and from there either tells a customer they dont have enough
//credit for the transaction or removes the price of the selected item off the users balance
//if there isnt enough money for the transaction then the addMoney() function is called
//once the addMoney() function is completed, the price ofthe selected item comes off the users balance
function prodChoice() {
  userChoice = readlineSync.question("What product would you like to choose? Key in the product number: ");
  if (userChoice == 1) {
    userItem = coke.name;
    itemPrice = coke.price;
    balanceCheck()

  } else if (userChoice == 2) {
    userItem = rio.name;
    itemPrice = rio.price;
    balanceCheck()

  } else if (userChoice == 3) {
    userItem = water.name;
    itemPrice = water.price;
    balanceCheck()

  } else if (userChoice == 4) {
    userItem = up7.name;
    itemPrice = up7.price;
    balanceCheck()

  } else if (userChoice == 5) {
    userItem = bournville.name;
    itemPrice = bournville.price;
    balanceCheck()

  } else if (userChoice == 6) {
    userItem = twirl.name;
    itemPrice = twirl.price;
    balanceCheck()

  } else if (userChoice == 7) {
    userItem = twix.name;
    itemPrice = twix.price;
    balanceCheck()

  } else if (userChoice == 8) {
    userItem = flake.name;
    itemPrice = flake.price;
    balanceCheck()

  } else if (userChoice == 9) {
    returnCredit()
    process.exit()
  }

  //checking to see if the user if happy with their product choice. if they are the item is dispensed and the item price is
  //taken away from their avaliable balance
  //if not they go back to the product choice screen
  if (readlineSync.keyInYN("\n" + "Your chosen product is: " + "\x1b[32m" + userItem + "\x1b[0m" + ", Is this correct? " + "\n")) {
    if (userChoice == "1") {
      userBal = userBal - coke.price;
      return cokeProd()

    } else if (userChoice == "2") {
      userBal = userBal - rio.price;
      return fantaProd()

    } else if (userChoice == "3") {
      userBal = userBal - water.price;
      return waterProd()

    } else if (userChoice == "4") {
      userBal = userBal - up7.price;
      return up7Prod()

    } else if (userChoice == "5") {
      userBal = userBal - bournville.price;
      return bournvilleProd()

    } else if (userChoice == "6") {
      userBal = userBal - twirl.price;
      return twirlProd()

    } else if (userChoice == "7") {
      userBal = userBal - twix.price;
      return twixProd()

    } else if (userChoice == "8") {
      userBal = userBal - flake.price;
      return flakeProd()
    } 

  } else {
    prodChoice()
  }
}


//called at the begining of the vending machine to ask a user to insert their desired amount of money
function insertMoney() {
  userBal = readlineSync.question("\x1b[32m" + "How much money would you like to insert? £" + "\x1b[0m");
  userBal = parseFloat(userBal);
  console.log(" ");
  console.log("Your balance is: " + "\x1b[32m" + "£" + userBal.toFixed(2) + "\x1b[0m" + "\n");
}

//recursive function checks to see if the user has enough credit to purchase their chosen item
//if not, they are prompted to add more money to their balance
function balanceCheck() {
  if (parseFloat(itemPrice) > parseFloat(userBal)) {
    console.log("\x1b[31m" + "You have insufficiant credit for this purchase, Please insert more money." + "\x1b[0m" + "\n");
    addMoney()
    balanceCheck()
  }
}

//function for adding more money if the userBal < itemChoice. if the user doesnt want to add any more
//money, they balance they already have in the vending machine is refunded back to them
function addMoney() {
  if (readlineSync.keyInYN("Would you like to insert more money? ")) {
    var addmoney = readlineSync.question(
      "How much money would you like to insert? £") + "\n";
    userBal = parseFloat(userBal) + parseFloat(addmoney);
    console.log("Your new balance is: " + "\x1b[32m" + "£" + userBal.toFixed(2) + "\x1b[0m" + "\n");
  } else {
    returnCredit()
    process.exit()
  }
}

//returns the users balance after they have made a purchase
function remainingBal() {
  console.log("Your remaining balance is: " + "\x1b[32m" + "£" + userBal.toFixed(2) + "\x1b[0m" + "\n");
}

//asks the user if they would like to make another purchase after they have purchased
//and recieved their product
function anotherPurchase() {
  if (readlineSync.keyInYN("Would you like to make another purchase?" + "\n")) {
    funcOrder1()
  } else {
    returnCredit()
  }
}

//whenever a refund is selected or a purchase is completed and no further purchases are needed, this function is 
//called to return the users balance back to them
function returnCredit() {
  console.log("\n" + "Thanks for choosing EHU Vending Machine, You have been refunded: " +"\x1b[32m" +"£" +userBal.toFixed(2) + "\n");
}


//user interface that is called at the very begining of the application. replication of a physical vending machine.
function userInterface() {
  console.log("________________________________________________________");
  console.log("|######################################################|");
  console.log("|###############         E  H  U         ##############|");
  console.log("|###############   V  E  N  D  I  N  G   ##############|");
  console.log("|###############   M  A  C  H  I  N  E   ##############|");
  console.log("|######################################################|");
  console.log("|######################################################|");
  console.log("|                                       ###############|");
  console.log("|    (" + coke.prodNumber +")      " + "    (" + rio.prodNumber + ")" + "          "  + "(" + water.prodNumber + ")" + "      ###############|");
  console.log("| " + coke.name + "       " + rio.name + "         " +  water.name + "     ###############|");
  console.log("|   £" + coke.price + "        £" + rio.price + "        £" + water.price + "     ###*--------*##|");
  console.log("|                                       ###| INSERT |##|");
  console.log("|    (" + up7.prodNumber +")    " + "      (" + bournville.prodNumber + ")" + "          "  + "(" + twirl.prodNumber + ")" + "      ###|  MONEY |##|");
  console.log("|    " + up7.name + "       " + bournville.name + "    " +  twirl.name + "     ###|   *-*  |##|");
  console.log("|   £" + up7.price + "         £" + bournville.price + "        £" + twirl.price + "     ###|   | |  |##|");
  console.log("|                                       ###|   *-*  |##|");
  console.log("|    (" + twix.prodNumber +")    " + "      (" + flake.prodNumber + ")" + "          "  + "(9)" + "      ###*--------*##|");
  console.log("|   " + twix.name + "         " + flake.name + "        " + "REFUND" + "    ###*-------*###|");
  console.log("|   £" + twix.price + "        £" + flake.price + "       " + "BALANCE" + "    ###| 1 2 3 |###|");
  console.log("|                                       ###| 4 5 6 |###|");
  console.log("|                                       ###| 7 8 9 |###|");
  console.log("|                                       ###*-------*###|");
  console.log("|######################################################|");
  console.log("|######################################################|");
  console.log("|######################################################|");
  console.log("|######################################################|");
  console.log("|###                                 #########*--*#####|");
  console.log("|###  C O L L E C T  P R O D U C T   #########|  |#####|");
  console.log("|###                                 #########*--*#####|");
  console.log("|######################################################|");
  console.log("|######################################################|");
  console.log("|######################################################|");
  console.log("|______________________________________________________|" + "\n");
}


//ASCII images for dispensed products
function cokeProd() {
  console.log("       _____________");
  console.log("      |_-_-_-_-_-_-_|");
  console.log("      |_____________|");
  console.log("      )_____________(");
  console.log("      (_____________)");
  console.log("      |             |");
  console.log("     /               \\");
  console.log("    /                 \\");
  console.log("   /                   \\");
  console.log("  /                     \\");
  console.log(" /                       \\");
  console.log(" (________________________)");
  console.log("  )______________________(");
  console.log(" (________________________)");
  console.log(" |\u001b[31;1m   ___ ___   ___   _\u001b[0m    |");
  console.log(" |\u001b[31;1m  / __/ _ \\ / __| /_\\\u001b[0m   |");
  console.log(" |\u001b[31;1m | (_| (_) | (__ / _ \\\u001b[0m  |");
  console.log(" |\u001b[31;1m  \\___\\___/ \\___/_/ \\_\\\u001b[0m |");
  console.log(" |                        |");
  console.log(" |\u001b[31;1m   ___ ___  _      _ \u001b[0m   |");
  console.log(" |\u001b[31;1m  / __/ _ \\| |    /_\\\u001b[0m   |");
  console.log(" |\u001b[31;1m | (_| (_) | |__ / _ \\\u001b[0m  |");
  console.log(" |\u001b[31;1m  \\___\\___/|____/_/ \\_\\\u001b[0m |");
  console.log(" |________________________|");
  console.log(" (________________________)");
  console.log(" |________________________|");
  console.log(" \\________________________/" + "\n");
}

function fantaProd() {
  console.log("       ________");
  console.log("      |_-_--_-_|");
  console.log("      |________|");
  console.log("      )________(");
  console.log("      (________)");
  console.log("      |        |");
  console.log("     /          \\");
  console.log("    /            \\");
  console.log("   /              \\");
  console.log("  /                \\");
  console.log(" /                  \\");
  console.log(" (___________________)");
  console.log("  )_________________(");
  console.log(" (___________________)");
  console.log(" |___________________|");
  console.log(" )___________________(");
  console.log(" |___________________|");
  console.log(" |\u001b[35;1m   _____  _\u001b[0m        |"); 
  console.log(" |\u001b[35;1m  |  __ \\(_)\u001b[0m       |");
  console.log(" |\u001b[35;1m  | |__) |_  ___\u001b[0m   |");
  console.log(" |\u001b[35;1m  |  _  /| |/ _ \\\u001b[0m  |");
  console.log(" |\u001b[35;1m  | | \\ \\| | (_) |\u001b[0m |");
  console.log(" |\u001b[35;1m  |_|  \\_\\_|\\___/\u001b[0m  |");
  console.log(" (___________________)");
  console.log(" |___________________|");
  console.log(" \\___________________/" + "\n");
}

function waterProd() {
  console.log("       ________");
  console.log("      |_-_--_-_|");
  console.log("      |________|");
  console.log("      )________(");
  console.log("      (________)");
  console.log("      |        |");
  console.log("     /          \\");
  console.log("    /            \\");
  console.log("   /              \\");
  console.log("  /                \\");
  console.log(" /                  \\");
  console.log(" (___________________)");
  console.log("  )_________________(");
  console.log(" (___________________)");
  console.log(" |___________________|");
  console.log(" )___________________(");
  console.log(" |___________________|");
  console.log(" |\u001b[34;1m _    _ ___   ___\u001b[0m  |");  
  console.log(" |\u001b[34;1m| |  | |__ \\ / _ \\\u001b[0m |");
  console.log(" |\u001b[34;1m| |__| |  ) | | | |\u001b[0m|");
  console.log(" |\u001b[34;1m|  __  | / /| | | |\u001b[0m|");
  console.log(" |\u001b[34;1m| |  | |/ /_| |_| |\u001b[0m|");
  console.log(" |\u001b[34;1m|_|  |_|____|\\___/\u001b[0m |");
  console.log(" (___________________)");
  console.log(" |___________________|");
  console.log(" \\___________________/" + "\n");
}

function up7Prod() {
  console.log("       ________");
  console.log("      |_-_--_-_|");
  console.log("      |________|");
  console.log("      )________(");
  console.log("      (________)");
  console.log("      |        |");
  console.log("     /          \\");
  console.log("    /            \\");
  console.log("   /              \\");
  console.log("  /                \\");
  console.log(" /                  \\");
  console.log(" (___________________)");
  console.log("  )_________________(");
  console.log(" (___________________)");
  console.log(" |___________________|");
  console.log(" )___________________(");
  console.log(" |___________________|");
  console.log(" |  \x1b[32m____  \u001b[31;1m_   _ ___\u001b[0m  |");
  console.log(" | \x1b[32m|__  |\u001b[31;1m| | | | _ \\\u001b[0m |");
  console.log(" |   \x1b[32m/ / \u001b[31;1m| |_| |  _/\u001b[0m |");
  console.log(" |  \x1b[32m/_/   \u001b[31;1m\\___/|_|\u001b[0m   |");
  console.log(" |___________________|");
  console.log(" (___________________)");
  console.log(" |___________________|");
  console.log(" \\___________________/" + "\n");
}

function bournvilleProd() {
  console.log("          _________________________________________________________");
  console.log("         / _______________________________________________________//");
  console.log("        / /                                                      //");
  console.log("       / /                                                      //");
  console.log("      / / \u001b[31;1m___  ___  _   _ ___ _  ___   _____ _    _    ___\u001b[0m     //");
  console.log("     / / \u001b[31;1m| _ )/ _ \\| | | | _ \\ \\| \\ \\ / /_ _| |  | |  | __|\u001b[0m   //");
  console.log("    / /  \u001b[31;1m| _ \\ (_) | |_| |   / .` |\\ V / | || |__| |__| _|\u001b[0m   //");
  console.log("   / /   \u001b[31;1m|___/\\___/ \\___/|_|_\\_|\\_| \\_/ |___|____|____|___|\u001b[0m //");
  console.log("  / /                                                      //");
  console.log(" / /                                                      //");
  console.log(" \\/______________________________________________________//" + "\n");
}

function twirlProd() {
  console.log("\u001b[35;1m          ________________________________________________________");
  console.log("         / _____________________________________________________//");
  console.log("        / /                                                    //");
  console.log("       / /\u001b[0m \u001b[33;1m   _________          _______ _____  _             \u001b[35;1m//");
  console.log("\u001b[35;1m      / /\u001b[33;1m    |__   __\\ \\        / /_   _|  __ \\| |\u001b[35;1m           //");
  console.log("\u001b[35;1m     / /\u001b[33;1m        | |   \\ \\  /\\  / /  | | | |__) | |\u001b[35;1m          //");
  console.log("\u001b[35;1m    / /\u001b[33;1m         | |    \\ \\/  \\/ /   | | |  _  /| |\u001b[35;1m         //");
  console.log("\u001b[35;1m   / /\u001b[33;1m          | |     \\  /\\  /   _| |_| | \\ \\| |____\u001b[35;1m    //");
  console.log("\u001b[35;1m  / /\u001b[33;1m           |_|      \\/  \\/   |_____|_|  \\_\\______|\u001b[35;1m  //");
  console.log(" / /                                                    //");
  console.log(" \\/____________________________________________________//\u001b[0m" + "\n");
}

function twixProd() {
  console.log("\u001b[33;1m          _____________________________________________________");
  console.log("         / ____________________________________________________//");
  console.log("        / /                                                   //");
  console.log("       / /\u001b[31;1m    ___________          _________   __ \u001b[33;1m           //");
  console.log("      / /\u001b[31;1m     |__   __|\\ \\        / /_   _\\ \\ / /\u001b[33;1m           //");
  console.log("     / /\u001b[31;1m         | |    \\ \\  /\\  / /  | |  \\ V /\u001b[33;1m           //");
  console.log("    / /\u001b[31;1m          | |     \\ \\/  \\/ /   | |   > <\u001b[33;1m           //");
  console.log("   / /\u001b[31;1m           | |      \\  /\\  /   _| |_ / . \\\u001b[33;1m         //");
  console.log("  / /\u001b[31;1m            |_|       \\/  \\/   |_____/_/ \\_\\\u001b[33;1m       //");
  console.log(" / /                                                   //");
  console.log(" \\/___________________________________________________//\u001b[0m" + "\n");
}

function flakeProd() {
  console.log(" \u001b[33;1m        _______________________________________________________");
  console.log("        / _____________________________________________________//");
  console.log("       / /                                                    //");
  console.log("\u001b[33;1m      / /\u001b[0m\u001b[31;1m      ______ _               _  ________     \u001b[0m \u001b[33;1m      //");
  console.log("     / /\u001b[0m \u001b[31;1m     |  ____| |        /\\   | |/ /  ____|   \u001b[0m \u001b[33;1m      //");
  console.log("    / /\u001b[0m \u001b[31;1m      | |__  | |       /  \\  | ' /| |__      \u001b[0m \u001b[33;1m     //");
  console.log("   / /\u001b[0m  \u001b[31;1m      |  __| | |      / /\\ \\ |  < |  __|    \u001b[0m \u001b[33;1m     //");
  console.log("  / /\u001b[0m  \u001b[31;1m       | |    | |____ / ____ \\| . \\| |____   \u001b[0m \u001b[33;1m    //");
  console.log(" / /\u001b[0m  \u001b[31;1m        |_|    |______/_/    \\_\\_|\\_\\______| \u001b[0m \u001b[33;1m    //");
  console.log("/ /                                                    //");
  console.log("\\/____________________________________________________// \u001b[0m" + "\n");
}


//drink bottles from https://ascii.co.uk/art/bottle
//ascii text http://patorjk.com/software/taag/#p=display&h=2&v=2&f=Small&t=7%20UP%0A
// text colour found https://www.lihaoyi.com/post/BuildyourownCommandLinewithANSIescapecodes.html

//idea: add in a "woud you like to add more money to your balance y/n when calling func order1"