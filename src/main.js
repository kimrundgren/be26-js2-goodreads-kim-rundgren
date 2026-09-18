import { getBooks, addBook, deleteBook, updateBook } from "./api/booksApi.js";
import { Book } from "./modules/books/Book.js";
import { renderBooks } from "./modules/books/renderBookList.js";
import { renderBook, updateReadStatus, updateScore } from "./modules/books/renderBook.js";

const bookList = document.querySelector("#bookList");
const addBookForm = document.querySelector("#addBookForm");
const editBookForm = document.querySelector("#editBookForm");
const markAsRead = document.querySelector("#markAsRead");
const markAsUnread = document.querySelector("#markAsUnread");
const scoreBtns = document.querySelectorAll("input[name='score']");
const editScore = document.querySelector("#editScore");

const books = [];
let editingBook;

getBooks()
	.then(data => {
		for (const id in data) {
			const book = new Book(
				id,
				data[id].title,
				data[id].author,
				data[id].year,
				data[id].cover,
				data[id].score,
				data[id].isRead
			);

			books.push(book);
		}

		renderBooks(books);
	})
	.catch(error => console.log(error));

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
			const book = new Book(
				data.name,
				newBook.title,
				newBook.author,
				newBook.year,
				newBook.cover,
				null,
				false
			);

			books.push(book);
			renderBook(book);

			addBookForm.reset();
		})
		.catch(error => console.log(error));
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
			.catch(error => console.log(error));
	}

	if (event.target.classList.contains("edit")) {
		const li = event.target.closest("li");
		const id = li.dataset.id;

		// Find book
		editingBook = books.find(book => book.getId() === id);

		// Add values to readonly inputs
		editBookTitle.value = editingBook.getTitle();
		editBookAuthor.value = editingBook.getAuthor();
		editBookYear.value = editingBook.getYear();
		editBookCover.value = editingBook.getCover();

		const isRead = editingBook.getIsRead();
		const score = editingBook.getScore();

		scoreBtns.forEach(btn => {
			btn.checked = false;
		});

		if (isRead) {
			markAsRead.checked = true;
			editScore.hidden = false;

			if (score !== null) {
				document.querySelector(`#score${score}`).checked = true;
			}
		} else {
			markAsUnread.checked = true;
			editScore.hidden = true;
		}
	}
});

markAsRead.addEventListener("click", () => {
	editingBook.markAsRead();
	editScore.hidden = false;
});

markAsUnread.addEventListener("click", () => {
	editingBook.markAsUnread();
	editingBook.setScore(null);

	editScore.hidden = true;
});

scoreBtns.forEach(btn => {
	btn.addEventListener("click", () => {
		editingBook.setScore(Number(btn.value));
	});
});

editBookForm.addEventListener("submit", event => {
	event.preventDefault();

	const updates = {
		isRead: editingBook.getIsRead(),
		score: editingBook.getScore()
	};

	updateBook(editingBook.getId(), updates)
		.then(() => {
			const element = bookList.querySelector(`li[data-id="${editingBook.getId()}"]`);

			updateReadStatus(editingBook, element);
			updateScore(editingBook, element);
		})
		.catch(error => console.log(error));
});