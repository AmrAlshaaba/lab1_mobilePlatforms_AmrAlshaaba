let html = ''
const getBooks = async () => {
  const cards = document.getElementById('books')
  console.log(cards)
  let books = await (await fetch('http://localhost:3000/books')).json();
  console.log("Hello im here");
  console.log(books)
  html += '<table class="table-primary table-bordered m-3 p-4"><thead class="table-secondary"><tr><th>Name</th><th>Author</th><th>Date</th><th>Genre</th></tr></thead><tbody>'
  books.forEach(element => {
    console.log(element.author)
    html += '<tr> <td>' + element.name + '</td>'
    html += '<td> ' + element.author + '</td>'
    html += '<td> ' + element.date.substring(0, 10).toString() + '</td>'
    html += '<td>' + element.genre + '</td></tr>'
  });
  html += '</tbody></table>'
  cards.innerHTML = html;
}

getBooks();

