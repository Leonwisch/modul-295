const express = require("express")
const fs = require("fs")
const app = express()

const names = ["Leonardo", "Michelangelo", "Donatello", "Raphael"]

app.get('/now', (request, response) => {
  const now = new Date().toLocaleTimeString()
  response.send(`Es ist gerade: ${now}`)
});

app.get('/zli', (request, response) => {
  const to = "https://www.zli.ch"
  response.redirect(to)
});

app.get('/name', (request, response) => {
  const randomName = names[Math.floor(Math.random() * names.length)]
  response.send(`Hallo ${randomName}`)
});

app.get('/image', (request, response) => {
  response
    .type('gif')
    .sendFile(__dirname + '/thumbs-up.gif')
});

app.get('/teapot', (request, response) => {
  response.sendStatus(418) 
});

app.get('/user-agent', (request, response) => {
  const userAgent = request.headers["user-agent"]
  response.send(`Du nutzt: ${userAgent}`)
});

app.get('/secret', (request, response) => {
  response.sendStatus(401)
});

app.get('/me', (request, response) => {
  const me = {
    "firstName": "Leon",
    "lastName": "Fässler",
    "age": "16",
    "place": "Adliswil"
  }
  response.json(me)
});

app.get('/html', (request, response) => {
  response.sendFile(__dirname + '/index.html');
});

app.get('/xml', (request, response) => {
  response
    .type('xml')
    .sendFile(__dirname + '/test.xml')
});

app.listen(3000)