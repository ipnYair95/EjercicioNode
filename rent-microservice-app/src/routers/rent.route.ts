import { Router } from 'express'
import { createRent,getRentas,updateRent,deleteRent,getRenta } from '../controllers/rent.controller'

const router = Router();

router.route('/rent')
    .get(getRentas)
    .post(createRent);

router.route('/rent/:rentaId')
    .get(getRenta)
    .put(updateRent)
    .delete(deleteRent);

export default router;