## CIS2152 Web Coding Vending Machine CLI Application

This is a simple command line vending machine built in year 2 of University. The brief was to design a working vending machine for users to interact with. There was 5 main requirements to this project. 1. View the list of products (each product must have a name & price). 2. View the amount of credit the user has. 3. Add credit. 4. Purchase a product. 5. Ask for a refund of their credit. in addition to these 5 requirements i also added in a add more money feature. This gives the uiser the option to add more credit to their balance if they dont have enough to make a purchase. 

## Installation 
````
$ git clone https://github.com/SteColeman/CIS2152-Vending-Machine
$ cd /path/to/the/file/
$ npm install readline-sync
$ node vendingMachine.js
````

## Instructions
****
Upon opening the vending machine, you will be displayed an interface, containing all the products available in the vending machine. When prompted insert your desired balance in pounds and pence. If you would like to add five pounds simply enter the number 5 and press the return key. If you would like to add eighty pence, then enter 0.8. once you have entered your desired balance press return on the keyboard.
 
Once this is done the vending machine will confirm your balance to you. You will then be prompted to choose a product from the vending machine. The products are all numbered, 1-8, and priced individually. There is an option 9 if you decide you want to be refunded immediately and not want to purchase anything from the machine. If you do make a selection, enter your desired product number and press return. you will get a prompt with your chosen product and you will be asked to confirm if this is correct. This is a simple yes/no choice, and you will only need to type wither y or n to confirm this. If your chosen product is wrong, press n and you will be asked to choose a product again.

When you have confirmed your product choice, your item will be dispensed to you. after this you will get an option to either make another purchase or get any remaining credit refunded to you. press y to make another purchase or n to get a refund. If you press y, you will see the vending machine interface again and you will be asked to make a product choice. If you press n you will get a prompt telling you how much you have been refunded.
If you would like to run the application again simply enter the command node vendingMachine.js and hit enter. Pressing the up arrow on your keyboard will remove the need to type the command out again, once the command is showing, hit enter to start the application.
****