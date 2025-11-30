import { Product } from "./product.js";

export class Store {
    static #idCounter = 1;

    #id;
    #products;

    constructor() {
        this.#id = Store.#idCounter ++;
        this.#products = [];
    }

    static get idCounter() {
        return Store.#idCounter;
    }

    get id() {
        return this.#id;
    }

    get products() {
        return this.#products;
    }


    findProduct(id) {
        const searchId = Number(id);
        return this.#products.find(product => product.id == searchId);
    }

    addProduct(name, price) {    
        const product = new Product(name, price);
        this.#products.push(product);

        return product;
    }

    delProduct(id) {
        const product = this.findProduct(id);
        const index = this.#products.indexOf(product);
        
        return this.#products.splice(index, 1)[0];
    }

    changeProductUnits(id, units) {
        const product = this.findProduct(id);
        product.changeUnits(units);

        return product;
    }

    editProduct(id, name, price, units) {
        const product = this.findProduct(id);
        product.name = name;
        product.price = price;
        product.units = units;

        return product;
    }

    totalImport() {
        const total = this.#products.reduce((sum, product) => sum += product.productImport(), 0); 

        return Number(total.toFixed(2));
    }

    underStock(units) {
        if (!Number.isInteger(units)) {
            throw new Error("Error: units must be an integer number")
        }

        return this.#products.filter(product => product.units < units);
    }

    orderByUnits() {
        return [...this.#products].sort((p1, p2) => p2.units - p1.units);
    }

    orderByName() {
        return [...this.#products].sort((p1, p2) => p1.name.localeCompare(p2.name));
    }
}