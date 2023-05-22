import { Router } from "express";
import validateSchema from "../middlewares/validateSchemas.js";
import { signinSchema, signupSchema, urlSchema } from "../schemas/schemas.js";
import { postSignIn, postSignUp } from "../controllers/users.controller.js";
import { shortenURL } from "../controllers/url.controller.js";
import { shortenURLAuthenticate } from "../middlewares/authentication.js";

const router = Router();

router.post("/signup", validateSchema(signupSchema), postSignUp);
router.post("/signin", validateSchema(signinSchema), postSignIn);
router.post("/urls/shorten", validateSchema(urlSchema), shortenURLAuthenticate , shortenURL);

export default router;