import "./books.css";

function renderScore(score) {
	if (score === 0) {
		return "☆☆☆☆☆";
	}

	if (score >= 1 && score <= 5) {
		return "★".repeat(score) + "☆".repeat(5 - score);
	}

	return "Not rated";
}

function renderStatus(isRead) {
	let statusString;
	let statusClass;

	if (isRead) {
		statusString = "Read";
		statusClass = "read";
	} else {
		statusString = "Not read";
		statusClass = "not-read";
	}

	return {
		statusString,
		statusClass
	};
}

export function renderBook(book) {
	const score = book.getScore();
	const scoreDisplay = renderScore(score);

	const isRead = book.getIsRead();
	const status = renderStatus(isRead);

	const bookList = document.querySelector("#bookList");

	const li = document.createElement("li");
	li.classList.add("row", "align-items-center", "border-bottom", "py-3");

	li.innerHTML = `
		<div class="col-3">
			<img 
				src="${book.getCover()}" 
				alt="Book cover of ${book.getTitle()} by ${book.getAuthor()}" 
				height="50" 
				width="auto"
			><div>
			${book.getTitle()} <span>${book.getYear()}</span></div>
		</div>

		<div class="col-3">
			${book.getAuthor()}
		</div>

		<div class="col-2">
			<span class="stars">${scoreDisplay}</span>
		</div>

		<div class="col-2">
			<span class="badge badge-status ${status.statusClass}">
			${status.statusString}
			</span>
		</div>

		<div class="col-2 text-end">
			<div class="actions">
				<button class="btn btn-sm btn-outline-dark">Edit</button>
				<button class="btn btn-sm btn-outline-danger">Remove</button>
			</div>
		</div>
	`;

	bookList.append(li);
}