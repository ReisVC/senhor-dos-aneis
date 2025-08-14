import { Router } from 'express';
import { CharacterController } from '../controllers/CharacterController';

const router = Router();
const controller = new CharacterController();

router.get('/characters', controller.list);
router.get('/characters/:id', controller.getById);
router.post('/characters', controller.create);
router.put('/characters/:id', controller.update);
router.delete('/characters/:id', controller.delete);

export default router;