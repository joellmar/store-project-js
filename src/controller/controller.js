import { Product } from "../model/product.js";
import {Store} from "../model/store.js";
import {View} from "../view/view.js";

export class Controller {
    constructor() {
        this.store = new Store();
        this.view = new View();
    }

    addProductToStore(name, price) {
        if (!name) {
            this.view.renderErrorMessage("Error: name cannot be empty");
            return false;
        } 
        if (!Number.isFinite(price) || price < 0) {
            this.view.renderErrorMessage("Error: price must be a non-negative number.");
            return false;
        }

        const existingProduct = this.store.products.find(product => product.name.toLowerCase() === name.toLowerCase());

        if(existingProduct) {
            this.view.renderErrorMessage("Error: this product is already in the store.");
            return false;
        }

        let newProduct = this.store.addProduct(name, price);

        this.view.renderNewProduct(newProduct);
        this.view.renderStoreImport(this.store.totalImport());

        return newProduct;
    }
    
    deleteProductFromStore(id) {
        id = this.#normalizeId(id);

        let deletedProduct = this.store.findProduct(id);

        if (!deletedProduct) {
            this.view.renderErrorMessage("Error: this product is not in the store.");
            
            return false;
        }

        if (!confirm(`Do you want to delete product with ID: ${deletedProduct.id} and name: ${deletedProduct.name}?`)) {
            this.view.renderErrorMessage(`Unable to remove product with ID: ${id} from store`);
            return false;
        }

        if (deletedProduct.units > 0) {
            if (!confirm(`${deletedProduct.units} units will be deleted. Do you want to continue?`)) {
                this.view.renderErrorMessage(`Unable to remove product with ID: ${id} from store`);
                return false;
            }

            this.store.changeProductUnits(id, -deletedProduct.units);
        } 

            
        this.store.delProduct(id);

        this.view.renderDelProduct(id);
        this.view.renderStoreImport(this.store.totalImport());
        
        return deletedProduct;
        
    }

    changeProductStock(id, units) {
        id = this.#normalizeId(id);

        if (!Number.isInteger(units)) {
            this.view.renderErrorMessage("Error: units must be an integer number");

            return false;
        }

        let modifiedProduct = this.store.findProduct(id);

        if (!modifiedProduct) {
            this.view.renderErrorMessage("Error: this product is not in the store.");

            return false;
        }

        if ((modifiedProduct.units + units) < 0) {
            this.view.renderErrorMessage("Error: units to substract must be less than or equal to current units.");

            return false;
        }

        this.store.changeProductUnits(id, units);

        this.view.renderChangeStock(modifiedProduct);
        this.view.renderStoreImport(this.store.totalImport());

        return modifiedProduct;
    }

    #normalizeId(id) {
        const numericId = Number(id);

        if (!Number.isInteger(numericId) || numericId < 0) {
            this.view.renderErrorMessage("Error: ID must be a positive integer");
            return false;
        }

        return numericId;
    }


}