const { readFiles, writeFiles } = require('../utils/utils');
const data = readFiles('users.json');
const { UserSchema, LoginSchema } = require('../validate/validate');
const { v4 } = require('uuid');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const users = {
  // Register

  REGISTER: async (req, res) => {
    try {
      const result = await UserSchema.validateAsync(req.body);
      if (result.details) throw result;
      const user = data.find((user) => user.email === result.email);
      if (user) {
        return res.status(200).json({ message: 'User already registered' });
      }
      const hashPassword = await bcryptjs.hash(result.password, 10);
      data.push({
        id: v4(),
        username: result.username,
        email: result.email,
        password: hashPassword,
      });
      writeFiles('users.json', data);
      return res.status(201).json({ message: 'User created' });
    } catch (error) {
      if (error) {
        return res.status(400).send(error.details);
      }
    }
  },

  // Login

  LOGIN: async (req, res) => {
    try {
      const result = await LoginSchema.validateAsync(req.body);
      if (result.details) throw result;
      const user = data.find((user) => user.email === result.email);
      if (user) {
        const isMatch = await bcryptjs.compare(result.password, user.password);
        if (isMatch) {
          const token = await jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            {
              expiresIn: process.env.TIME,
            }
          );
          res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            token,
          });
        } else {
          res.status(200).send({
            message: 'Password wrong',
          });
        }
      } else {
        res.status(404).send({ message: 'User not found' });
      }
    } catch (error) {
      if (error) {
        return res.status(400).send(error.details);
      }
    }
  },
};
module.exports = users;
