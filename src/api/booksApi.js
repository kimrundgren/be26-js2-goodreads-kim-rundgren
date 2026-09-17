const BASE_URL = "https://goodreads-kim-rundgren-default-rtdb.europe-west1.firebasedatabase.app/books";

export async function getBooks() {
	const url = `${BASE_URL}.json`;

	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error("Could not add book");
		}

		const data = await response.json();

		return data;
	} catch (error) {
		throw error;
	}
}