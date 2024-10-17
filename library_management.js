//Task 1: Create a Book Class
class Book {
    constructor(title, author, ISBN) {
        this.title = title;
        this.author = author;
        this.ISBN = ISBN;
        this._isAvailable = true;
    } // using "this" to assign value to parameter
    getDetails() {
        return `${this.title} by ${this.author}, ISBN: ${this.ISBN}`;
    } // return string with book details
    get isAvailable() {
        return this._isAvailable;
    } // return current status
    set isAvailable(status) {
        this.isAvailable = status;
    } // allows to if the book status changes
}

//Create a Section Class
class Section { // store books in array
    constructor(name) {
        this.name = name;
        this.books = [];
    }
    addBook(book) {
        this.books.push(book);
    } // add new book to section
    listBooks() {
        this.books.forEach(books => {
            const availability = book.isAvailable ? "Available" : "Not Available";
            console.log(`${book.getDetails()} - ${availability}`);
        }); // list book details and show availability
    }
    getAvailableBooks() {
        return this.books.filter(book => book.isAvailable).length;
    } // use filter to get available books
}

// Task 3: Create a Patron Class
class Patron {
    constructor(name) {
        this.name = name;
        this.borrowedBooks = []; // store array of books borrowed
    }
    borrowedBook(book) { //  Allows the patron to borrow a book if it is available and updates the book’s status
        if (book.isAvailable) { // check if book is available
            this.borrowedBooks.push(book); // add book to borrowed
            book.isAvailable = false;
            console.log(`Book is borrowed`);
        } else { console.log(`Book is not available`) }
    }
    returnBook(book) { // Allows the patron to return a borrowed book, making it available again
        const bookIndex = this.borrowedBooks.indexOf(book); // find book
        if (bookIndex > -1) { // check if book is  borrowed
            this.borrowedBooks.splice(bookIndex, 1); // remove from borrowed 
            book.isAvailable = true; // update status to available
            console.log(`Book is returned`);
        } else { console.log(`Book was not borrowed`) }
    }
}

// Task 4: Create a VIPPatron Class that Inherits from Patron
class VIIPatron extends Patron {
    constructor(name, priority) {
        super(name); // call parent class constructor 
        this.priority = priority; // new parameter
    }
    borrowedBook(book) { // check if book is available and if VIP has priority
        if (this.priority && !book.isAvailable) {
            console.log(`${this.name} has priority borrowing`);
            book.isAvailable = true; //make book available
        } // check if book is borrowed, assign book to VIP bc it has priority 
        super.borrowedBook(book); // call borrowedBook to add book to borrowed list with new deatils
    }
}