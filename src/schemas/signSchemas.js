import joi from "joi";

export const signupSchema = joi.object({
    name: joi.string().required().min(1),
    email: joi.string().email().required().min(1),
    password: joi.string().required().min(1),
    confirmPassword: joi.string().required().valid(joi.ref('password'))
})

export const signinSchema = joi.object({
    email: joi.string().email().required().min(1),
    password: joi.string().required().min(1)
})