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
        this._isAvailable = status;
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
        this.books.forEach(book => {
            const availability = book.isAvailable ? "Available" : "Not Available";
            console.log(`${book.getDetails()} - ${availability}`);
        }); // list book details and show availability
    }
    getAvailableBooks() {
        return this.books.filter(book => book.isAvailable).length;
    } // use filter to get available books
    // Task 5: Handle Books Borrowing and Returning
    calculateTotalBooksAvailable() { // calculate total books available in specified section
        return this.getAvailableBooks(); // call getAvailableBooks to get # of books available
    }
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
class VIPPatron extends Patron {
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


//Task 6: Create and Manage Sections and Patrons
// create sections
const romance = new Section('Romance');
const biography = new Section('Biography');
// books
const book1 = new Book('It Ends with Us', 'Coleen Hoover', '1501110365');
const book2 = new Book('Friends, Lovers, and the Big Terrible Thing: A Memoir', 'Matthew Perry', '978-1250866448');
// add book to sec
romance.addBook(book1);
biography.addBook(book2);
// patrons
const normalPatron = new Patron('Laura');
const VipPatron = new VIPPatron('Nutella', true);

normalPatron.borrowedBook(book1); // normal borrowed book
VipPatron.borrowedBook(book1); // vip borrowed book
normalPatron.returnBook(book1); // normal returned book
biography.listBooks(); // list available books
console.log(`Available romance books:${romance.calculateTotalBooksAvailable()}`); // total romance books available
console.log(`Available biograhy books:${biography.calculateTotalBooksAvailable()}`); // total biography  books available