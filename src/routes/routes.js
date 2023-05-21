import { Router } from "express";
import validateSchema from "../middlewares/validateSchemas.js";
import { signupSchema } from "../schemas/signupSchema.js";
import { postSignUp } from "../controllers/users.controller.js";

const router = Router();

router.post("/signup", validateSchema(signupSchema), postSignUp);

export default router;