window.onload = () => {
    let myLibrary = [];
    let bookList = document.querySelector("#book-list");
    let bookButton = document.querySelector("#submit-button");
    
    function Book(title, author, pageCount, readStatus) {
        this.title = title
        this.author = author
        this.pageCount = pageCount
        this.readStatus = readStatus
        this.info = () => {
            let pagePluralization = this.pageCount > 1 ? "pages" : "page";
            let readStatusPhrase = this.readStatus ? "read" : "not read yest"
            return (title + " by " + author + " has " + pageCount + " " + pagePluralization + ", " + readStatusPhrase)
        }
    }

    bookButton.addEventListener("click", () => {
        let bookTitle = document.querySelector("#book-title").value;
        let bookAuthor = document.querySelector("#book-author").value;
        let bookPageCount = document.querySelector("#page-count").value;
        let bookReadStatusRadios = document.getElementsByName("read-status");
        let bookReadStatus;
        for (let i = 0; i < bookReadStatusRadios.length; i++) {
            if (bookReadStatusRadios[i].checked) {
                bookReadStatus = bookReadStatusRadios[i].value;
                break;
            }
        }
        myLibrary.push(new Book(bookTitle, bookAuthor, bookPageCount, bookReadStatus));
        addBookToPage();
        clearForm();
    });

    function clearForm() {
        document.querySelector("#book-title").value = '';
        document.querySelector("#book-author").value = '';
        document.querySelector("#page-count").value = '';
        let bookReadStatusRadios = document.getElementsByName("read-status");
        let bookReadStatus;
        for (let i = 0; i < bookReadStatusRadios.length; i++) {
            bookReadStatusRadios[i].checked = false;
        }
    }





    let corky = new Book("corky", "corky", 6, true);

}