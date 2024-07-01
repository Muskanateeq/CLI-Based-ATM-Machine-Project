#! usr/bin/env node
import inquirer from "inquirer";
import { faker } from "@faker-js/faker";
const createUser = () => {
    let users = [];
    for (let i = 0; i <= 10; i++) {
        let user = {
            id: i,
            pin: 1000 + i,
            name: faker.person.fullName(),
            accountnumber: Math.floor(100000000 * Math.random() * 900000000),
            balance: 1000000 * i,
        };
        users.push(user);
    }
    return users;
};
// atm machine
const atmMachine = async (users) => {
    let res = await inquirer.prompt({
        type: "number",
        name: "pin",
        message: "Enter pin code",
    });
    const user = users.find(value => value.pin == res.pin);
    if (user) {
        console.log(`Welcome ${user.name}`);
        atmFunction(user);
        return;
    }
    else {
        console.log("Invalid pin code");
    }
};
// atm function
const atmFunction = async (user) => {
    let ans = await inquirer.prompt({
        type: "list",
        name: "select",
        message: "What do you want",
        choices: ["Withdraw", "Balance", "Fast cash", "Deposit", "Exit"],
    });
    if (ans.select == "Withdraw") {
        const amount = await inquirer.prompt({
            type: "number",
            name: "rupee",
            message: "How much amount do you want to withdraw",
        });
        if (amount.rupee > user.balance) {
            return console.log("Insufficient balance for withdrawal!");
        }
        if (amount.rupee > 100000) {
            return console.log("You cannot withdraw this amount. Please input a smaller amount.");
        }
        console.log(`Withdrawn amount: ${amount.rupee}`);
        console.log(`Remaining balance: ${user.balance - amount.rupee}`);
    }
    if (ans.select == "Balance") {
        console.log(`Balance ${user.balance}`);
        return;
    }
    if (ans.select == "Fast cash") {
        const currency = await inquirer.prompt({
            type: "list",
            name: "select",
            message: "Select any one",
            choices: ["500", "1000", "5000"],
        });
        console.log(`Withdrawn amount: ${currency.select}`);
        console.log(`Remaining balance: ${user.balance - currency.select}`);
    }
    if (ans.select == "Deposit") {
        const deposit = await inquirer.prompt({
            type: "number",
            name: "rupee",
            message: "How much amount do you want to deposit",
        });
        console.log(`Deposite amount ${deposit.rupee}`);
        console.log(`Total amount ${user.balance + deposit.rupee}`);
    }
    if (ans.select == "Exit") {
        console.log("Thank you for using our ATM!");
    }
};
const users = createUser();
atmMachine(users);
