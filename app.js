let myLibrary = [];

const addBookBtn = document.getElementById("add-book-btn");
const exitModalBtn = document.getElementById("exit-btn");
const cancelModalBtn = document.getElementById("cancel-btn");
const saveModalBtn = document.getElementById("save-btn");
const contentContainer = document.querySelector(".cards-container");
const modalInputs = document.querySelectorAll("#title-input, #author-input, #pages-input, #read-input");
let editFlag = false;
let editIndex = null;

const modal = document.querySelector(".form-ask-modal");

class Book {
    constructor(title, author, pages, hasRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.hasRead = hasRead;
    }

    info() {
        return `The ${this.title} by ${this.author}, ${this.pages} pages, ${this.hasRead ? "has been read." : "has not been read yet."}`;
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);  // Corrected from .add to .push
    updateUI();
}

function removeBook(e) {
    const index = Number.parseInt(e.target.dataset.bookIndex);
    myLibrary.splice(index, 1);
    updateUI();
}

function updateBook(book) {
    myLibrary[editIndex] = book;
    updateUI();
}

function createBook(book, index) {
    const bookCard = document.createElement("div");
    bookCard.className = "book-card";

    bookCard.innerHTML = `
        <div class="book-title">Title: ${book.title}</div>
        <div class="book-author">By: ${book.author}</div>
        <div class="book-pages">Pages: ${book.pages}</div>
        <div class="book-has-read">${book.hasRead ? "Read" : "Unread"}</div>
        <div class="button-container">
            <button data-book-index="${index}" class="edit-btn">EDIT</button>
            <button data-book-index="${index}" class="delete-btn">DELETE</button>
        </div>
    `;

    bookCard.querySelector(".edit-btn").addEventListener("click", onEditBtnPressed);
    bookCard.querySelector(".delete-btn").addEventListener("click", removeBook);
    
    return bookCard;
}

function updateUI() {
    contentContainer.innerHTML = "";  // Clear current content
    myLibrary.forEach((book, index) => {
        contentContainer.appendChild(createBook(book, index));
    });
}

function onAddBookBtnPressed() {
    modal.classList.remove("hidden");
}

function onCancelPressed() {
    modal.classList.add("hidden");
    clearInputModal();
    resetEditVars();
}

function onEditBtnPressed(e) {
    editFlag = true;
    editIndex = Number.parseInt(e.target.dataset.bookIndex);
    const book = myLibrary[editIndex];
    modalInputs[0].value = book.title;
    modalInputs[1].value = book.author;
    modalInputs[2].value = book.pages;
    modalInputs[3].checked = book.hasRead;  // Correctly set checkbox state
    modal.classList.remove("hidden");
}

function resetEditVars() {
    editFlag = false;
    editIndex = null;
}

function onSaveBtnPressed() {
    const title = modalInputs[0].value;
    const author = modalInputs[1].value;
    const bookPageCount = modalInputs[2].value;
    const hasRead = modalInputs[3].checked;

    const newBook = new Book(title, author, bookPageCount, hasRead);
    editFlag ? updateBook(newBook) : addBookToLibrary(newBook);
    clearInputModal();
    onCancelPressed();
}

function clearInputModal() {
    modalInputs.forEach(input => {
        input.type === "checkbox" ? (input.checked = false) : (input.value = "");
    });
}

// Sample books
function createSampleBooks() {
    const sampleBooks = [
        new Book("XYZ U think", "Gowler Prada", 200, true),
        new Book("Genini", "Vinci Doga", 125, false),
        new Book("Slaughter House", "ADjan Khischi", 451, true),
    ];

    sampleBooks.forEach(book => addBookToLibrary(book));
}

addBookBtn.addEventListener("click", onAddBookBtnPressed);
exitModalBtn.addEventListener("click", onCancelPressed);
cancelModalBtn.addEventListener("click", onCancelPressed);
saveModalBtn.addEventListener("click", onSaveBtnPressed);

createSampleBooks();
