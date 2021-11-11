require('dotenv').config()
const { response } = require('express')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(morgan(function (tokens, req, res) {
  const method = tokens.method(req, res)
  return [
    method,
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    method === 'POST' ? JSON.stringify(req.body) : null
  ].join(' ')
}))

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
  Person.find({})
    .then(results => {
      res.json(results)
    })
    .catch(error =>{
      console.log("error getting persons:", error.message)
    })
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  person ? res.json(person) : res.status(404).end()
})

app.post('/api/persons', (req, res) => {
  const name = req.body.name
  const number = req.body.number
  if (!name || !number) {
    return res.status(400).json({
      error: "person's name/number is missing"
    })
  }

  const newPerson = new Person({
    name: name,
    number: number
  })

  newPerson.save()
    .then(savedPerson => {
      console.log(`${savedPerson} has been saved in the phonebook`)
      res.json(savedPerson)
    })
    .catch(error => {
      console.log("error adding person: ", error.message)
    })
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)
  res.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server is running on port ${PORT}`)