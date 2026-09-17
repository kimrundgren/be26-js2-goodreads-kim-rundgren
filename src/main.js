import { getBooks } from "./api/booksApi.js";
import { Book } from "./modules/books/Book.js";
import { renderBooks } from "./modules/books/renderBookList.js";

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