import { Term } from "./term";

export default interface Course {
    title: string;
    description?: string;
    units: number;
    prereqs?: Course[][];
    coreqs?: Course[][];
    allowed_programs: string[];
    min_level?: string;
    terms_offered: Term[];
}

export default interface CourseGroup {
    title: string;
    courses: Course[];
}