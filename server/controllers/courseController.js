import Course from "../models/courseModel.js";

export const createCourse = async (req, res) => {
    try {
        const { courseTitle, category } = req.body;
        if (!courseTitle || !category) {
            return res.status(400).json({
                message: "Course title and category is required!",
            });
        }

        const course = await Course.create({
            courseTitle,
            category,
            creator: req.id
        });

        return res.status(201).json({
            course,
            message: "Course created!"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to create course!",
        })
    }
}

export const getCreatorCourses = async (req, res) => {
    try {
        const userId = req.id;
        const courses = await Course.find({ creator: userId });

        if (!courses) {
            return res.status(404).json({
                courses: [],
                message: "Course not found!"
            })
        }

        return res.status(200).json({
            courses,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to fetch course!",
        })
    }
}