import { createBookItem } from "./bookItem.js";

export function renderBookList(books) {
	const bookList = document.querySelector("#bookList");

	bookList.innerHTML = "";

	for (const book of books) {
		const bookItem = createBookItem(book);

		bookList.append(bookItem);
	}
}