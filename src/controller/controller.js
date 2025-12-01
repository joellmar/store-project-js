import {Store} from "../model/store.js";
import {View} from "../view/view.js";

export class Controller {
    constructor() {
        this.store = new Store();
        this.view = new View();
    }

    addProductToStore(code, name, price, units) {
        const existingProduct = this.store.products.find(product => product.name.toLowerCase() === name.toLowerCase());

        if(existingProduct) {
            this.view.renderErrorMessage("Error: this product is already in the store.");
            return false;
        }

        let newProduct = this.store.addProduct(code, name, price);
        this.store.changeProductUnits(newProduct.code, units);

        this.view.renderNewProduct(newProduct);
        this.view.renderStoreImport(this.store.totalImport());

        return newProduct;
    }
    
    deleteProductFromStore(code) {
        let deletedProduct = this.store.findProduct(code);

        if (!deletedProduct) {
            this.view.renderErrorMessage("Error: this product is not in the store.");
            
            return false;
        }

        if (!confirm(`Do you want to delete product with code: ${deletedProduct.code} and name: ${deletedProduct.name}?`)) {
            this.view.renderErrorMessage(`Unable to remove product with ID: ${code} from store`);
            return false;
        }

        if (deletedProduct.units > 0) {
            if (!confirm(`${deletedProduct.units} units will be deleted. Do you want to continue?`)) {
                this.view.renderErrorMessage(`Unable to remove product with ID: ${code} from store`);
                return false;
            }

            this.store.changeProductUnits(code, -deletedProduct.units);
        } 

            
        this.store.delProduct(code);

        this.view.renderDelProduct(code);
        this.view.renderStoreImport(this.store.totalImport());
        
        return deletedProduct;
        
    }

    changeProductStock(code, units) {
        let modifiedProduct = this.store.findProduct(code);

        if (!modifiedProduct) {
            this.view.renderErrorMessage("Error: this product is not in the store.");

            return false;
        }

        if ((modifiedProduct.units + units) < 0) {
            this.view.renderErrorMessage("Error: units to substract must be less than or equal to current units.");

            return false;
        }

        this.store.changeProductUnits(code, units);

        this.view.renderChangeStock(modifiedProduct);
        this.view.renderStoreImport(this.store.totalImport());

        return modifiedProduct;
    }

    changeProductInStore(code, name, price, units) {
       
        let modifiedProduct = this.store.findProduct(code);

        if (!modifiedProduct) {
            this.view.renderErrorMessage("Error: this product is not in the store.");
            return false;
        }

        this.store.editProduct(code, name, price, units);
        
        this.view.renderEditProduct(modifiedProduct);
        this.view.renderStoreImport(this.store.totalImport());

        return modifiedProduct;
    }

    loadEditForm(element) {
        const formHeading = document.getElementById("form-title");
        const button = document.querySelector("button[type='submit']");
        const form = document.getElementById("form-prod");

        formHeading.textContent = "Editar producto";
        button.textContent = "Cambiar";
        
        document.getElementById("prod-code").value = element.dataset.code;
        document.getElementById("prod-name").value = element.dataset.name;
        document.getElementById("prod-price").value = element.dataset.price;
        document.getElementById("prod-uds").value = element.dataset.units;

        form.dataset.code = document.getElementById("prod-code").value;
        form.dataset.name = document.getElementById("prod-name").value;
        form.dataset.price = document.getElementById("prod-price").value;
        form.dataset.units = document.getElementById("prod-uds").value;

        button.classList.remove("add-product");
        button.classList.add("edit-product");
    }

    loadAddForm() {
        const formHeading = document.getElementById("form-title");
        const button = document.querySelector("button[type='submit']");

        formHeading.textContent = "Nuevo producto";
        button.textContent = "Añadir";

        button.classList.remove("edit-product");
        button.classList.add("add-product");
    }

    validateField(input) {
        let message = null

        if (input.validity.valueMissing) {
            
            message = "El campo es obligatorio";
        }

        if (input.validity.patternMismatch) {
            message = "El valor introducido no cumple con lo pedido";
        }

        if (input.validity.rangeUnderflow) {
            message = "El valor mínimo es 0";
        }

        if (input.id === "prod-price" && input.validity.rangeOverflow) {
            message = "El valor máximo es 999.99";
        }

        if (input.id === "prod-uds" && input.validity.rangeOverflow) {
            message = "El valor máximo es 100";
        }

        if (input.validity.tooShort) {
            message = "Debes introducir al menos 5 caracteres";
        }

        if (input.validity.tooLong) {
            message = "Debes introducir como máximo 25 caracteres";
        }

        this.view.renderValidationMessage(input, message);
    }
}