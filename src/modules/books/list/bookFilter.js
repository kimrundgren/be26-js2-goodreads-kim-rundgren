export function filterBooks(books, filter) {
	if (filter === "read") {
		return books.filter(book => book.getIsRead());
	}

	if (filter === "unread") {
		return books.filter(book => !book.getIsRead());
	}

	return books;
}