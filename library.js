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

newBook.addEventListener('click', () => {
    overlay.classList.add('overlay');
    form.classList.add('form');
    form.classList.toggle('hide');
});

function removeOverlay() {
    overlay.classList.remove('overlay');
    form.classList.remove('form');
    form.classList.toggle('hide');
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = '';
        input.checked = false;
    });
}

const cancel = document.getElementById('cancel');
cancel.addEventListener('click', removeOverlay);
overlay.addEventListener('click', removeOverlay);