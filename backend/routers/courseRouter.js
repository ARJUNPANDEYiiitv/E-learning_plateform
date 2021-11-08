import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Course from '../model/courseModel.js';


const courseRouter = express.Router();

courseRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (course) {
      res.send(course);
    } else {
      res.status(404).send({ message: 'Course Not Found.' });
    }
  })
);

export default courseRouter;