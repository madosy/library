const myLibrary = [];
const bookshelf = document.querySelector('div.bookshelf');
const book = document.querySelector('.book');

const getBook = function findBookByUIDThenReturnBook(uid) {
  const getInd = myLibrary.map((item) => item.uid).indexOf(uid);
  return myLibrary[getInd];
};

function updateRead(bookid, status) {
  const updateInd = myLibrary.map((item) => item.uid).indexOf(bookid);
  myLibrary[updateInd].read = status;
}

class Book {
static generateUID() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.uid = Book.generateUID();
  }
}

const displayBook = function addLastBookToBookshelf(newBook) {
  const copyBook = book.cloneNode(true);

  const bookFields = copyBook.querySelectorAll('.field');
  bookFields[0].textContent = newBook.title;
  bookFields[1].textContent = newBook.author;
  bookFields[2].textContent = newBook.pages;
  bookFields[3].checked = newBook.read;

  copyBook.classList.remove('template');
  copyBook.dataset.bookid = newBook.uid;
  bookshelf.append(copyBook);
};

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(
    title,
    author,
    pages,
    read,
  );

  myLibrary.push(newBook);
  displayBook(newBook); // add last book in library to bookshelf
}

function deleteBookFromLibrary(bookid) {
  const deletionIndex = myLibrary.map((item) => item.uid).indexOf(bookid);
  if (deletionIndex !== -1) myLibrary.splice(deletionIndex, 1);
}

// submit button grabs things only when filled out.
const bookForm = document.querySelector('form');

function toggleOverlay(mode) {
  const overlay = document.querySelector('.overlay');
  if (mode === 1) overlay.classList.add('visible')
  else overlay.classList.remove('visible');
}

function changeFormDisplay(mode) {
    const modifyButton = document.querySelector('#modify-button');
    const submitButton = document.querySelector('#submit-button');
    const formTitle = document.querySelector('.form-container h2');
    switch (mode) {
      case 'reset':
        formTitle.textContent = 'Add a new book:';
        modifyButton.style.display = 'none';
        submitButton.style.display = 'unset';
        break;
      case 'modify':
        formTitle.textContent = 'Modify existing book:';
        modifyButton.style.display = 'unset';
        submitButton.style.display = 'none';
        break;
      default:
        break;
    }
}

function detailedView(testBook) {
  changeFormDisplay('modify');
  toggleOverlay(1);
  // const testBook = myLibrary[0];
  bookForm.uid.value = testBook.uid;
  bookForm.title.value = testBook.title;
  bookForm.author.value = testBook.author;
  bookForm.pages.value = testBook.pages;
  bookForm.read.checked = testBook.read;
}

(() => {
    // Modify button logic
    const modifyButton = document.querySelector('#modify-button');
    const modifyBook = () => {
        if (!bookForm.checkValidity()) {
          bookForm.reportValidity();
          return;
        }
      
        const uidSelected = bookForm.uid.value;
      
        // modify data in myLibrary
        const bookForModify = getBook(bookForm.uid.value);
        bookForModify.title = bookForm.title.value;
        bookForModify.author = bookForm.author.value;
        bookForModify.pages = bookForm.pages.value;
        bookForModify.read = bookForm.read.checked;
      
        // modify visually
        const selectedBook = document.querySelector(`.book[data-bookid="${uidSelected}"]`);
        const selectedBookFields = selectedBook.querySelectorAll('.field');
        selectedBookFields[0].textContent = bookForModify.title;
        selectedBookFields[1].textContent = bookForModify.author;
        selectedBookFields[2].textContent = bookForModify.pages;
        selectedBookFields[3].checked = bookForModify.read;
      
        changeFormDisplay('reset');
        bookForm.reset();
        toggleOverlay(0);
      }
    
    modifyButton.addEventListener('click',modifyBook)
      })();

(() => {
    // Cancel button logic
    const cancelButton = document.querySelector('#cancel-button')
    const cancelSubmit = () => {
        toggleOverlay(0);
        changeFormDisplay('reset');
        bookForm.reset();
    }
    cancelButton.addEventListener('click', cancelSubmit)
  })();


// Used event delgation on bookshelf so that
// I don't have to keep creating eventlister for individual books.
// this is for deleting books or updating read status in myLibrary
bookshelf.onclick = (e) => {
    const getBookid = () => e.target.closest('.book').dataset.bookid;
  
    if (e.target.classList.contains('x')) {
      const bookid = getBookid(); // I have to call from inside to prevent errors when clicking outside of a book but inside bookshelf
      e.target.closest('.book').remove();
      deleteBookFromLibrary(bookid);
    } else if (e.target.classList.contains('checkbox')) {
      const bookid = getBookid();
      updateRead(bookid, e.target.checked);
    }
  };

  bookshelf.addEventListener('dblclick', (e) => {
    const getBookid = () => e.target.closest('.book').dataset.bookid;
    const selectedBook = getBook(getBookid());
  
    detailedView(selectedBook);
  });

  bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
  
    addBookToLibrary(
      e.target.title.value,
      e.target.author.value,
      e.target.pages.value,
      e.target.read.checked,
    );
  
    // html form has various functions already (was clearing fields manually before.)
    bookForm.reset();
    toggleOverlay(0);
  });

// just adding data so it won't be empty;
myLibrary.push({
  title: 'Jane Eyre', author: 'Charlotte Bronte', pages: 536, read: false, uid: 'ldg8h4327lr9i3bwx9v',
});
myLibrary.push({
  title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J. K. Rowling', pages: 255, read: true, uid: 'ldg8h432zstj72n8ymk',
});
myLibrary.push({
  title: 'The Alchemist', author: 'Paulo Coelho', pages: 300, read: false, uid: 'ldg8h433vc9ug34um1h',
});
myLibrary.push({
  title: 'Of Mice and Men', author: 'John Steinbeck', pages: 107, read: false, uid: 'ldg8h433ptxa0k944ua',
});
myLibrary.push({
  title: 'My Grandmother Asked Me to Tell You She’s Sorry', author: 'FREDRIK BACKMAN', pages: 250, read: false, uid: 'ldg8h4330eqvct2xsctf',
});
myLibrary.forEach((obj) => Object.setPrototypeOf(obj, Object.create(Book.prototype)));

myLibrary.forEach((item) => displayBook(item));