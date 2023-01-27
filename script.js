let myLibrary = [];
const bookshelf = document.querySelector('div.bookshelf')
const book = document.querySelector('.book')

//Used event delgation on bookshelf so that 
//I don't have to keep creating eventlister for individual books.
//this is for deleting books or updating read status in myLibrary
bookshelf.onclick = (e) => {
    const bookid = e.target.closest('.book').dataset.bookid
    if (e.target.classList.contains('x')){
        e.target.closest('.book').remove();
        deleteBookFromLibrary(bookid);
    } else if (e.target.classList.contains('checkbox')){
        updateRead(bookid, e.target.checked)
    }
}

const uid = function generateUniqueID() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

function updateRead(bookid,status) {
    updateInd = myLibrary.map(book => book.uid).indexOf(bookid)
    myLibrary[updateInd].read = status;
}

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.uid = uid();
    }
}

const displayBook = function addLastBookToBookshelf(newBook) {
    const libLastInd = myLibrary.length - 1;
    const copyBook = book.cloneNode(true);

    const bookFields = copyBook.querySelectorAll('.field')
    bookFields[0].textContent = newBook.title
    bookFields[1].textContent = newBook.author
    bookFields[2].textContent = newBook.pages
    bookFields[3].checked = newBook.read
    
    copyBook.classList.remove('template')
    copyBook.dataset.bookid = newBook.uid
    bookshelf.append(copyBook);   
}


//innerHTML method was kind of dangerous especially the way I was doing it.
// function displayBook(book, bookid) {
//     const bookForDisplay = document.createElement('div')
//     bookForDisplay.dataset.bookid = bookid
//     bookForDisplay.classList.add('book')

//     //may be better to get rid of the variables -> query all the child nodes -> replace the textcontent for security.
//     bookForDisplay.innerHTML = `
//         <div class="x"></div>
//         <div class="title">${book.title}</div>
//         <div class="author">${book.author}</div>
//         <div class="pages">${book.pages}</div>
//         <div class="checkbox">
//             <input type="checkbox" id="book-${bookid}">
//             <label for="book-${bookid}">Read</label>
//         </div>`

//     bookshelf.appendChild(bookForDisplay)
    
//     //update checkbox based on read status
//     let createdBook = document.querySelector(`.book[data-bookid="${bookid}"`)
//     let checkbox_div = createdBook.lastElementChild;
//     let readStatus = myLibrary[bookid].read;
//     checkbox_div.firstElementChild.checked = readStatus
    
//     //SOLVE THIS: How do I add event listener to the X and the label? 

// }




function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(
        title,
        author,
        pages,
        read
    )

    myLibrary.push(newBook)
    displayBook(newBook); //add last book in library to bookshelf
    console.log(myLibrary)
}

function deleteBookFromLibrary(bookid) {
    deletionIndex = myLibrary.map(book => book.uid).indexOf(bookid)
    if (deletionIndex != -1) myLibrary.splice(deletionIndex, 1)
}

// submit button grabs things only when filled out.
const bookForm = document.querySelector('form');

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    addBookToLibrary(
        e.target.title.value,
        e.target.author.value,
        e.target.pages.value,
        e.target.read.checked
    );
    
    //html form has various functions already (was clearing fields manually before.)
    bookForm.reset();
})


addBookToLibrary(
    'Jane Eyre',
    'Charlotte Bronte',
    536,
    false
)

addBookToLibrary(
    "Harry Potter and the Sorcerer's Stone",
    "J. K. Rowling",
    255,
    true
)

addBookToLibrary(
    "The Alchemist",
    "Paulo Coelho",
    300,
    false
)

addBookToLibrary(
    "Of Mice and Men",
    "John Steinbeck",
    107,
    false
)