import {Controller} from "./controller/controller.js";

const storeApp = new Controller();
const form = document.getElementById("form-prod");
const submitButton = document.querySelector("button[type='button']");
const resetButton = document.querySelector("button[type='reset']");

submitButton.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-product")) {
        addNewProduct(event);
    }

    if (event.target.classList.contains("edit-product")) {
        editProduct(event);
    }
});

resetButton.addEventListener("click", (event) => {
    event.preventDefault();

    if (submitButton.classList.contains("edit-product")) {
        storeApp.loadEditForm(form);

    } else {
        form.reset();
    }
});

const tbody = document.querySelector("#store tbody");

if (tbody) {
    tbody.addEventListener("mouseover", showIcons);
    tbody.addEventListener("mouseout", showIcons);
    tbody.addEventListener("click", activateButton);
}


function addNewProduct(event) {
    event.preventDefault();

    const code = document.getElementById("prod-code").value;
    const name = document.getElementById("prod-name").value;
    const price = Number(document.getElementById("prod-price").value);
    const units = Number(document.getElementById("prod-uds").value);

    storeApp.addProductToStore(code, name, price, units);
    form.reset();
}

function editProduct(event) {
    event.preventDefault();

    const code = document.getElementById("prod-code").value;
    const name = document.getElementById("prod-name").value;
    const price = Number(document.getElementById("prod-price").value);
    const units = Number(document.getElementById("prod-uds").value);

    storeApp.changeProductInStore(code, name, price, units);
    form.reset();
    storeApp.loadAddForm();
}

function showIcons(event) {
    const affectedRow = event.target.closest("tr");
    if (!affectedRow || !affectedRow.classList.contains("prod-row")) return;

    const actionsCell = affectedRow.lastElementChild;
    if (!actionsCell) return;

    const actionButtons = actionsCell.querySelectorAll(".fa-solid");
    
    actionButtons.forEach(button => {
        if (event.type === "mouseover") {
            button.classList.remove("invisible");
            
        } else if (event.type === "mouseout") {
            button.classList.add("invisible")
        }
    });
}

function activateButton(event) {
    const actionButton = event.target.closest("i");
    if (!actionButton) return;

    const affectedRow = actionButton.closest("tr");
    if (!affectedRow || !affectedRow.dataset.id) return;

    const productId = affectedRow.dataset.id;
    
    if (actionButton.classList.contains("fa-angle-up")) {
        storeApp.changeProductStock(productId, 1);
    }

    if (actionButton.classList.contains("fa-angle-down")) {
        storeApp.changeProductStock(productId, -1);
    }

    if (actionButton.classList.contains("fa-pen")) {
        storeApp.loadEditForm(affectedRow);
    }

    if (actionButton.classList.contains("fa-trash-can")) {
        storeApp.deleteProductFromStore(productId);
    }
    
    event.stopPropagation();
}


// document.getElementById("form-delprod").addEventListener("submit", (event) => {
//     event.preventDefault();
//     const id = document.getElementById("delprod-id").value;
//     storeApp.deleteProductFromStore(id);
// });

// document.getElementById("form-stockprod").addEventListener("submit", (event) => {
//     event.preventDefault();
//     const id = document.getElementById("stockprod-id").value;
//     const units = Number(document.getElementById("stockprod-uds").value);
//     storeApp.changeProductStock(id, units);
// });
