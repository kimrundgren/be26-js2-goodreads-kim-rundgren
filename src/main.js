import { getBooks, addBook, deleteBook, updateBook } from "./api/booksApi.js";
import { Book } from "./modules/books/Book.js";
import { renderBooks } from "./modules/books/renderBookList.js";

/**
 * HTML elements
 */

const filterButtons = document.querySelector("#filterButtons");

const bookList = document.querySelector("#bookList");

const addBookForm = document.querySelector("#addBookForm");
const editBookForm = document.querySelector("#editBookForm");

const editTitleInput = document.querySelector("#editBookTitle");
const editAuthorInput = document.querySelector("#editBookAuthor");
const editYearInput = document.querySelector("#editBookYear");
const editCoverInput = document.querySelector("#editBookCover");

const statusReadRadio = document.querySelector("#markAsRead");
const statusUnreadRadio = document.querySelector("#markAsUnread");

const scoreContainer = document.querySelector("#editScore");
const scoreButtons = document.querySelectorAll("input[name='score']");

const addBookModal = document.querySelector("#addBookModal");
const editBookModal = document.querySelector("#editBookModal");

/**
 * States
 */

const books = [];
let bookToEdit;
let currentFilter = "all";

getBooks()
	.then(data => {
		for (const id in data) {
			const book = new Book({
				id: id,
				title: data[id].title,
				author: data[id].author,
				year: data[id].year,
				cover: data[id].cover,
				score: data[id].score,
				isRead: data[id].isRead
			});

			books.push(book);
		}

		renderBooks(books);
	})
	.catch(error => console.error(error));

function renderFilteredBooks() {
	let filteredBooks = books;

	if (currentFilter === "read") {
		filteredBooks = books.filter(book => book.getIsRead());
	}

	if (currentFilter === "unread") {
		filteredBooks = books.filter(book => !book.getIsRead());
	}

	bookList.querySelectorAll("li[data-id]").forEach(book => book.remove());

	renderBooks(filteredBooks);
}

addBookForm.addEventListener("submit", event => {
	event.preventDefault();

	const formData = new FormData(addBookForm);

	const newBook = {
		title: formData.get("bookTitle"),
		author: formData.get("bookAuthor"),
		year: formData.get("bookYear"),
		cover: formData.get("bookCover")
	};

	addBook(newBook)
		.then(data => {
			const book = new Book({
				id: data.name,
				title: newBook.title,
				author: newBook.author,
				year: newBook.year,
				cover: newBook.cover
			});

			books.push(book);
			renderFilteredBooks();

			addBookForm.reset();

			bootstrap.Modal.getInstance(addBookModal).hide();
		})
		.catch(error => console.error(error));
});

bookList.addEventListener("click", event => {
	if (event.target.classList.contains("delete")) {
		const li = event.target.closest("li");
		const id = li.dataset.id;

		deleteBook(id)
			.then(() => {
				const index = books.findIndex(book => book.getId() === id);
				books.splice(index, 1);

				li.remove();
			})
			.catch(error => console.error(error));
	}

	if (event.target.classList.contains("edit")) {
		const li = event.target.closest("li");
		const id = li.dataset.id;

		// Find book
		bookToEdit = books.find(book => book.getId() === id);

		// Add values to readonly inputs
		editTitleInput.value = bookToEdit.getTitle();
		editAuthorInput.value = bookToEdit.getAuthor();
		editYearInput.value = bookToEdit.getYear();
		editCoverInput.value = bookToEdit.getCover();

		const isRead = bookToEdit.getIsRead();
		const score = bookToEdit.getScore();

		scoreButtons.forEach(button => {
			button.checked = false;
		});

		if (isRead) {
			statusReadRadio.checked = true;
			scoreContainer.hidden = false;

			if (score !== null) {
				document.querySelector(`#score${score}`).checked = true;
			}
		} else {
			statusUnreadRadio.checked = true;
			scoreContainer.hidden = true;
		}
	}
});

statusReadRadio.addEventListener("change", () => {
	scoreContainer.hidden = false;
});

statusUnreadRadio.addEventListener("change", () => {
	scoreContainer.hidden = true;

	scoreButtons.forEach(button => {
		button.checked = false;
	});
});

editBookForm.addEventListener("submit", event => {
	event.preventDefault();

	const formData = new FormData(editBookForm);

	const isRead = formData.get("readStatus") === "read";

	const scoreValue = formData.get("score");
	const score = scoreValue !== null ? Number(scoreValue) : null;

	const updates = {
		isRead: isRead,
		score: score
	};

	updateBook(bookToEdit.getId(), updates)
		.then(() => {
			if (isRead) {
				bookToEdit.markAsRead();
			} else {
				bookToEdit.markAsUnread();
			}

			bookToEdit.setScore(score);

			renderFilteredBooks();

			bootstrap.Modal.getInstance(editBookModal).hide();
		})
		.catch(error => console.error(error));
});

filterButtons.addEventListener("click", event => {
	const filter = event.target.dataset.filter;

	if (!filter) {
		return;
	}

	currentFilter = filter;

	filterButtons.querySelectorAll("button").forEach(button => {
		button.classList.remove("btn-dark");
		button.classList.add("btn-outline-dark");
	});

	event.target.classList.remove("btn-outline-dark");
	event.target.classList.add("btn-dark");

	renderFilteredBooks();
});