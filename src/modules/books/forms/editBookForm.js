export function populateEditForm(form, book) {
	const scoreContainer = form.querySelector("#editScore");

	form.elements.editBookTitle.value = book.getTitle();
	form.elements.editBookAuthor.value = book.getAuthor();
	form.elements.editBookYear.value = book.getYear();
	form.elements.editBookCover.value = book.getCover();

	form.querySelector(book.getIsRead() ? "#markAsRead" : "#markAsUnread").checked = true;

	if (book.getIsRead()) {
		showScore(scoreContainer); setScore(book.getScore());
	} else {
		hideScore(scoreContainer);
	}
}

export function getEditBookData(form) {
	const formData = new FormData(form);

	const score = formData.get("score");
	const readStatus = formData.get("readStatus");

	return {
		score: score ? Number(score) : null,
		isRead: readStatus === "read"
	};
}

export function setupReadStatus(form) {
	const scoreContainer = form.querySelector("#editScore");
	const scoreButtons = form.querySelectorAll('input[name="score"]');
	const readStatusInputs = form.querySelectorAll('input[name="readStatus"]');

	readStatusInputs.forEach(input => {
		input.addEventListener("change", event => {
			if (event.target.value === "read") {
				showScore(scoreContainer);
			} else {
				hideScore(scoreContainer);
				clearScore(scoreButtons);
			}
		});
	});
}

export function showScore(scoreContainer) {
	scoreContainer.hidden = false;
}

export function hideScore(scoreContainer) {
	scoreContainer.hidden = true;
}

export function clearScore(scoreButtons) {
	scoreButtons.forEach(button => {
		button.checked = false;
	});
}

export function setScore(score) {
	if (score !== null) {
		form.querySelector(`#score${score}`).checked = true;
	}
}