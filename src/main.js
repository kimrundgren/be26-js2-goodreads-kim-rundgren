import { getBooks, addBook } from "./api/booksApi.js";
import { Book } from "./modules/books/Book.js";
import { renderBooks } from "./modules/books/renderBookList.js";
import { renderBook } from "./modules/books/renderBook.js";

const books = [];

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


const addBookForm = document.querySelector("#addBookForm");

addBookForm.addEventListener("submit", event => {
	event.preventDefault();

	const formData = new FormData(addBookForm);

	const newBook = {
		title: formData.get("bookTitle"),
		author: formData.get("bookAuthor"),
		year: formData.get("bookYear"),
		cover: formData.get("bookCover")
	}

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