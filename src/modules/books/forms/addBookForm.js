export function getNewBookData(form) {
	const formData = new FormData(form);

	return {
		title: formData.get("bookTitle"),
		author: formData.get("bookAuthor"),
		year: formData.get("bookYear"),
		cover: formData.get("bookCover")
	}
}
