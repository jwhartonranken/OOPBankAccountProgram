"using strict";

// BankAccount Default Values
const DEFFIRST = "John";
const DEFLAST = "Smith";
const DEFACCNUM = 0;
const DEFBALANCE = 0.0;
const randAccNum = () => {
    return Math.floor(Math.random() * (1000) + 1); //The maximum is inclusive and the minimum is inclusive
  }
  
// BankAccount Constant Values
const MINSAVINGSBAL = 100.0;
const MINCHECKINGBAL = 50.0;
const MINCHRISTMASBAL = 10.0;
const SAVINGSINTERESTRATE = 0.02;
let christmasClubDate = new Date();
christmasClubDate.setMonth(10);
christmasClubDate.setDate(1);
const EARLIESTCHRISTMASDATE = christmasClubDate;

class BankAccount {
    constructor(
        firstName       = DEFFIRST,
        lastName        = DEFLAST,
        balance         = DEFBALANCE,
        accNum          = randAccNum()  
    ){
        this.firstName  = firstName;
        this.lastName   = lastName;
        this.balance    = balance;
        this.accNum     = accNum;
    }

    get currentBalance () {
        this.balanceToString(0);
    }
    deposit(dollars) {
        console.log(`ATTEMPTING TO DEPOSIT ${dollars} TO ${this.firstName} ${this.lastName}'S ACCOUNT...`);
        let isValid = true;

        dollars = parseFloat(dollars);

        if (isNaN(dollars) || dollars < 0) {
            isValid = false;
            console.log("DEPOSIT FAILED. INVALID ENTRY");
        }

        if (isValid) {
            this.balance += dollars;
            this.balanceToString(1);
        }
    }

    withdrawal(dollars) {
        console.log(`ATTEMPTING TO WITHDRAW ${dollars} FROM ${this.firstName} ${this.lastName}'S ACCOUNT...`);
        let isValid = true;

        dollars = parseFloat(dollars);

        if (isNaN(dollars) || dollars < 0) {
            isValid = false;
            console.log("WITHDRAWAL FAILED. INVALID ENTRY");
        }

        if (isValid) {
            this.balance -= dollars;
            this.balanceToString(2)
        }
    }

    balanceToString(moneyTaken) {

        switch(moneyTaken) {
            case 0:
                console.log(this.firstName + ", your balance is " + this.balance +".")
                break;
            case 1:
                console.log("DEPOSIT SUCCESSFUL: " + this.firstName + ", your new balance is " + this.balance +".");
                break;
            case 2:
                console.log("WITHDRAWAL SUCCESSFUL: " + this.firstName + ", your new balance is " + this.balance +".");
                break;
            case 3:
                console.log("Happy New Year! " + this.firstName + ", your new balance is " + this.balance +".");
                break;
            default:
                break;
        }

        
    }
}

class SavingsAccount extends BankAccount {
    constructor(
        firstName       = DEFFIRST,
        lastName        = DEFLAST,
        balance         = MINSAVINGSBAL,
        accNum          = randAccNum(),
        interest        = SAVINGSINTERESTRATE
    ){
        super(firstName, lastName, balance, accNum);
        this.interest   = interest;
    }

    annualInterest() {
        let currentDollars = this.balance;
        
        currentDollars += (currentDollars * this.interest);

        this.balance = currentDollars;

        this.balanceToString(3);
    }

    withdrawal(dollars) {
        console.log(`ATTEMPTING TO WITHDRAW ${dollars} FROM ${this.firstName} ${this.lastName}'S ACCOUNT...`);
        let isValid = true;

        dollars = parseFloat(dollars);

        if (isNaN(dollars) || dollars < 0) {
            isValid = false;
            console.log("WITHDRAWAL FAILED. INVALID ENTRY");
        }

        if ((this.balance - dollars) < MINSAVINGSBAL) {
            isValid = false;
            console.log(`WITHDRAWAL FAILED. THIS PROCESS WOULD PUT ${this.firstName.toUpperCase()} BELOW ${MINSAVINGSBAL} DOLLARS.`)
        }
        if (isValid) {
            this.balance -= dollars;
            this.balanceToString(2)
        }
    }
}

class CheckingAccount extends BankAccount {
    constructor(
        firstName       = DEFFIRST,
        lastName        = DEFLAST,
        balance         = MINCHECKINGBAL,
        accNum          = randAccNum()
    ){
        super(firstName, lastName, balance, accNum);
    }

    withdrawal(dollars) {
        let isValid = true;
        console.log(`ATTEMPTING TO WITHDRAW ${dollars} FROM ${this.firstName} ${this.lastName}'S ACCOUNT...`);
        dollars = parseFloat(dollars);

        if (isNaN(dollars) || dollars < 0) {
            isValid = false;
            console.log("WITHDRAWAL FAILED. INVALID ENTRY");
        }

        if ((this.balance - dollars) < MINCHECKINGBAL) {
            isValid = false;
            console.log(`WITHDRAWAL FAILED. THIS PROCESS WOULD PUT ${this.firstName.toUpperCase()} BELOW ${MINCHECKINGBAL} DOLLARS.`)
        }
        if (isValid) {
            this.balance -= dollars;
            this.balanceToString(2)
        }
    }
}

class ChristmasClubAccount extends BankAccount {
    constructor(
        firstName       = DEFFIRST,
        lastName        = DEFLAST,
        balance         = MINCHRISTMASBAL,
        accNum          = randAccNum()
    ){
        super(firstName, lastName, balance, accNum);
    }

    withdrawal(dollars) {
        console.log(`ATTEMPTING TO WITHDRAW ${dollars} FROM ${this.firstName} ${this.lastName}'S ACCOUNT...`);
        let isValid = true;

        dollars = parseFloat(dollars);

        if (!(this.compareTime)) {
            isValid = false;
            console.log("WITHDRAWAL FAILED. WAIT UNTIL NOVEMBER 1ST.");
        }

        if (isNaN(dollars) || dollars < 0) {
            isValid = false;
            console.log("WITHDRAWAL FAILED. INVALID ENTRY");
        }

        if ((this.balance - dollars) < MINCHRISTMASBAL) {
            isValid = false;
            console.log(`WITHDRAWAL FAILED. THIS PROCESS WOULD PUT ${this.firstName.toUpperCase()} BELOW ${MINCHRISTMASBAL} DOLLARS.`)
        }
        if (isValid) {
            this.balance -= dollars;
            this.balanceToString(2)
        }
    }

    compareTime() {
        return new Date() >= christmasClubDate; // true if time1 is later
    }
}