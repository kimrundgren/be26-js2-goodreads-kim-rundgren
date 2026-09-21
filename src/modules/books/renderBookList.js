import { createBookItem } from "./createBookItem.js";

export function renderBookList(books) {
	const bookList = document.querySelector("#bookList");

	for (const book of books) {
		const bookItem = createBookItem(book);

		bookList.append(bookItem);
	}
}