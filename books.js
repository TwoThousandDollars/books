let myLibrary = [];

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

let corky = new Book("corky", "corky", 6, true);

console.log(corky.info());

