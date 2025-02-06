// Interface for Book
class Book {
  constructor(title, author, publicationYear, isbn) {
    this.title = title;
    this.author = author;
    this.publicationYear = publicationYear;
    this.isbn = isbn;
    this.available = true;
  }

  getTitle() {
    return this.title;
  }

  getAuthor() {
    return this.author;
  }

  getPublicationYear() {
    return this.publicationYear;
  }

  getISBN() {
    return this.isbn;
  }

  isAvailable() {
    return this.available;
  }

  setAvailability(available) {
    this.available = available;
  }
}

// Interface for Reader
class Reader {
  constructor(name, address, phone, id) {
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.id = id;
    this.borrowedBooks = [];
  }

  getName() {
    return this.name;
  }

  getAddress() {
    return this.address;
  }

  getPhone() {
    return this.phone;
  }

  getId() {
    return this.id;
  }

  getBorrowedBooks() {
    return this.borrowedBooks;
  }

  borrowBook(book) {
    this.borrowedBooks.push(book);
  }

  returnBook(book) {
    this.borrowedBooks = this.borrowedBooks.filter(b => b.isbn !== book.isbn);
  }
}

// Interface for Library Management System
// class LibraryManagementSystem {
//   constructor() {
//     this.books = [];
//     this.readers = [];
//   }

//   addBook(book) {
//     if (this.books.find(b => b.isbn === book.isbn)) {
//       throw new Error("Book with this ISBN already exists in the library.");
//     }
//     this.books.push(book);
//   }

//   registerReader(reader) {
//     if (this.readers.find(r => r.id === reader.id)) {
//       throw new Error("Reader with this ID already registered.");
//     }
//     this.readers.push(reader);
//   }

//   borrowBook(isbn, readerId) {
//     const book = this.books.find(b => b.isbn === isbn);
//     const reader = this.readers.find(r => r.id === readerId);

//     if (!book) {
//       throw new Error("Book with this ISBN not found.");
//     }

//     if (!reader) {
//       throw new Error("Reader with this ID not found.");
//     }

//     if (!book.isAvailable()) {
//       throw new Error("Book is not available for borrowing.");
//     }

//     book.setAvailability(false);
//     reader.borrowBook(book);
//   }

//   returnBook(isbn, readerId) {
//     const book = this.books.find(b => b.isbn === isbn);
//     const reader = this.readers.find(r => r.id === readerId);

//     if (!book) {
//       throw new Error("Book with this ISBN not found.");
//     }

//     if (!reader) {
//       throw new Error("Reader with this ID not found.");
//     }

//     book.setAvailability(true);
//     reader.returnBook(book);
//   }

//   searchBooksByTitle(title) {
//     return this.books.filter(b =>
//       b.title.toLowerCase().includes(title.toLowerCase())
//     );
//   }

//   searchBooksByAuthor(author) {
//     return this.books.filter(b =>
//       b.author.toLowerCase().includes(author.toLowerCase())
//     );
//   }

//   getAllBooks() {
//     return this.books;
//   }

//   getAllReaders() {
//     return this.readers;
//   }
// }

// Example Usage (Command Line Interface)
const library = new LibraryManagementSystem();

// Adding Books
try {
  library.addBook(
    new Book(
      "The Little Prince",
      "Antoine de Saint-Exupéry",
      1943,
      "978-0156012195"
    )
  );
  library.addBook(new Book("1984", "George Orwell", 1949, "978-0451524935"));
  library.addBook(
    new Book(
      "The Master and Margarita",
      "Mikhail Bulgakov",
      1967,
      "978-5389004127"
    )
  );
} catch (error) {
  console.error(error.message);
}

// Registering Readers
try {
  library.registerReader(
    new Reader("John Doe", "123 Main St", "555-123-4567", "12345")
  );
  library.registerReader(
    new Reader("Jane Smith", "456 Oak Ave", "555-987-6543", "67890")
  );
} catch (error) {
  console.error(error.message);
}

