const { v4 } = require('uuid');
const { readFiles, writeFiles } = require('../utils/utils');
const { CarSchema } = require('../validate/validate');
const data = readFiles('cars.json');

const cars = {
  CREATE_CAR: async (req, res) => {
    try {
      const result = await CarSchema.validateAsync(req.body);

      if (result.details) throw result;

      const checkCar = data.find((e) => e.title === result.title);

      if (checkCar) {
        return res.status(200).send({ message: 'Car already exists' });
      }

      data.push({
        id: v4(),
        ...result,
        createdAt: new Date(),
        userId: req.userId,
      });

      writeFiles('cars.json', data);

      res.status(201).send({ message: 'Car created successfully' });
    } catch (error) {
      res.status(400).send(error.details);
    }
  },

  GET_Car_FOR_USER: (req, res) => {
    const filteredData = data.filter((e) => e.userId === req.userId);
    res.status(200).send(filteredData);
  },

  GET_ALL_Car: (req, res) => {
    res.status(200).send(data);
  },
  FILEUPLOAD: (req, res) => {
    res.status(200).send(req.file);
  },
  DELETE_Car: (req, res) => {
    const findCar = data.find((e) => e.id === req.params.id);
    if (findCar) {
      data.map((e, i) => {
        if (e.id === findCar.id) {
          data.splice(i, 1);
          writeFiles('cars.json', data);
          return res.status(200).send({ message: 'Car deleted successfully' });
        }
      });
    } else {
      res.status(404).send({ message: 'Car not found' });
    }
  },
  UPDATE_Car: async (req, res) => {
    try {
      const result = await CarSchema.validateAsync(req.body);

      if (result.details) throw result;

      const findCar = data.find((e) => e.id === req.params.id);
      if (findCar) {
        data.map((e, i) => {
          data[i].title = req.body.title || data[i].title;
          data[i].price = req.body.price || data[i].price;
          data[i].color = req.body.author || data[i].color;
          writeFiles('cars.json', data);
          return res.status(200).send({ message: 'Car update successfully' });
        });
      } else {
        res.status(404).send({ message: 'Car not found' });
      }
    } catch (error) {
      res.status(400).send(error.details);
    }
  },
};
module.exports = cars;
