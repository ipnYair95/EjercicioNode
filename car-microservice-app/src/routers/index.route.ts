import {Router} from 'express';
import { indexWelcome } from "../controllers/index.controller";
import { getCars } from "../controllers/auto.controller";

const router = Router();
 
router.route('/').get(indexWelcome);

export default router;