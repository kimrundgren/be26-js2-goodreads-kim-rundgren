import "./books.css";

function renderScore(score) {
	if (score >= 1 && score <= 5) {
		return "★".repeat(score) + "☆".repeat(5 - score);
	}

	return "Not rated";
}

function renderStatus(isRead) {
	return {
		statusString: isRead ? "Read" : "Not read",
		statusClass: isRead ? "read" : "not-read"
	};
}

export function updateReadStatus(book, element) {
	const status = renderStatus(book.getIsRead());
	const badgeElement = element.querySelector(".badge-status");

	badgeElement.textContent = status.statusString;
	badgeElement.classList.remove("read", "not-read");
	badgeElement.classList.add(status.statusClass);
}

export function updateScore(book, element) {
	const score = renderScore(book.getScore());
	const scoreElement = element.querySelector(".stars");

	scoreElement.textContent = score;
}

export function renderBook(book) {
	const score = renderScore(book.getScore());
	const status = renderStatus(book.getIsRead());

	const bookList = document.querySelector("#bookList");
	const li = document.createElement("li");

	li.classList.add("row", "align-items-center", "border-bottom", "py-3");
	li.dataset.id = book.getId();

	li.innerHTML = `
		<div class="col-3 d-flex gap-3 align-items-center">
			<img 
				src="${book.getCover()}" 
				alt="Book cover of ${book.getTitle()} by ${book.getAuthor()}" 
				height="50" 
				width="auto"
			>
			<div>${book.getTitle()} <span>(${book.getYear()})</span></div>
		</div>

		<div class="col-3">
			${book.getAuthor()}
		</div>

		<div class="col-2">
			<span class="stars">${score}</span>
		</div>

		<div class="col-2">
			<span class="badge badge-status ${status.statusClass}">
			${status.statusString}
			</span>
		</div>

		<div class="col-2 text-end">
			<div class="actions">
				<button class="btn btn-sm btn-outline-dark edit" data-bs-toggle="modal" data-bs-target="#editBookModal">Edit</button>
				<button class="btn btn-sm btn-outline-danger delete">Delete</button>
			</div>
		</div>
	`;

	bookList.append(li);
}