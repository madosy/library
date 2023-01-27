1. Grab info from the form
2. Add info to the myLibrary array

bookForDisplay has a template:
- title
- author
- number of pages
- read status checkbox          <--- need event listener
- "x" for deleting the entry    <--- need event listener

div.book{data-bookid}
    div.title
    div.author
    div.pages
    div.status
    div.x

To create a book for display:
1. Create a div with all the elements
2. Query status and x by bookid
3. Add eventlistener