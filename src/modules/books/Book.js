export class Book {
	#id;
	#title;
	#author;
	#year;
	#cover;
	#score;
	#isRead;

	constructor(id, title, author, year, cover, score, isRead) {
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

	getIsRead() {
		return this.#isRead;
	}

	markAsRead() {
		this.#isRead = true;
	}

	markAsUnread() {
		this.#isRead = false;
	}
}