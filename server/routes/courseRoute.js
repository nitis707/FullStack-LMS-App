import express from "express";
import isAuthenticated from "../Middlewares/isAuthencated.js";
import { createCourse, editCourse, getCreatorCourses } from "../controllers/courseController.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.route("/").post(isAuthenticated, createCourse);
router.route("/").get(isAuthenticated, getCreatorCourses);
router.route("/:courseId").put(isAuthenticated, upload.single("courseThumbnail"), editCourse);


export default router;