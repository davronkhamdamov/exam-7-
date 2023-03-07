const Joi = require('joi');
const UserSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(4).required(),
});
const LoginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(4).required(),
});

const CourseSchema = Joi.object({
  title: Joi.string().required(),
  price: Joi.string().required(),
  author: Joi.string().required(),
});
const CarSchema = Joi.object({
  title: Joi.string().required(),
  price: Joi.string().required(),
  color: Joi.string().lowercase().required(),
});
const animalSchema = Joi.object({
  title: Joi.string().required(),
  price: Joi.string().required(),
});
module.exports = {
  UserSchema,
  LoginSchema,
  CourseSchema,
  CarSchema,
  animalSchema,
};
