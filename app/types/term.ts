import { Season } from "./season";
import { Course } from "./course";

export default interface Term {
    level: string,
    season: Season,
    year: number,
    courses: Course[]
}