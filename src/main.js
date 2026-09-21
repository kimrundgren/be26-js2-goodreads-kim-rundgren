import { getBooks, addBook, deleteBook, updateBook } from "./api/booksApi.js";
import { Book } from "./modules/books/Book.js";
import { renderBookList } from "./modules/books/renderBookList.js";

/**
 * HTML elements
 */

const bookList = document.querySelector("#bookList");

const filterButtons = document.querySelector("#filterButtons");

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
let bookToEdit = null;
let currentFilter = "all";

getBooks()
	.then(data => {
		for (const id in data) {
			const book = new Book({
				id,
				title: data[id].title,
				author: data[id].author,
				year: data[id].year,
				cover: data[id].cover,
				score: data[id].score,
				isRead: data[id].isRead
			});

			books.push(book);
		}

		renderBookList(books);
	})
	.catch(error => console.error(error));

function renderFilteredBooks() {
	let filteredBooks = books;

	if (currentFilter === "read") {
		filteredBooks = books.filter(book => book.getIsRead());
	} else if (currentFilter === "unread") {
		filteredBooks = books.filter(book => !book.getIsRead());
	}

	bookList.querySelectorAll("li[data-id]").forEach(book => book.remove());

	renderBookList(filteredBooks);
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
				cover: newBook.cover,
				score: null,
				isRead: false
			});

			books.push(book);
			renderFilteredBooks();

			addBookForm.reset();

			// Hide add book modal on submit
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

		bookToEdit = books.find(book => book.getId() === id);

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
		isRead,
		score
	};

	updateBook(bookToEdit.getId(), updates)
		.then(() => {
			bookToEdit.setIsRead(isRead);
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