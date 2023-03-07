const { Router } = require('express');
const carControl = require('../controller/cars');
const router = Router();

// middleware

const uploadFile = require('../middleware/fileupload');

// car create

router.post('/create-car', carControl.CREATE_CAR);
router.post(
  '/create-car-file',
  uploadFile.single('file'),
  carControl.FILEUPLOAD
);

// GET cars

router.get('/get-all-car', carControl.GET_ALL_Car);
router.get('/get-car-for-user', carControl.GET_Car_FOR_USER);
router.delete('/delete-car/:id', carControl.DELETE_Car);
router.put('/update-car/:id', carControl.UPDATE_Car);

module.exports = router;
