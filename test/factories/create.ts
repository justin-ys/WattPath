import CourseFactory from "./CourseFactory"

export default function create(type: String, fields: Object = {}): any {
    var data = {};
    switch(type) {
        case "course":
            data = CourseFactory();
            break;
        default:
            throw new Error("Invalid factory")
    }

    return Object.assign({}, data, fields);
}