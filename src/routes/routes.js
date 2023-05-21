import { Router } from "express";
import validateSchema from "../middlewares/validateSchemas.js";
import { signinSchema, signupSchema } from "../schemas/signSchemas.js";
import { postSignIn, postSignUp } from "../controllers/users.controller.js";

const router = Router();

router.post("/signup", validateSchema(signupSchema), postSignUp);
router.post("/signin", validateSchema(signinSchema), postSignIn);

export default router;