import { Season } from "./season";
import { Course } from "./course";

export default interface Term {
    level: String,
    season: Season,
    year: Number,
    courses: Course[]
}