

// instantiate using objects

// Book class:  represents a Book
class Book{
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
//UI Class
class UI{
    static displayBook(){
         
        const books = Store.getBook();
        
        books.forEach((book) => UI.addBookToList(book));
        
        }
        static addBookToList(book){
            const List = document.querySelector('#book-list');

            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`

            List.appendChild(row);
    }

    static deleteBookList(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
            UI.showAlert('Book Deleted','success');
        }
    }
   
    static showAlert(message,className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div,form);

        //vanish in 3 seconds from DOM
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 2000);
    }

    static clearfeilds() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
    
}
//Class Store: store book to LocalStorage

class Store{
    static getBook(){
        let books;
        if(localStorage.getItem('books') === null)
        {
            books = [];  
        } else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        
        return  books;
    }

    static addBook(book){
        let books = Store.getBook();
      
      
       books.push(book);

        localStorage.setItem('books',JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBook();
        books.forEach((book,index)=> {
            if(book.isbn === isbn){
                books.splice(index,1);
            }
        });

        localStorage.setItem('books',JSON.stringify(books));
    }
}

//Event: Display Books
document.addEventListener('DOMContentLoaded',UI.displayBook);
//Event: Add a book
document.querySelector('#book-form').addEventListener('submit',(e) => {
    //Prevent actual submit
    e.preventDefault();

    //Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // Validate
    if(title === '' || author === '' || isbn === '')
    {
         UI.showAlert('Please fill the form','danger');
    }
    else{
//intantiate the book
let book = new Book(title,author,isbn);

//Add Book to UI
UI.addBookToList(book);



// Show success message
UI.showAlert('Book Added','success')

// clear fields
UI.clearfeilds();

//Add Book to store (localStorage)
Store.addBook(book);

}
    
});
//Event: Remove a book
document.querySelector('#book-list').addEventListener('click',(e) =>{
    UI.deleteBookList(e.target);
    
    Store.removeBook(e.target.parentElement.previousElementSibling.innerHTML);
   
}
);

