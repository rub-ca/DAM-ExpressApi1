import { RestauranteModel } from '../models/restauranteModel.js'
// import { MovieModel } from '../models/database/movie.js'
// import { validateMovie, validatePartialMovie } from '../schemas/movies.js'

export class RestauranteController {
  static async getAll (req, res) {
    const restaurante = await RestauranteModel.getAll()
    res.json(restaurante)
  }
}
