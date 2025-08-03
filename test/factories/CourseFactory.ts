import { Course } from "@/app/types/course";
import { Season } from "@/app/types/season";

export default function CourseFactory(): Course {
    return {
        title: "Test Course",
        id: 1,
        description: "Test Course Description",
        units: 3,
        allowed_programs: ["Computer Science"],
        terms_offered: [Season.Spring]
    }
}