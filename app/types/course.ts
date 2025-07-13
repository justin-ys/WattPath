import { Season } from "./season";

export interface Course {
    title: string;
    id: number;
    description?: string;
    units: number;
    prereqs?: Course[][];
    coreqs?: Course[][];
    allowed_programs: string[];
    min_level?: string;
    terms_offered: Season[];
}

export interface CourseGroup {
    title: string;
    courses: Course[];
}