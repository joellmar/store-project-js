import { Controller } from "./controller/controller.js";

"use strict";

const storeApp = new Controller();
const form = document.getElementById("form-prod");

const submitButton = document.querySelector("button[type='submit']");
const resetButton = document.querySelector("button[type='reset']");
const inputs = document.querySelectorAll("input");

// -- EVENTOS PRINCIPALES -- 

// 1. Un único listener para el envío de datos (añadir o editar)
/**
 * * "Submit" es un evento semántico (a diferencia de click), quiere decir que se envía el formulario. 
 * * El navegador sabe que se puede hacer de muchas formas (como pulsando Enter).
 * 
 */
form.addEventListener("submit", (event) => {

    // Detenemos el envío real para que no recargue la página
    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    // Determinamos si se añade o edita producto según la clase del botón
    if (submitButton.classList.contains("add-product")) {
        handleAddProduct(event);
    }

    if (submitButton.classList.contains("edit-product")) {
        handleEditProduct(event);
    }
});

// Listener para el reset
form.addEventListener("reset", (event) => {
    // Si el formulario está en modo edición, cargamos los valores del producto en el form.
    if (submitButton.classList.contains("edit-product")) {
        event.preventDefault();
        storeApp.view.clearValidationStyles(form);
        storeApp.loadEditForm(form);
    } else {
        storeApp.view.clearValidationStyles(form);
    }
});

inputs.forEach(input =>
    input.addEventListener("blur", (event) =>
        storeApp.validateField(event.target)
    )
);

const tbody = document.querySelector("#store tbody");

if (tbody) {
    tbody.addEventListener("mouseover", showIcons);
    tbody.addEventListener("mouseout", showIcons);
    tbody.addEventListener("click", activateButton);
}

// FUNCIONES AUXILIARES

function validateForm() {
    inputs.forEach(input => storeApp.validateField(input));

    return form.checkValidity();
}

function handleAddProduct() {
    const { code, name, price, units } = getFormData();
    storeApp.addProductToStore(code, name, price, units);

    inputs.forEach(input => {
        input.classList.remove("is-valid");
        input.classList.add("border-primary");
    });

    form.reset();
}

function handleEditProduct() {
    const { code, name, price, units } = getFormData();
    storeApp.changeProductInStore(code, name, price, units);

    inputs.forEach(input => {
        input.classList.remove("is-valid");
        input.classList.add("border-primary");
    });

    storeApp.loadAddForm();
    form.reset();
}

// lectura de datos del DOM sin repetir código
function getFormData() {
    return {
        code: document.getElementById("prod-code").value,
        name: document.getElementById("prod-name").value,
        price: Number(document.getElementById("prod-price").value),
        units: Number(document.getElementById("prod-uds").value)
    };
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
    if (!affectedRow || !affectedRow.dataset.code) return;

    const productCode = affectedRow.dataset.code;

    if (actionButton.classList.contains("fa-angle-up")) {
        storeApp.changeProductStock(productCode, 1);
    }

    if (actionButton.classList.contains("fa-angle-down")) {
        storeApp.changeProductStock(productCode, -1);
    }

    if (actionButton.classList.contains("fa-pen")) {
        storeApp.view.clearValidationStyles(form);
        storeApp.loadEditForm(affectedRow);
    }

    if (actionButton.classList.contains("fa-trash-can")) {
        if (form.dataset.code === productCode) {
            form.reset();
            storeApp.view.clearValidationStyles(form);
            storeApp.loadAddForm();

            delete form.dataset.code;
            delete form.dataset.name;
            delete form.dataset.price;
            delete form.dataset.units;
        }

        storeApp.deleteProductFromStore(productCode);
    }

    event.stopPropagation();
}

function resetFormState() {
    form.reset();
    storeApp.view.clearValidationStyles(form);

    /**
     * ! Averiguar que hace el delete y por qué tiene esta sintaxis
     */
    // delete form.dataset.code;
}