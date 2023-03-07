const { v4 } = require('uuid');
const { readFiles, writeFiles } = require('../utils/utils');
const { animalSchema } = require('../validate/validate');
const data = readFiles('animals.json');

const animal = {
  CREATE_ANIMAL: async (req, res) => {
    try {
      const result = await animalSchema.validateAsync(req.body);

      if (result.details) throw result;

      const checkAnimal = data.find((e) => e.title === result.title);

      if (checkAnimal) {
        return res.status(200).send({ message: 'Animal already exists' });
      }

      data.push({
        id: v4(),
        ...result,
        createdAt: new Date(),
        userId: req.userId,
      });

      writeFiles('animals.json', data);

      res.status(201).send({ message: 'Animal created successfully' });
    } catch (error) {
      res.status(400).send(error.details);
    }
  },

  GET_animal_FOR_USER: (req, res) => {
    const filteredData = data.filter((e) => e.userId === req.userId);
    res.status(200).send(filteredData);
  },

  GET_ALL_animal: (req, res) => {
    res.status(200).send(data);
  },
  FILEUPLOAD: (req, res) => {
    res.status(200).send(req.file);
  },
  DELETE_animal: (req, res) => {
    const findAnimal = data.find((e) => e.id === req.params.id);
    if (findAnimal) {
      data.map((e, i) => {
        if (e.id === findAnimal.id) {
          data.splice(i, 1);
          writeFiles('animals.json', data);
          return res
            .status(200)
            .send({ message: 'Animal deleted successfully' });
        }
      });
    } else {
      res.status(404).send({ message: 'Animal not found' });
    }
  },
  UPDATE_animal: async (req, res) => {
    try {
      const result = await animalSchema.validateAsync(req.body);

      if (result.details) throw result;

      const findAnimal = data.find((e) => e.id === req.params.id);
      if (findAnimal) {
        data.map((e, i) => {
          data[i].title = req.body.title || data[i].title;
          data[i].price = req.body.price || data[i].price;
          data[i].color = req.body.author || data[i].color;
          writeFiles('animals.json', data);
          return res
            .status(200)
            .send({ message: 'Animal update successfully' });
        });
      } else {
        res.status(404).send({ message: 'Animal not found' });
      }
    } catch (error) {
      res.status(400).send(error.details);
    }
  },
};
module.exports = animal;
