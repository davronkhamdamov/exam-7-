const { Router } = require('express');
const courseControl = require('../controller/course');
const router = Router();

// middleware

const uploadFile = require('../middleware/fileupload');

// course create

router.post('/create-course', courseControl.CREATE_COURSE);

router.post(
  '/create-course-file',
  uploadFile.single('file'),
  courseControl.FILEUPLOAD
);

// GET courses

router.get('/get-all-course', courseControl.GET_ALL_COURSE);
router.get('/get-course-for-user', courseControl.GET_COURSE_FOR_USER);
router.delete('/delete-course/:id', courseControl.DELETE_COURSE);
router.put('/update-course/:id', courseControl.UPDATE_COURSE);

module.exports = router;
