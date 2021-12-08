let accountArray = [];
let accountCount = 1;
let accountIndex = 0;



window.addEventListener('load', (event) => {
    console.log("Welcome to Big Money Official Bank!");
    spawnUser(0, "Emily", "Brown", 1200.0, accountCount);
    spawnUser(1, "Johnathan", "Burger", 10000.0, accountCount);
    spawnUser(2, "Noah", "Morrison", 1460, accountCount);
    spawnUser(3, "Santa", "Claus", 4000, accountCount);
    spawnUser(2, "Duncan", "Idaho", 3000.0, accountCount);
    spawnUser(2, "Jessica", "Atreides", 1215200.0, accountCount);
    spawnUser(3, "Leto", "Atreides", 94321650.0, accountCount);
    spawnUser(1, "Vladimir", "Harkonnen", 5271300.0, accountCount);
    spawnUser(0, "Feyd-Rautha", "Harkonnen", 51230.0, accountCount);
    spawnUser(3, "Rabban", "Harkonnen", 71601.0, accountCount);
    spawnUser(1, "Thor", "Odinson", 6214.0, accountCount);
    spawnUser(2, "Liet", "Kynes", 2100.0, accountCount);
    spawnUser(1, "Stilgar", "Fremen", 6221.0, accountCount);
    spawnUser(2, "Chani", "Fremen", 1000.0, accountCount);
    console.log("\n\n\n");

    console.log("=== TESTING DEPOSITS (ONE FROM EACH CLASS) ===");
    depositToAccount(1, 200);
    depositToAccount(2, 500);
    depositToAccount(3, 700);
    depositToAccount(4, 300);
    console.log("\n\n\n");

    console.log("=== TESTING WITHDRAWALS (ONE FROM EACH CLASS) ===");
    withdrawFromAccount(1, 10);
    withdrawFromAccount(2, 200);
    withdrawFromAccount(3, 300);
    withdrawFromAccount(4, 200);
    console.log("\n\n\n");

    console.log("=== ADDING 2 SAVINGS ACCOUNTS AND CHECKING IF PROGRAM WILL ADD INTEREST TO ALL SAVINGS ACCOUNTS ===");
    spawnUser(1, "Gurney", "Halleck", 4000, accountCount);
    spawnUser(1, "Paul", "Atreides", 50000, accountCount);
    yearPasses();
    console.log("\n\n\n");

    console.log("=== NEXT: TESTING THE PROGRAM ===");
    console.log("=== ATTEMPTING TO WITHDRAW TOO MUCH MONEY FROM ACCOUNTS (EXCLUDING BANK ACCOUNT AS THERE'S NO MINIMUM) ===");
    withdrawFromAccount(8, 10000000000);
    withdrawFromAccount(3,2000);
    withdrawFromAccount(10, 80000);
    console.log("\n\n\n");

    console.log("=== ATTEMPTING TO WITHDRAW BAD VALUES FROM ACCOUNTS ===");
    withdrawFromAccount(1, "Emily");
    withdrawFromAccount(8, "Hello!");
    withdrawFromAccount(3, "Give me money, please");
    withdrawFromAccount(10, -200);
    console.log("\n\n\n");

    console.log("=== ATTEMPTING TO WITHDRAW/DEPOSIT USING INVALID ACCOUNT NUMBERS/INVALID ENTRIES ===");
    withdrawFromAccount(100, 2);
    depositToAccount(400, 14);
    withdrawFromAccount("Emily", 200);
    depositToAccount("Gurney", 2000);
    console.log("\n\n\n");

    console.log("=== CLEARING LIST AND THEN TESTING FOR EMPTY PARAMETER CREATION ===");
    clearList();
    spawnUser(0);
    spawnUser(1);
    spawnUser(2);
    spawnUser(3);
    console.log("\n\n\n");

    console.log("=== CLEARING LIST AND ATTEMPTING TO CREATE ACCOUNTS WITH INVALID BALANCES (EXCLUDING BANK ACCOUNT AS THERE'S NO MINIMUM) ===");
    clearList();
    spawnUser(1, "Emily", "Brown", 0, accountCount);
    spawnUser(2, "Emily", "Brown", 0, accountCount);
    spawnUser(3, "Emily", "Brown", 0, accountCount);

});

const spawnUser = (accountType, firstName, lastName, balance, accNum) => {
    let type = "";
    switch(accountType) {
        case 0:
            accountArray[accountIndex] = new BankAccount(firstName, lastName, balance, accNum);
            type = "bank";
            break;
        case 1:
            if (balance < MINSAVINGSBAL) {
                console.log(`ACCOUNT FAILURE: Savings Accounts must have a minimum of ${MINSAVINGSBAL} upon opening.`)
            }
            else {
                accountArray[accountIndex] = new SavingsAccount(firstName, lastName, balance, accNum);
                type = "savings";
            }
            break;
        case 2:
            if (balance < MINCHECKINGBAL) {
                console.log(`ACCOUNT FAILURE: Checking Accounts must have a minimum of ${MINCHECKINGBAL} upon opening.`)
            }
            else {
                accountArray[accountIndex] = new CheckingAccount(firstName, lastName, balance, accNum);
                type = "checking";
            }
            break;
        case 3:
            if (balance < MINCHRISTMASBAL) {
                console.log(`ACCOUNT FAILURE: Christmas Accounts must have a minimum of ${MINCHRISTMASBAL} upon opening.`)
            }
            else {
                accountArray[accountIndex] = new ChristmasClubAccount(firstName, lastName, balance, accNum);
                type = "Christmas";
            }
            break;
        default:
            break;
    }
    
    if(!(type === "")) {
        console.log("Created new " + type + " account (Account Number " + accountArray[accountIndex].accNum + "): " + accountArray[accountIndex].firstName + " " + accountArray[accountIndex].lastName + " with a balance of " + accountArray[accountIndex].balance);

        accountCount++;
        accountIndex++;
    }
    
    
   
}

const withdrawFromAccount = (accNum, dollars) => {
    let index = null;

    accNum = parseInt(accNum);

    if (isNaN(accNum)) {
        console.log("Invalid account number entered. Please enter a number between " + 1 + " and " + accountCount + ".");
    }
    else {
        for (let lcv = 0; lcv < accountArray.length; lcv++) {
            if (accountArray[lcv].accNum === accNum) {
                index = lcv;
            }   
        }
    
        if(index == null) {
            console.log("Couldn't find an account with that number.");
        }
        else {
            accountArray[index].withdrawal(dollars);
        }
    }
    
}

const depositToAccount = (accNum, dollars) => {
    let index = null;

    accNum = parseInt(accNum);

    if (isNaN(accNum)) {
        console.log("Invalid account number entered. Please enter a number between " + 1 + " and " + accountCount + ".");
    }
    else {
        for (let lcv = 0; lcv < accountArray.length; lcv++) {
            if (accountArray[lcv].accNum === accNum) {
                index = lcv;
            }   
        }
    
        if(index == null) {
            console.log("Couldn't find an account with that number.");
        }
        else {
            accountArray[index].deposit(dollars);
        }
    }
    
}

const yearPasses = () => {
    for (let lcv = 0; lcv < accountArray.length; lcv++) {
        if (accountArray[lcv] instanceof SavingsAccount) {
            accountArray[lcv].annualInterest();
        }
    }
}

const clearList = () => {
    accountArray.length = 0;
    accountCount = 1;
    accountIndex = 0;
}