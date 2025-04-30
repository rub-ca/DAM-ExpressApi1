import express, { json } from 'express'
import { restauranteRouter } from './routes/restauranteRouter.js' // require -> commonJS

const app = express()
const PORT = process.env.PORT ?? 1234

app.use(json())
app.disable('x-powered-by')

app.use('/restaurantes', restauranteRouter)

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
  test()
})

function test () {
  console.log('testing')
}
