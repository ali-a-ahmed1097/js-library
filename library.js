let books = [];
const cardButtonText = ['Toggle Read', 'Remove'];
const cardDivText = ['Title: ', 'Author: ', 'Pages: '];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pages}, ${this.read ? 'read' : 'not read yet'}`
}

const newBook = document.querySelector('.new');
const overlay = document.getElementById('overlay');
const form = document.getElementById('form');
const inputs = form.querySelectorAll('input');
const addBookBtn = document.getElementById('add');

newBook.addEventListener('click', () => {
    overlay.classList.add('overlay');
    form.classList.add('form');
    form.classList.toggle('hide');
});

function removeOverlay() {
    overlay.classList.remove('overlay');
    form.classList.remove('form');
    form.classList.toggle('hide');

    inputs.forEach(input => {
        input.value = '';
        input.checked = false;
    });
}

function addBook() {
    if (inputs[0].value !== '' && inputs[1].value !== '' && inputs[2].value !== '') {
        books.push(new Book(inputs[0].value, inputs[1].value, inputs[2].value - 0, inputs[3].checked));

        const booksDiv = document.getElementById('books');
        const newCard = document.createElement('div');
        delete newBook;

        for (let i = 0; i < 3; i++) {
            newCard.appendChild(document.createElement('div'));
            newCard.querySelector('div:last-of-type').textContent = cardDivText[i] + books[books.length - 1][inputs[i].name];
        }

        newCard.appendChild(document.createElement('div'));
        const status = books[books.length - 1].read;
        const statusDiv = newCard.querySelector('div:last-of-type');
        if (status)
            statusDiv.textContent = `Status: Read`;
        else
            statusDiv.textContent = 'Status: Not Read';

        for (let i = 0; i < 2; i++) {
            newCard.appendChild(document.createElement('button'));
            newCard.querySelector('button:last-of-type').textContent = cardButtonText[i];
        }

        newCard.querySelector('button:nth-of-type(1)').addEventListener('click', function () {
            books[books.length - 1].read = !books[books.length - 1].read;
            const statusDiv = newCard.querySelector('div:last-of-type');
            if (books[books.length - 1].read)
                statusDiv.textContent = `Status: Read`;
            else
                statusDiv.textContent = 'Status: Not Read';
        });

        newCard.querySelector('button:nth-of-type(2)').addEventListener('click', function () {
            delete books[books.length - 1];
            newCard.remove();
        });

        newCard.classList.add('card');
        booksDiv.appendChild(newCard);
        booksDiv.appendChild(newBook);

        removeOverlay();
    } else {
        console.log('here');
    }
}

const cancel = document.getElementById('cancel');
cancel.addEventListener('click', removeOverlay);
overlay.addEventListener('click', removeOverlay);
addBookBtn.addEventListener('click', addBook)