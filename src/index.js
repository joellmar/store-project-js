import {Controller} from "./controller/controller.js";

const storeApp = new Controller();

// Captura los formularios por id
document.getElementById("form-newprod").addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("newprod-name").value;
    const price = Number(document.getElementById("newprod-price").value);
    storeApp.addProductToStore(name, price);
});

document.getElementById("form-delprod").addEventListener("submit", (event) => {
    event.preventDefault();
    const id = document.getElementById("delprod-id").value;
    storeApp.deleteProductFromStore(id);
});

document.getElementById("form-stockprod").addEventListener("submit", (event) => {
    event.preventDefault();
    const id = document.getElementById("stockprod-id").value;
    const units = Number(document.getElementById("stockprod-uds").value);
    storeApp.changeProductStock(id, units);
});
