import { Book } from "./Book.js";

export function createBookFromData(id, data) {
	return new Book({
		id,
		title: data.title,
		author: data.author,
		year: data.year,
		cover: data.cover,
		score: data.score,
		isRead: data.isRead
	});
}

export function createBooksFromData(data) {
	const books = [];

	for (const id in data) {
		books.push(createBookFromData(id, data[id]));
	}

	return books;
}