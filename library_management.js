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

//