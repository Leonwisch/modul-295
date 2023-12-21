const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const names = new Set(["Leonardo", "Michelangelo", "Donatello", "Raphael"])

app.get("/names", (request, response) => {
	response.json(Array.from(names))
})

app.post("/names", (request, response) => {
	const name = request.body.name
	names.add(name)
	response.sendStatus(201)
})

app.delete("/names", (request, response) => {
	const name = request.body.name
	if(names.has(name)) {
		names.delete(name)
		response.sendStatus(204)
	} else {
		response.sendStatus(404)
	}
})

app.get("/secret2", (request, response) => {
	const auth = request.headers.authorization
	if(auth == "Basic aGFja2VyOjEyMzQ=") {
		response.sendStatus(200)
	} else {
		response.sendStatus(401)
	}
})

app.get("/chuck", async (request, response) => {
	const apiResponse = await fetch(`https://api.chucknorris.io/jokes/random`)
	const data = await apiResponse.json()
	const joke = data.value
	const name = request.query.name
	response.send(joke.replace("Chuck Norris", name))
})

const me = {
	firstName: "Diego",
	lastName: "Steiner",
	age: 36,
	place: "Uster",
	eyeColor: "brown"
}

app.get('/me', (request, response) => {
	response.json(me)
})

app.patch('/me', (request, response) => {
	const merge = request.body
	const result = {
		...me,
		...merge
	}

	response.json(result)
})

app.listen(3000)
