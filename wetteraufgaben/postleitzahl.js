const express = require('express')
const app = express()
const port = 3000

let postleitzahlGlobal = 0;

app.get('/', function(req, res) {
  res.send('Willkommen auf meiner Website!');
});

app.get('/:postleitzahl', function(req, res) {
  const postleitzahl = req.params.postleitzahl
  console.log(`Diese Postleitzahl wurde eingegeben: ${postleitzahl}`)

  postleitzahlGlobal = postleitzahl
  res.send({
    'postleitzahl': postleitzahl,
  });
});

app.listen(port)
