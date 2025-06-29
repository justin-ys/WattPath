import CourseColumn from "@/app/widgets/scheduler/courseColumn";
import Course from "@/app/widgets/scheduler/course";
import { Text } from "react-native-paper";
import { SchedulerStyles} from "@/app/styles/schedulerStyles";

export default function Checklist() {
    const requirements = [
        {
            label: "CS Units",
            totalUnits: 7.75,
            completedUnits: 5,
            courses: [
                {
                    title: "CS 135",
                    units: 1,
                },
                {
                    title: "CS 246",
                    units: 1,
                },
            ]
        },
        {
            label: "Math Units",
            totalUnits: 5.1,
            completedUnits: 4.0,
            courses: [
                {
                    title: "MATH 135",
                    units: 1,
                },
                {
                    title: "MATH 136",
                    units: 1,
                },
            ]
        }
    ]
    const program = "CS/Digital Hardware"
    return <div>
        <Text style={SchedulerStyles.checklistProgram} variant="titleMedium">Requirements for <i>{program}</i></Text>
        <div className="flex flex-row gap-2 mt-2">
        {requirements.map(requirement =>
            <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2 items-center">
                    <Text variant="headlineSmall">{requirement.label}</Text>
                    <Text variant="titleMedium" style={SchedulerStyles.checklistUnits}>({requirement.completedUnits}/{requirement.totalUnits})</Text>
                </div>
                <CourseColumn>
                {requirement.courses.map((course: Course) => {
                    return <Course title={course.title} />
                })}
                </CourseColumn>
            </div>)}
        </div>
    </div>
}