
function formatScore(score) {
	if (score >= 1 && score <= 5) {
		return "★".repeat(score) + "☆".repeat(5 - score);
	}

	return "Not rated";
}

function formatStatus(isRead) {
	return {
		label: isRead ? "Read" : "Not read",
		class: isRead ? "read" : "not-read"
	}
}

export function createBookItem(book) {
	const score = formatScore(book.getScore());
	const status = formatStatus(book.getIsRead());

	const bookItem = document.createElement("li");
	bookItem.classList.add("row", "align-items-center", "border-bottom", "py-3");
	bookItem.dataset.id = book.getId();

	bookItem.innerHTML = `
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
			<span class="badge badge-status ${status.class}">
				${status.label}
			</span>
		</div>

		<div class="col-2 text-end">
			<div class="actions">
				<button class="btn btn-sm btn-outline-dark edit" data-bs-toggle="modal" data-bs-target="#editBookModal">Edit</button>
				<button class="btn btn-sm btn-outline-danger delete">Delete</button>
			</div>
		</div>
	`;

	return bookItem;
}
