import express, { json } from 'express'
import { randomUUID } from 'node:crypto'
import fs from 'node:fs'

import { validateMovie } from './schemes/movies.js'

const movies = JSON.parse(fs.readFileSync('./res/movies.json', 'utf-8'))

const app = express()
app.disable('x-powered-by')

const PORT = process.env.PORT || 1234

app.use(json()) // parse application/json

app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' })
})

// localhost:1234/movies
// localhost:1234/movies?genre=action
app.get('/movies', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')

    const { genre } = req.query
    if (genre) {
        const filteredMovies = movies.filter(
            movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
        )
        return res.json(filteredMovies)
    }
    res.json(movies)
})
// })

// localhost:1234/movies/c8a7d63f-3b04-44d3-9d95-8782fd7dcfaf
app.get('/movies/:id', (req, res) => { // path to regexp
    const { id } = req.params
    const movie = movies.find(m => m.id === id)
    if (movie) return res.json(movie)
    res.status(404).json({ error: 'Movie not found' })
})

// localhost:1234/movies
app.post('/movies', (req, res) => {
    // const {
    //     title,
    //     genre,
    //     year,
    //     director,
    //     duration,
    //     rate,
    //     poster
    // } = req.body

    const result = validateMovie(req.body)

    if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newMovie = {
        id: randomUUID(),
        ...result.data // Destructuring para obtener los datos validados
    }

    console.log(newMovie)

    // No rest porque guarda estado en servidor
    movies.push(newMovie)

    res.status(201).json(newMovie)
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
