const { response } = require('express')
const express = require('express')
const app = express()

app.use(express.json())

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/', (req, res) => {
  res.send("<h1>Hello World!</h1>")
})

app.get('/info', (req, res) => {
  const info = `
  <p> Phonebook has info for ${persons.length} people </p>
  <p> ${new Date()} </p>`
  res.send(info)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  person ? res.json(person) : res.status(404).end()
})

const generateId = () => {
  min = Math.ceil(0);
  max = Math.floor(1000);
  return Math.floor(Math.random() * (max - min) + min);
}

app.post('/api/persons', (req, res) => {
  const name = req.body.name
  const number = req.body.number
  if (!name || !number) {
    return res.status(400).json({
      error: "person's name/number is missing"
    })
  }

  const match = persons.filter(p => p.name === name)
  if (match.length > 0) {
    return res.status(400).json({
      error: "that person already exists"
    })
  }

  const newPerson = {
    id: generateId(),
    name: name,
    number: number
  }

  persons = persons.concat(newPerson)
  res.json(newPerson)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)
  res.status(204).end()
})

const PORT = 3001
app.listen(PORT)
console.log(`Server is running on port ${PORT}`)