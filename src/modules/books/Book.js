export class Book {
	#id;
	#title;
	#author;
	#year;
	#cover;
	#score;
	#isRead;

	constructor({ id, title, author, year, cover, score = null, isRead = false }) {
		this.#id = id;
		this.#title = title;
		this.#author = author;
		this.#year = year;
		this.#cover = cover;
		this.#score = score;
		this.#isRead = isRead;
	}

	getId() {
		return this.#id;
	}

	getTitle() {
		return this.#title;
	}

	getAuthor() {
		return this.#author;
	}

	getYear() {
		return this.#year;
	}

	getCover() {
		return this.#cover;
	}

	getScore() {
		return this.#score;
	}

	setScore(score) {
		if (score === null) {
			this.#score = null;
			return;
		}

		if (!this.#isRead) {
			throw new Error("Only read books can be rated");
		}

		if (!Number.isInteger(score) || score < 1 || score > 5) {
			throw new Error("Score must be an integer between 1 and 5");
		}

		this.#score = score;
	}

	getIsRead() {
		return this.#isRead;
	}

	setIsRead(isRead) {
		if (typeof isRead !== "boolean") {
			throw new Error("isRead must be true or false");
		}

		this.#isRead = isRead;

		if (!isRead) {
			this.#score = null;
		}
	}
}