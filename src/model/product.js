export class Product {    
    #code;
    #name;
    #price;
    #units;

    constructor(code, name, price, units = 0) {
        this.#code = code;
        this.#name = name;
        this.#price = price;
        this.#units = Math.trunc(units);
    }

    get code() {
        return this.#code;
    }

    get name() {
        return this.#name;
    }

    set name(name) {
        this.#name = name;
    }

    get price() {
        return this.#price;
    }

    set price(price) {
        this.#price = price;
    }

    get units() {
        return this.#units;
    }

    set units(units) {
        this.#units = units;
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