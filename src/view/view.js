export class View {
    #table;
    #messages;
    #total;

    constructor() {
        this.#table = document.getElementById("store");
        this.#messages = document.getElementById("messages");
        this.#total = document.getElementById("total");
    }

    renderNewProduct(product) {
        const tbody = this.#table.tBodies[0];
        let productRow = tbody.insertRow();
        
        productRow.classList.add("prod-row");
        productRow.dataset.code = product.code;
        productRow.dataset.name = product.name;
        productRow.dataset.units = product.units;
        productRow.dataset.price = product.price;
        productRow.dataset.import = product.productImport();

        productRow.insertCell().textContent = product.code;
        productRow.insertCell().textContent = product.name;
        productRow.insertCell().textContent = product.units;
        productRow.insertCell().textContent = product.price + " €";
        productRow.insertCell().textContent = product.productImport() + " €";
        productRow.insertCell().innerHTML = `
            <i class="fa-solid fa-angle-up invisible"></i>
            <i class="fa-solid fa-angle-down invisible"></i>
            <i class="fa-solid fa-pen invisible"></i>
            <i class="fa-solid fa-trash-can invisible"></i>`; 
    }

    renderDelProduct(code) {
        const tbody = this.#table.tBodies[0];

        for (let i = tbody.rows.length - 1; i >= 0; i-- ) {
            const row = tbody.rows[i];
            const cellTextCode = row.firstElementChild.textContent.trim();

            if (cellTextCode === code) {
                tbody.deleteRow(i);
            }
        }
    }

    renderChangeStock(product) {
        const tbody = this.#table.tBodies[0];

        for (const row of tbody.rows) {
            if (row.firstElementChild.textContent.trim() === product.code) {
                row.children[2].textContent = product.units;
                row.children[4].textContent = product.productImport() + " €";
            }
        }
    }

    renderEditProduct(product) {
        const tbody = this.#table.tBodies[0];

        for (const row of tbody.rows) {
            if (row.firstElementChild.textContent.trim() === product.code) {
                row.children[1].textContent = product.name;
                row.children[2].textContent = product.units;
                row.children[3].textContent = product.price + " €";
                row.children[4].textContent = product.productImport() + " €";

                row.dataset.name = product.name;
                row.dataset.units = product.units;
                row.dataset.price = product.price;
                row.dataset.import = product.productImport();
            }
        }
    }

    renderStoreImport(totalImport) {
        this.#total.classList.remove("invisible");
        const importCell = this.#total.querySelector("tr td");
        importCell.textContent = totalImport + " €";
    }

    renderErrorMessage(text) {
        const errorMessage = document.createElement("div");
        errorMessage.classList.add("col-sm-12", "alert", "alert-danger");

        const textSpan = document.createElement("span");
        textSpan.textContent = text;

        const closeButton = document.createElement("button");
        closeButton.type = "button";
        closeButton.className = "btn-close";
        closeButton.setAttribute("aria-label", "Close");
        closeButton.addEventListener("click", () => errorMessage.remove());

        errorMessage.append(textSpan, closeButton);
        this.#messages.append(errorMessage);
    }

    renderValidationMessage(input, errorMessage) {
        const feedbackDiv = input.parentElement.querySelector(".invalid-feedback");
        input.classList.remove("border-primary");

        if (errorMessage) {
            input.classList.remove("is-valid");
            input.classList.add("is-invalid");
            feedbackDiv.textContent = errorMessage;
        } else {
            input.classList.remove("is-invalid");
            input.classList.add("is-valid");
            feedbackDiv.textContent = "";
        }
    }

    // Limpia los estilos de validación (verde/rojo) y mensajes de error de un formulario.
    clearValidationStyles(form) {
        const inputs = form.querySelectorAll("input");
        inputs.forEach(input => {
            input.classList.remove("is-valid", "is-invalid");
            input.classList.add("border-primary");
            const feedback = input.parentElement.querySelector(".invalid-feedback");
            if (feedback) feedback.textContent = "";
        })
    }
}