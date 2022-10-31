//class for product
export class Product {
    constructor(name, description, price, quantity) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
    }
}

//class for transaction
export class Transaction {
    constructor(email, product, quantity, type = 'sell', cost = 0) {
        this.email = email;
        this.productId = product.id;
        this.quantity = quantity;
        this.price = product.price;
        this.date = Date.now();
        this.type = type;
        this.cost = cost;
    }
}

//The calculator class
export class AfterSaleCalculator {
    constructor(transactions, products) {
        this.transactions = transactions;
        this.products = products;
    }
    //function to calculate daily sales
    calculateDailySales = (date) => {
        let cost = 0;
        let income = 0;
        let profit = 0;

        let transactions = getDailyTransactions(date, this.transactions);

        cost = getDailyCost(transactions);
        income = getDailySales(transactions);

        profit = income.total - cost.total;

        let gain = loss = 0;
        if (profit > 0) {
            gain = profit;
        } else {
            loss = profit * -1;
        }

        return {cost, income, profit, loss, gain, transactions, date};

    }

    //function to calculate sales of more than 1 day
    calculateMoreDays = (dates) => {
        let results = [];
        dates.forEach(date => {
            results.push(this.calculateDailySales(date))
        });

        let cost, income, profit, loss, gain = 0;

        results.forEach(sale => {
            cost += sale.cost;
            income += sale.income;
            profit += sale.profit;
            loss += sale.loss;
            gain += sale.gain;
        });

        return {cost, income, profit, loss, gain};
    }
}

//function to create searchable date
export const createSearchableDate = (date) => {
    let newDate = new Date(date);
    let searchableDate = '';

    searchableDate += newDate.getFullYear().toString();
    searchableDate += newDate.getMonth().toString();
    searchableDate += newDate.getDay().toString();

    return searchableDate;
}

//fucntion to get transactions of a certain day
export const getDailyTransactions = (date, transactions) => {
    let searchableDate = createSearchableDate(date.toString());
    let tmpTransactions = [];

    transactions.forEach(transaction => {
        let dateToSearch = createSearchableDate(transaction.date);
        if (dateToSearch === searchableDate) {
            tmpTransactions.push({...transaction});
        }
    });

    return {date:date, transactions:tmpTransactions};

}

//function to get the cost from daily transactions
export const getDailyCost = (dailyTransactions) => {
    let total = 0;
    let transactions = [];
    
    dailyTransactions.forEach(transaction => {
        if (transaction.type === 'buy') {
            total += (transaction.price * transaction.quantity);
            transactions.push({...transaction});
        }
    })

    return {total: total, transactions: transactions};
}

//function to get the income from daily expenditures
export const getDailySales = (dailyTransactions) => {
    let total = 0;
    let transactions = [];
    
    dailyTransactions.forEach(transaction => {
        if (transaction.type === 'sell') {
            total += (transaction.price * transaction.quantity);
            transactions.push({...transaction});
        }
    })

    return {total: total, transactions: transactions};
}