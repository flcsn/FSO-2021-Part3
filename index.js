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
  Person.collection.count({}).then(count => {
    const info = 
    `
    <p> Phonebook has info for ${count} people </p>
    <p> ${new Date()} </p>
    `
    res.send(info)
  })
})

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then(results => {
      res.json(results)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id)
    .then(person => {
      person ? res.json(person) : res.status(404).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
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
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const name = req.body.name
  const number = req.body.number
  if (!name || !number) {
    return res.status(400).json({
      error: "person's name/number is missing"
    })
  }

  const newPerson = {
    name: name,
    number: number
  }

  Person.findByIdAndUpdate(req.params.id, newPerson, {new: true})
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'})
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server is running on port ${PORT}`)