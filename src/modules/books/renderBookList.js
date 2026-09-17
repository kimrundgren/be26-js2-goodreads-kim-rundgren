import { renderBook } from "./renderBook.js";

export function renderBooks(books) {
	for (const book of books) {
		renderBook(book);
	}
}