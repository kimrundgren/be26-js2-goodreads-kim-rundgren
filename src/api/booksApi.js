const BASE_URL = "https://goodreads-kim-rundgren-default-rtdb.europe-west1.firebasedatabase.app/books";

export async function getBooks() {
	const url = `${BASE_URL}.json`;

	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error("Could not fetch books");
		}

		const data = await response.json();

		return data;
	} catch (error) {
		throw error;
	}
}

export async function addBook(newBook) {
	const url = `${BASE_URL}.json`;

	const book = {
		title: newBook.title,
		author: newBook.author,
		year: newBook.year,
		cover: newBook.cover,
		score: null,
		isRead: false
	};

	const options = {
		method: "POST",
		body: JSON.stringify(book),
		headers: {
			"Content-type": "application/json"
		}
	}

	try {
		const response = await fetch(url, options);

		if (!response.ok) {
			throw new Error("Could not add book");
		}

		const data = await response.json();

		return data;
	} catch (error) {
		throw error;
	}
}

export async function deleteBook(id) {
	const url = `${BASE_URL}/${id}.json`;

	const options = {
		method: "DELETE"
	}

	try {
		const response = await fetch(url, options);

		if (!response.ok) {
			throw new Error("Could not delete book");
		}
	} catch (error) {
		throw error;
	}
}