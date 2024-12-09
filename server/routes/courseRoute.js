import express from "express";
import isAuthenticated from "../Middlewares/isAuthencated.js";
import { createCourse, editCourse, getCourseById, getCreatorCourses } from "../controllers/courseController.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.route("/").post(isAuthenticated, createCourse);
router.route("/").get(isAuthenticated, getCreatorCourses);
router.route("/:courseId").put(isAuthenticated, upload.single("courseThumbnail"), editCourse);
router.route("/:courseId").get(isAuthenticated, getCourseById);


export default router;