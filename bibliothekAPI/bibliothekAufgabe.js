const express = require('express');
const app = express();
const port = 3000;

// Hier lade ich die Express JSON Middleware, damit ich an meine Endpunkte JSON-Daten im Body senden kann und diese direkt als JavaScript Objekt verfügbar werden.
app.use(express.json());

// generated with ChatGPT
let books = [
  { isbn: "978-0143124177", title: "The Goldfinch", year: "2013", author: "Donna Tartt" },
  { isbn: "978-0307277671", title: "The Road", year: "2006", author: "Cormac McCarthy" },
  { isbn: "978-0553386790", title: "The Book Thief", year: "2005", author: "Markus Zusak" },
  { isbn: "978-0812995343", title: "All the Light We Cannot See", year: "2014", author: "Anthony Doerr" },
  { isbn: "978-0375831003", title: "The Curious Incident of the Dog in the Night-Time", year: "2003", author: "Mark Haddon" },
  { isbn: "978-1501132957", title: "The Underground Railroad", year: "2016", author: "Colson Whitehead" },
  { isbn: "978-0679735779", title: "Beloved", year: "1987", author: "Toni Morrison" },
  { isbn: "978-0316769488", title: "The Catcher in the Rye", year: "1951", author: "J.D. Salinger" },
  { isbn: "978-0143039433", title: "Never Let Me Go", year: "2005", author: "Kazuo Ishiguro" },
  { isbn: "978-0345804310", title: "Gone Girl", year: "2012", author: "Gillian Flynn" }
];

// generated with ChatGPT
let lends = [
  { id: "092134877773", customer_id: "1", isbn: "978-0143124177", borrowed_at: "13.12.2023", returned_at: ""},
  { id: "092134877774", customer_id: "2", isbn: "978-0307277671", borrowed_at: "14.12.2023", returned_at: ""},
  { id: "092134877775", customer_id: "3", isbn: "978-0553386790", borrowed_at: "15.12.2023", returned_at: ""},
  { id: "092134877776", customer_id: "4", isbn: "978-0812995343", borrowed_at: "16.12.2023", returned_at: ""},
  { id: "092134877777", customer_id: "5", isbn: "978-0375831003", borrowed_at: "17.12.2023", returned_at: ""},
  { id: "092134877778", customer_id: "6", isbn: "978-1501132957", borrowed_at: "18.12.2023", returned_at: ""},
  { id: "092134877779", customer_id: "7", isbn: "978-0679735779", borrowed_at: "19.12.2023", returned_at: ""},
  { id: "092134877780", customer_id: "8", isbn: "978-0316769488", borrowed_at: "20.12.2023", returned_at: ""},
  { id: "092134877781", customer_id: "9", isbn: "978-0143039433", borrowed_at: "21.12.2023", returned_at: ""},
  { id: "092134877782", customer_id: "10", isbn: "978-0345804310", borrowed_at: "22.12.2023", returned_at: ""}
];


app.get('/books', (request, response) => {
  response.send(books);
});

app.get('/lends', (request, response) => {
  response.send(lends);
});

app.get('/lends/:id', (request, response) => {
  response.send(lends.find((lend) => lend.id === request.params.id ))
});

app.get('/books/:isbn', (request, response) => {
  response.send(books.find((book) => book.isbn === request.params.isbn ))
});

app.post('/lends', (request, response) => {
  lends.push(request.body);
  response.status(201).send(lends);
});


app.post('/books', (request, response) => {
  // immutable manipulation
  //books = [...books, request.body];
  // mutable manipulation
  books.push(request.body);
  response.status(201).send(books);
});

app.put('/books/:isbn', (request, response) => {
  books = books.map((book) => book.isbn === request.params.isbn ? request.body : book);
  /*
  books = books.map((book) => {
    if(book.isbn === request.params.isbn) {
      return request.body;
    } else {
      return book;
    }
  });
  */
  response.send(books);
});

app.patch('/lends/:id', (request, response) => {
  const keys = Object.keys(request.body);
  const oldlend = lends.find((lend) => lend.id === request.params.id );
  keys.forEach((key) => oldlend[key] = request.body[key]);
  lends = lends.map((lend) => lend.id === request.params.id ? oldlend : lend);
  response.send(lends);
});

app.patch('/books/:isbn', (request, response) => {
  const keys = Object.keys(request.body);
  const oldBook = books.find((book) => book.isbn === request.params.isbn );
  keys.forEach((key) => oldBook[key] = request.body[key]);
  books = books.map((book) => book.isbn === request.params.isbn ? oldBook : book);
  response.send(books);
});

app.delete('/books/:isbn', (request, response) => {
  books = books.filter((book) => book.isbn !== request.params.isbn);
  response.send(books);
});

app.listen(port, () => {
  console.log(`Bookstore app listening on port ${port}`);
});