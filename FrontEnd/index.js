const path = require("path");
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})
