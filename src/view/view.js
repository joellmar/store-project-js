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

        productRow.insertCell().textContent = product.id;
        productRow.insertCell().textContent = product.name;
        productRow.insertCell().textContent = product.units;
        productRow.insertCell().textContent = product.price + " €";
        productRow.insertCell().textContent = product.productImport() + " €";
        productRow.insertCell(); // celda vacía para futuros botones o acciones 

        // productRow.innerHTML = `
        //     <td>${product.id}</td>
        //     <td>${product.name}</td>
        //     <td>${product.units}</td>
        //     <td>${product.price}</td>
        //     <td>${product.productImport()}</td>
        //     <td></td>`;
    }

    renderDelProduct(id) {
        const tbody = this.#table.tBodies[0];

        for (let i = tbody.rows.length - 1; i >= 0; i-- ) {
            const row = tbody.rows[i];
            const cellTextId = row.firstElementChild.textContent.trim();

            if (cellTextId === String(id)) {
                tbody.deleteRow(i);
            }
        }

        // for (const row of tbody.rows) {
        //     if (row.firstElementChild.textContent === id) {
        //         row.remove();
        //     }
        // }
    }

    renderChangeStock(product) {
        const tbody = this.#table.tBodies[0];

        for (const row of tbody.rows) {
            if (row.firstElementChild.textContent.trim() === String(product.id)) {
                row.children[2].textContent = product.units;
                row.children[4].textContent = product.productImport() + " €";
            }
        }
    }

    renderEditProduct(product) {
        const tbody = this.#table.tBodies[0];

        for (const row of tbody.rows) {
            if (row.firstElementChild.textContent.trim() === String(product.id)) {
                row.children[1].textContent = product.name;
                row.children[2].textContent = product.units;
                row.children[3].textContent = product.price + " €";
                row.children[4].textContent = product.productImport() + " €";
            }
        }
    }

    renderStoreImport(totalImport) {
        const totalImportMessage = document.createElement("div");

        totalImportMessage.classList.add("alert", "alert-info");
        totalImportMessage.setAttribute("role", "alert");
        totalImportMessage.innerHTML = `<span>Total import: ${totalImport} €</span>`;

        const childNode = this.#total.firstChild;
        this.#total.replaceChild(totalImportMessage, childNode);
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

        // errorMessage.innerHTML = `
        //     <span>${text}</span>
        //     <button type="button" class="close" aria-label="Close" onclick="this.parentElement.remove()">
        //         <span aria-hidden="true">&times;</span>
        //     </button>`;
        
        this.#messages.append(errorMessage);
    }
}