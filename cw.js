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

var up7 = new Item();
up7.name = "7UP";
up7.price = 0.85;
up7.prodNumber = 4;

var water = new Item();
water.name = "Water";
water.price = 0.55;
water.prodNumber = 3;

var bournville = new Item();
bournville.name = "Bourneville";
bournville.price = 1.00;
bournville.prodNumber = 5;

var twirl = new Item();
twirl.name = "Twirl";
twirl.price = 0.75;
twirl.prodNumber = 6;

var twix = new Item();
twix.name = "Twix";
twix.price = 0.85;
twix.prodNumber = 7;

var flake = new Item();
flake.name = "Flake";
flake.price = 0.85;
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
  question()
}

//funcOrder1() is only called when a customer wants to purchase another item after the first purchase.
//the only difference to funcorder() is there is no insertMoney() function
function funcOrder1() {
  userInterface()
  prodChoice()
  remainingBal()
  question()
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
  if (readlineSync.keyInYN("Your chosen product is: " + "\x1b[32m" + userItem + "\x1b[0m" + ", Is this correct? " + "\n")) {
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

//recursive function checks to see if the user has enough credit to purchase their chosen item
//if not, they are prompted to add more money to their balance
function balanceCheck() {
  if (parseFloat(itemPrice) > parseFloat(userBal)) {
    console.log("\x1b[31m" + "You have insufficiant credit for this purchase, Please insert more money." + "\x1b[0m" + "\n");
    addMoney()
    balanceCheck()
  }
}

//called at the begining of the vending machine to ask a user to insert their desired amount of money
function insertMoney() {
  userBal = readlineSync.question("How much money would you like to insert? £");
  console.log(" ");
  console.log("Your balance is: " + "\x1b[32m" + "£" + userBal + "\x1b[0m" + "\n");
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
function question() {
  if (readlineSync.keyInYN("Would you like to make another purchase?" + "\n")) {
    funcOrder1()
  } else {
    returnCredit()
  }
}

function returnCredit() {
  console.log("Thanks for choosing EHU Vending Machine, You have been refunded: " +"\x1b[32m" +"£" +userBal.toFixed(2) + "\n");
  userBal = 0.00;
}

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
  console.log("|   £" + up7.price + "         £" + bournville.price + "          £" + twirl.price + "     ###|   | |  |##|");
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
  console.log("|------------------------------------------------------|");
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
  console.log(" |   ___ ___   ___   _    |");
  console.log(" |  / __/ _ \\ / __| /_\\   |");
  console.log(" | | (_| (_) | (__ / _ \\  |");
  console.log(" |  \\___\\___/ \\___/_/ \\_\\ |");
  console.log(" |                        |");
  console.log(" |   ___ ___  _      _    |");
  console.log(" |  / __/ _ \\| |    /_\\   |");
  console.log(" | | (_| (_) | |__ / _ \\  |");
  console.log(" |  \\___\\___/|____/_/ \\_\\ |");
  console.log(" |________________________|");
  console.log(" (________________________)");
  console.log(" |________________________|");
  console.log(" \\________________________/");
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
  console.log(" |   _____  _        |"); 
  console.log(" |  |  __ \\(_)       |");
  console.log(" |  | |__) |_  ___   |");
  console.log(" |  |  _  /| |/ _ \\  |");
  console.log(" |  | | \\ \\| | (_) | |");
  console.log(" |  |_|  \\_\\_|\\___/  |");
  console.log(" (___________________)");
  console.log(" |___________________|");
  console.log(" \\___________________/");
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
  console.log(" | _    _ ___   ___  |");  
  console.log(" || |  | |__ \\ / _ \\ |");
  console.log(" || |__| |  ) | | | ||");
  console.log(" ||  __  | / /| | | ||");
  console.log(" || |  | |/ /_| |_| ||");
  console.log(" ||_|  |_|____|\\___/ |");
  console.log(" (___________________)");
  console.log(" |___________________|");
  console.log(" \\___________________/");
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
  console.log(" |  ____  _   _ ___  |");
  console.log(" | |__  || | | | _ \\ |");
  console.log(" |   / / | |_| |  _/ |");
  console.log(" |  /_/   \\___/|_|   |");
  console.log(" |___________________|");
  console.log(" (___________________)");
  console.log(" |___________________|");
  console.log(" \\___________________/");
}

function twixProd() {
  console.log("          _____________________________________________________");
  console.log("         / ____________________________________________________//");
  console.log("        / /                                                   //");
  console.log("       / /    ___________          _________   __            //");
  console.log("      / /     |__   __|\\ \\        / /_   _\\ \\ / /           //");
  console.log("     / /         | |    \\ \\  /\\  / /  | |  \\ V /           //");
  console.log("    / /          | |     \\ \\/  \\/ /   | |   > <           //");
  console.log("   / /           | |      \\  /\\  /   _| |_ / . \\         //");
  console.log("  / /            |_|       \\/  \\/   |_____/_/ \\_\\       //");
  console.log(" / /                                                   //");
  console.log(" \\/___________________________________________________//");
}

function bournvilleProd() {
  console.log("          ______________________________________________________");
  console.log("         / _____________________________________________________//");
  console.log("        / /                                                    //");
  console.log("       / /                                                     //");
  console.log("      / /___  ___  _   _ ___ _  ___   _____ _    _    ___     //");
  console.log("     / /| _ )/ _ \\| | | | _ \\ \\| \\ \\ / /_ _| |  | |  | __|  //");
  console.log("    / / | _ \\ (_) | |_| |   / .` |\\ V / | || |__| |__| _|  //");
  console.log("   / /  |___/\\___/ \\___/|_|_\\_|\\_| \\_/ |___|____|____|___|//");
  console.log("  / /                                                     //");
  console.log(" / /                                                     //");
  console.log(" \\/____________________________________________________//");
}

function twirlProd() {
  console.log("          _______________________________________________________");
  console.log("         / _____________________________________________________//");
  console.log("        / /                                                    //");
  console.log("       / /    _________          _______ _____  _             //");
  console.log("      / /    |__   __\\ \\        / /_   _|  __ \\| |           //");
  console.log("     / /        | |   \\ \\  /\\  / /  | | | |__) | |          //");
  console.log("    / /         | |    \\ \\/  \\/ /   | | |  _  /| |         //");
  console.log("   / /          | |     \\  /\\  /   _| |_| | \\ \\| |____    //");
  console.log("  / /           |_|      \\/  \\/   |_____|_|  \\_\\______|  //");
  console.log(" / /                                                    //");
  console.log(" \\/___________________________________________________//");
}

function flakeProd() {
  console.log("          _______________________________________________________");
  console.log("         / _____________________________________________________//");
  console.log("        / /                                                    //");
  console.log("       / /      ______ _               _  ________            //");
  console.log("      / /      |  ____| |        /\\   | |/ /  ____|          //");
  console.log("     / /       | |__  | |       /  \\  | ' /| |__            //");
  console.log("    / /        |  __| | |      / /\\ \\ |  < |  __|          //");
  console.log("   / /         | |    | |____ / ____ \\| . \\| |____        //");
  console.log("  / /          |_|    |______/_/    \\_\\_|\\_\\______|      //");
  console.log(" / /                                                    //");
  console.log(" \\/___________________________________________________//");
}


//drink bottles from https://ascii.co.uk/art/bottle
//ascii text http://patorjk.com/software/taag/#p=display&h=2&v=2&f=Small&t=7%20UP%0A
// text colour found https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color

//idea: add in a "woud you like to add more money to your balance y/n when calling func order1"