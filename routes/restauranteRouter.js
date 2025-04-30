import { Router } from 'express'

import { RestauranteController } from '../controllers/restauranteController.js'

export const restauranteRouter = Router()

restauranteRouter.get('/', RestauranteController.getAll)
