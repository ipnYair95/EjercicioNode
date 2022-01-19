import { Router } from 'express'
import { getCars, createCar, getCar, deleteCar, updateCar } from '../controllers/auto.controller'

const router = Router();

router.route('/auto')
    .get(getCars)
    .post(createCar);

router.route('/auto/:carId')
    .get(getCar)
    .delete(deleteCar)
    .put(updateCar);

export default router;