// Borrowing a Book
try {
  library.borrowBook("978-0156012195", "12345");
  console.log("Book 'The Little Prince' borrowed by John Doe.");
} catch (error) {
  console.error(error.message);
}

// Searching for Books by Title
const searchResults = library.searchBooksByTitle("little");
console.log("Search results for 'little':", searchResults);

// Returning a Book
try {
  library.returnBook("978-0156012195", "12345");
  console.log("Book 'The Little Prince' returned by John Doe.");
} catch (error) {
  console.error(error.message);
}

// Listing All Books
console.log("List of all books:", library.getAllBooks());

// Listing All Readers
console.log("List of all readers:", library.getAllReaders());

// Additional error handling examples
try {
  library.borrowBook("978-0156012195", "12345"); // Attempt to borrow an already available book
} catch (error) {
  console.error(error.message); // Book is not available for borrowing.
}

try {
  library.registerReader(
    new Reader("New Reader", "New St", "555-111-2222", "12345")
  ); // Attempt to register a reader with an existing ID
} catch (error) {
  console.error(error.message); // Reader with this ID already registered.
}

// Output the availability status of the book after returning
const theLittlePrinceBook = library.books.find(
  b => b.isbn === "978-0156012195"
);
console.log(
  "Status of 'The Little Prince':",
  theLittlePrinceBook.isAvailable() ? "Available" : "Not Available"
);

// Check the list of borrowed books by the reader
const johnDoeReader = library.readers.find(r => r.id === "12345");
console.log(
  "List of books borrowed by John Doe:",
  johnDoeReader.getBorrowedBooks()
);

// Other task options (with description and requirements)

// 1. Book Reservation System

// Description: Extend the library management system by adding book reservation functionality.
// Readers should be able to reserve books that are currently unavailable.

// Requirements:
// - Add a method to reserve a book by a reader.
// - Implement a reservation queue for each book.
// - When a book becomes available, the first reader in the reservation queue should be notified (simple console.log).
// - Add a "reservationQueue" field to the Book object.
// - Implement handling for cases where a reader tries to reserve a book they have already reserved.
// - Method to delete a reservation if the reader changes their mind.

// 2. Transaction History System
// Description: Extend the library management system to keep a history of all book borrowing and return transactions.

// Requirements:
// - Create a "Transaction" class that will contain information about the book, reader, borrowing date, and return date (or null if the book has not been returned).
// - In the LibraryManagementSystem class, add an array to store "Transaction" objects.
// - When borrowing and returning books, create a new "Transaction" object and add it to the history array.
// - Implement a method to view the transaction history for a specific reader or a specific book.
// - Implement a method to view the entire transaction history.

// 3. Integration with an external data source (API to retrieve book information)
// Description: Integrate your library management system with an external API to automatically retrieve book information (e.g., cover, annotation).

// Requirements:
// - Choose a free API to retrieve book information (e.g., Google Books API).
// - Add a method to retrieve book information from the API by ISBN.
// - Extend the "Book" class by adding fields for cover and annotation.
// - When adding a new book, try to retrieve information from the API by ISBN and fill in the corresponding fields.
// - Ensure error handling if the API is unavailable or no information about the book is found.

// 4. Book Rating System
// Description: Add the ability for readers to rate books and leave reviews.

// Requirements:
// - Add a "rating" field (average rating) and a "reviews" array to the "Book" object.
// - Implement a method to add a review and rating to a book by a reader.
// - Update the average book rating after adding a new review.
// - Implement a method to get the average book rating.
// - Implement a method to view all reviews about a book.

// 5. Implementation using LocalStorage
// Description: Store book and reader data in LocalStorage so that data is not lost after reloading the page.

// Requirements:
// - When initializing LibraryManagementSystem, load data from LocalStorage (if it exists).
// - After each add, edit, or delete operation on books or readers, save the data to LocalStorage.
// - Use JSON.stringify and JSON.parse to convert data to JSON format for storage in LocalStorage.

// Important:
// To implement these extensions, you will need to modify the existing code and add new classes, methods, and properties. Don't forget about error handling and functionality testing. Choose one of these tasks and extend your current code. Good luck!
