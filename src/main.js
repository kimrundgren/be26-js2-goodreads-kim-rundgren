import "./modules/books/books.css";

import { getBooks, addBook, updateBook, deleteBook } from "./api/booksApi.js";
import { createBookFromData, createBooksFromData } from "./modules/books/bookData.js";
import { renderBookList } from "./modules/books/list/bookList.js";
import { filterBooks } from "./modules/books/list/bookFilter.js";
import { getNewBookData } from "./modules/books/forms/addBookForm.js";
import { getEditBookData, populateEditForm, setupReadStatus } from "./modules/books/forms/editBookForm.js";

/**
 * States
 */

const books = [];
let currentFilter = "all";
let bookToEdit = null;

/**
 * HTML elements
 */

const bookList = document.querySelector("#bookList");
const filterButtons = document.querySelector("#filterButtons");
const addBookForm = document.querySelector("#addBookForm");
const editBookForm = document.querySelector("#editBookForm");
const addBookModal = document.querySelector("#addBookModal");
const editBookModal = document.querySelector("#editBookModal");

/**
 * Helper functions 
 */

function handleEdit(id) {
	bookToEdit = books.find(book => book.getId() === id);

	populateEditForm(editBookForm, bookToEdit);
}

function handleDelete(id) {
	deleteBook(id)
		.then(() => {
			const index = books.findIndex(book => book.getId() === id);
			books.splice(index, 1);

			const filteredBooks = filterBooks(books, currentFilter);
			renderBookList(filteredBooks);
		})
		.catch(error => console.error(error));
}

/**
 * Load books
 */

getBooks()
	.then(data => {
		books.push(...createBooksFromData(data));

		renderBookList(books);
	})
	.catch(error => console.error(error));

/**
* Add book
*/

addBookForm.addEventListener("submit", event => {
	event.preventDefault();

	const newBook = getNewBookData(addBookForm);

	addBook(newBook)
		.then(data => {
			const book = createBookFromData(data.name, newBook);

			books.push(book);

			const filteredBooks = filterBooks(books, currentFilter);
			renderBookList(filteredBooks);

			addBookForm.reset();
			bootstrap.Modal.getInstance(addBookModal).hide();
		})
		.catch(error => console.error(error));
});

/**
 * Edit book
 */

editBookForm.addEventListener("submit", event => {
	event.preventDefault();

	const editData = getEditBookData(editBookForm);

	updateBook(bookToEdit.getId(), editData)
		.then(() => {
			bookToEdit.setIsRead(editData.isRead);
			bookToEdit.setScore(editData.score);

			const filteredBooks = filterBooks(books, currentFilter);
			renderBookList(filteredBooks);

			bootstrap.Modal.getInstance(editBookModal).hide();
		})
		.catch(error => console.error(error));
});

/**
 * Edit form
 */

setupReadStatus(editBookForm);

/**
 * Book actions
 */

bookList.addEventListener("click", event => {
	const li = event.target.closest("li");

	if (!li) {
		return;
	}

	const id = li.dataset.id;

	if (event.target.classList.contains("edit")) {
		handleEdit(id);
	}

	if (event.target.classList.contains("delete")) {
		handleDelete(id);
	}
});

/**
 * Filter books
 */

filterButtons.addEventListener("click", event => {
	const filter = event.target.dataset.filter;

	if (!filter) {
		return;
	}

	currentFilter = filter;

	filterButtons.querySelectorAll("button").forEach(button => {
		button.classList.replace("btn-dark", "btn-outline-dark");
	});

	event.target.classList.replace("btn-outline-dark", "btn-dark");

	const filteredBooks = filterBooks(books, currentFilter);
	renderBookList(filteredBooks);
});