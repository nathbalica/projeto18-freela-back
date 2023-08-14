import Joi from "joi";
// import joiDate from "@joi/date"

// const joi = joiBase.extend(joiDate)

export const signupSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
    "string.empty": "Name cannot be empty",
  }),
  cpf: Joi.string().pattern(/^\d{11}$/).required().messages({
    "any.required": "CPF is required",
    "string.empty": "CPF cannot be empty",
    "string.pattern.base": "Invalid CPF format",
  }),
  phone: Joi.string().pattern(/^\d{9,11}$/).required().messages({
    "any.required": "Phone number is required",
    "string.empty": "Phone number cannot be empty",
    "string.pattern.base": "Invalid phone number format",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.empty": "Email cannot be empty",
    "string.email": "Invalid email format",
  }),
  password: Joi.string().min(3).required().messages({
    "any.required": "Password is required",
    "string.empty": "Password cannot be empty",
    "string.min": "Password must be at least 3 characters",
  }),
  confirmPassword: Joi.string().min(3).valid(Joi.ref("password")).required().messages({
    "any.required": "Confirm password is required",
    "any.only": "Passwords do not match",
  }),
});


export const signinSchema = Joi.object({
  email: Joi.string().email().required().messages({
      "any.required": "Email is required",
      "string.empty": "Email cannot be empty",
      "string.email": "Invalid email format",
  }),
  password: Joi.string().min(3).required().messages({
      "any.required": "Password is required",
      "string.empty": "Password cannot be empty",
  })
});