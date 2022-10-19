//const http = require('http')
//const hostName = '127.0.0.1'
//const port = 3000

//const server = http.createServer((req, res) => {
//  res.statusCode = 200
//  res.setHeader('Content-Type', 'text/plain')
//  res.end('My name is Amr Alshaaba and this is lab 1')
//})

//server.listen(port, hostName, () => {
//  console.log('Server is running up at http://${ hostName }: ${ port }')
//})

const express = require('express');
const { ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 3000;
const path = require('path')
var cors = require('cors');

app.use(cors());

const { connectToDb, getDb } = require('./db')
let db

connectToDb((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log('Listening on http://localhost:' + port)
      console.log('Connected to Database')
    })
    db = getDb()
  }
})

app.use(express.static('./FrontEnd'))

app.get('/homepage', (req, res) => {
  res.json("Welcome to BookStore")
})

app.get('/books', (req, res) => {
  let books = []
  db.collection('book')
    .find()
    .forEach(book => books.push(book))
    .then(() => {
      res.status(200).json(books)
    })
    .catch(() => {
      res.status(500).json({ error: 'Could not fetch data' })
    })
})
app.get('/books/author/:author', (req, res) => {
  db.collection('book')
    .find({ author: req.params.author })
    .toArray(function (err, result) {
      if (err) res.status(501).json(err);
      res.status(200).json(result)
    })

})

app.get('/books/name/:name', (req, res) => {

  db.collection('book')
    .findOne({ name: req.params.name })
    .then(doc => {
      res.status(200).json(doc)
    })
    .catch(err => {
      res.status(500).json({ error: 'Could not fetch data' })
    })

})





