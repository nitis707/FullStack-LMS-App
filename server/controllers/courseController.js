import Course from "../models/courseModel.js";
import { Lecture } from "../models/lectureModel.js";
import { deleteMediaFromCloudinary, deleteVideoFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

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

export const editCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const { courseTitle, subTitle, description, category, courseLevel, coursePrice } = req.body;
        const thumbnail = req.file;

        let course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                message: "Course not found!"
            })
        }
        let courseThumbnail;
        if (thumbnail) {
            if (course.courseThumbnail) {
                const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
                await deleteMediaFromCloudinary(publicId); // delete old image
            }
            // upload a thumbnail on clourdinary
            courseThumbnail = await uploadMedia(thumbnail.path);
        }


        const updateData = { courseTitle, subTitle, description, category, courseLevel, coursePrice, courseThumbnail: courseThumbnail?.secure_url };

        course = await Course.findByIdAndUpdate(courseId, updateData, { new: true });

        return res.status(200).json({
            course,
            message: "Course updated successfully!"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to update course!"
        })
    }
}

export const getCourseById = async (req, res) => {
    try {

        const { courseId } = req.params;
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                message: "Course not found!"
            });
        }

        return res.status(200).json({
            course
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to update course!"
        })
    }
}


// For Lectures

export const createLecture = async (req, res) => {
    try {
        const { lectureTitle } = req.body;
        const { courseId } = req.params;

        if (!lectureTitle || !courseId) {
            return res.status(400).json({
                message: "Lecture title is required!"
            })
        }

        // Create Lecture
        const lecture = await Lecture.create({ lectureTitle });

        const course = await Course.findById(courseId);
        if (course) {
            course.lectures.push(lecture._id);
            await course.save();
        }

        return res.status(201).json({
            lecture,
            message: "Lecture created successfully!"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to create lecture!"
        })
    }
}

export const getCourseLecture = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId).populate("lectures");

        if (!course) {
            return res.status(404).json({
                message: "Course not Found!"
            })
        }

        return res.status(200).json({
            lectures: course.lectures,
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to get lectures!"
        })
    }
}

export const editLecture = async (req, res) => {
    try {
        const { lectureTitle, videoInfo, isPreviewFree } = req.body;
        const { courseId, lectureId } = req.params;

        const lecture = await Lecture.findById(lectureId);
        if (!lecture) {
            return res.status(404).json({
                message: "Lecture not found!"
            })
        }

        // update lecture
        if (lectureTitle) lecture.lectureTitle = lectureTitle;
        if (videoInfo?.videoUrl) lecture.videoUrl = videoInfo.videoUrl;
        if (videoInfo?.publicId) lecture.publicId = videoInfo.publicId;
        lecture.isPreviewFree = isPreviewFree;

        await lecture.save();

        // Ensure the course still has the lecture id if it was not aleardy added;
        const course = await Course.findById(courseId);
        if (course && !course.lectures.includes(lecture._id)) {
            course.lectures.push(lecture._id);
            await course.save();
        };
        return res.status(200).json({
            lecture,
            message: "Lecture updated successfully!"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to update lecture!"
        })
    }
}

export const removeLecture = async (req, res) => {
    try {
        const { lectureId } = req.params;
        const lecture = await Lecture.findByIdAndDelete(lectureId);
        if (!lecture) {
            return res.status(404).json({
                message: "Lecture not found!"
            });
        }
        // delete the lecture from couldinary as well
        if (lecture.publicId) {
            await deleteVideoFromCloudinary(lecture.publicId);
        }

        // Remove the lecture reference from the associated course
        await Course.updateOne(
            { lectures: lectureId }, // find the course that contains the lecture
            { $pull: { lectures: lectureId } } // Remove the lectures id from the lectures array
        );

        return res.status(200).json({
            message: "Lecture removed successfully!"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to remove lecture!"
        })
    }
}

export const getLectureById = async (req, res) => {
    try {
        const { lectureId } = req.params;
        const lecture = await Lecture.findById(lectureId);
        if (!lecture) {
            return res.status(404).json({
                message: "Lecture not found!"
            });
        }
        return res.status(200).json({
            lecture
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to get lecture by id!"
        })
    }
}