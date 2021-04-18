window.onload = () => {
    let myLibrary = []
    let bookList = document.querySelector("#book-list");
    let bookButton = document.querySelector("#submit-button");

    refreshBooksOnPage(myLibrary);
    
    function Book(title, author, pageCount, readStatus, id) {
        this.title = title
        this.author = author
        this.pageCount = pageCount
        this.readStatus = readStatus
        this.id = id
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
        myLibrary.push(new Book(bookTitle, bookAuthor, bookPageCount, bookReadStatus, myLibrary.length));
        refreshBooksOnPage(myLibrary);
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
    
    function refreshBooksOnPage(library) {
        resetBookIds(library);
        let bookSection = document.querySelector('#book-list');
        clearBooksOnPage(bookSection);
        // console.log(library);
        for (let i = 0; i < library.length; i++) {
            let newBookCard = generateBookComponent(library[i]);
            bookSection.appendChild(newBookCard);
        };
    }

    function clearBooksOnPage(bookSection) {
        while (bookSection.firstChild) {
            bookSection.removeChild(bookSection.firstChild);
        }
    }

    function resetBookIds(library) {
        for (let i = 0; i < library.length; i++) {
            library[i].id = i;
        }
    }

    function generateBookComponent(book) {
        // Create the card that will contain all info for a book
        let bookCard = document.createElement('div');
            bookCard.className = 'book-card'
            bookCard.setAttribute('data-boook-id', book.id);

            // Create the top row container
            let bookCardTopRow = document.createElement('div');
                bookCardTopRow.className = 'book-card--top-row';

                // Create title element
                let bookCardTitle = document.createElement('div');
                    bookCardTitle.className = 'book-card--title';
                    bookCardTitle.textContent = book.title;

                // Create author element
                let bookCardAuthor = document.createElement('div');
                    bookCardAuthor.className = 'book-card--author';
                    bookCardAuthor.textContent = 'By: ' + book.author;

                // Create page count element
                let bookCardPageCount = document.createElement('div');
                    bookCardPageCount.className = 'book-card--page-count';
                    let pagePluralization = Number(book.pageCount) > 1 ? "pages" : "page";
                    bookCardPageCount.textContent = book.pageCount + ' ' + pagePluralization;

                // Create read status element
                let bookCardReadStatus = document.createElement('div');
                    bookCardReadStatus.className = 'book-card--read-status';
                    
                    let read = document.createElement('span');
                        read.textContent = "Read";
                        read.className = 'status';
                    
                    let unread = document.createElement('span');
                        unread.textContent = "Unread";
                        unread.className = 'status';

                    if (book.readStatus === 'true') { 
                        read.classList.add('status--selected');
                        unread.addEventListener('click', () => {
                            book.readStatus = 'false';
                            refreshBooksOnPage(myLibrary);
                        });
                    }
                    else { 
                        unread.classList.add('status--selected');
                        read.addEventListener('click', () => {
                            book.readStatus = 'true';
                            refreshBooksOnPage(myLibrary);
                        });
                    }

                    // append spans to top row 
                    bookCardReadStatus.appendChild(read);
                    bookCardReadStatus.appendChild(unread);

                    
                    // Create bottom row
                    let bookCardBottomRow = document.createElement('div');
                    bookCardBottomRow.className = 'book-card--bottom-row';
                    
                    // Create delete button
                    let bookCardButton = document.createElement('button');
                    bookCardButton.className = 'btn';
                    bookCardButton.textContent = 'delete book';
                    bookCardButton.addEventListener("click", () => {
                        if (book.id > -1) { myLibrary.splice(book.id, 1) };
                        refreshBooksOnPage(myLibrary);
                    }); 
                    
            // Append book elements to top row
            bookCardTopRow.appendChild(bookCardTitle);
            bookCardTopRow.appendChild(bookCardAuthor);
            bookCardTopRow.appendChild(bookCardPageCount);
            bookCardTopRow.appendChild(bookCardReadStatus);

            // Append top row to book card 
            bookCard.appendChild(bookCardTopRow);

            // Append button to bottom row 
            bookCardBottomRow.appendChild(bookCardButton);

            // Append bottom row to book card 
            bookCard.appendChild(bookCardBottomRow);

        return bookCard;
    }

}