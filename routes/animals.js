const { Router } = require('express');
const animal = require('../controller/animals');
const router = Router();

// middleware

const uploadFile = require('../middleware/fileupload');

// animal create

router.post('/create-animal', animal.CREATE_ANIMAL);
router.post(
  '/create-animal-file',
  uploadFile.single('file'),
  animal.FILEUPLOAD
);

// GET animals

router.get('/get-all-animal', animal.GET_ALL_animal);
router.get('/get-animal-for-user', animal.GET_animal_FOR_USER);
router.delete('/delete-animal/:id', animal.DELETE_animal);
router.put('/update-animal/:id', animal.UPDATE_animal);

module.exports = router;
