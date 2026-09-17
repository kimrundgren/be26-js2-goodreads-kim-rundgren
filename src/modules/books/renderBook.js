export function renderBook(book) {
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
			>
			<div>
				${book.getTitle()} <span>${book.getYear()}</span>
			</div>
		</div>

		<div class="col-3">
			${book.getAuthor()}
		</div>

		<div class="col-2">
			<span class="stars"></span>
		</div>

		<div class="col-2">
			<span class="badge badge-status"></span>
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