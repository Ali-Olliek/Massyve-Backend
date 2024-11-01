import { Router } from 'express';
import * as authentication from '../../controllers/authentication';
import { validateSignIn, validateSignUp } from "../../middlewares/validations/authentication";
import isAuthenticatedMiddleware from '../../middlewares/isAuthenticated.middleware';

const router = Router();

router.post('/sign-in', validateSignIn ,authentication.login);
router.post('/sign-up', validateSignUp ,authentication.signup);
router.post('/refresh', isAuthenticatedMiddleware, authentication.refreshToken);

export default router;
