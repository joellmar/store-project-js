export class Product {
    static #idCounter = 1;
    
    #id;
    #name;
    #price;
    #units;

    constructor(name, price, units = 0) {
        this.#id = Product.#idCounter ++;
        this.#name = name;
        this.#price = price;
        this.#units = Math.trunc(units);
    }

    static get idCounter() {
        return Product.#idCounter;
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get price() {
        return this.#price;
    }

    get units() {
        return this.#units;
    }

    changeUnits(units) {
        this.#units += units;
    }

    productImport() {
        const total = this.#price * this.#units;

        return Number(total.toFixed(2));
    }

    toString() {
        return `${this.#name} (${this.#units}): ${this.#price.toFixed(2)} €/u => ${this.productImport()} €`;
    }
}