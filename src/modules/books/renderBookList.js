import { renderBook } from "./BookItemView.js";

export function renderBooks(books) {
	for (const book of books) {
		renderBook(book);
	}
}