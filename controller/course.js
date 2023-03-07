const { v4 } = require('uuid');
const { readFiles, writeFiles } = require('../utils/utils');
const { CourseSchema } = require('../validate/validate');
const data = readFiles('course.json');

const course = {
  CREATE_COURSE: async (req, res) => {
    try {
      const result = await CourseSchema.validateAsync(req.body);

      if (result.details) throw result;

      const checkCourse = data.find((e) => e.title === result.title);

      if (checkCourse) {
        return res.status(200).send({ message: 'Course already exists' });
      }

      data.push({
        id: v4(),
        ...result,
        createdAt: new Date(),
        userId: req.userId,
      });

      writeFiles('course.json', data);

      res.status(201).send({ message: 'Course created successfully' });
    } catch (error) {
      res.status(400).send(error.details);
    }
  },

  GET_COURSE_FOR_USER: (req, res) => {
    const filteredData = data.filter((e) => e.userId === req.userId);
    res.status(200).send(filteredData);
  },

  GET_ALL_COURSE: (req, res) => {
    res.status(200).send(data);
  },
  FILEUPLOAD: (req, res) => {
    res.status(200).send(req.file);
  },
  DELETE_COURSE: (req, res) => {
    const findCourse = data.find((e) => e.id === req.params.id);
    if (findCourse) {
      data.map((e, i) => {
        if (e.id === findCourse.id) {
          data.splice(i, 1);
          writeFiles('course.json', data);
          return res
            .status(200)
            .send({ message: 'Course deleted successfully' });
        }
      });
    } else {
      res.status(404).send({ message: 'Course not found' });
    }
  },
  UPDATE_COURSE: async (req, res) => {
    try {
      const result = await CourseSchema.validateAsync(req.body);

      if (result.details) throw result;

      const findCourse = data.find((e) => e.id === req.params.id);
      if (findCourse) {
        data.map((e, i) => {
          data[i].title = req.body.title || data[i].title;
          data[i].price = req.body.price || data[i].price;
          data[i].author = req.body.author || data[i].author;
          writeFiles('course.json', data);
          return res
            .status(200)
            .send({ message: 'Course update successfully' });
        });
      } else {
        res.status(404).send({ message: 'Course not found' });
      }
    } catch (error) {
      res.status(400).send(error.details);
    }
  },
};
module.exports = course;
