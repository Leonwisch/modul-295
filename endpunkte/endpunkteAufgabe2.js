const express = require("express")
const fs = require("fs")
const app = express()

const names = new Set(["Leonardo", "Michelangelo", "Donatello", "Raphael"])

app.get('/now', (request, response) => {
    const now = new Date().toLocaleTimeString()
    response.send(`Es ist gerade: ${now}`)
  });



app.listen(3000)