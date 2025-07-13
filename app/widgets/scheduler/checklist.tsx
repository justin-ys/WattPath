import CourseColumn from "@/app/widgets/scheduler/courseColumn";
import CourseDisplay from "@/app/widgets/scheduler/courseDisplay";
import { Text } from "react-native-paper";
import { SchedulerStyles} from "@/app/styles/schedulerStyles";
import { Course } from "@/app/types/course";

interface ChecklistProps {
    onCourseDrop: (x: number, y: number, course: Course) => void,
    onDragUpdate: (x: number, y: number, course: Course) => void,
    onDragEnd: (x: number, y: number, course: Course) => void
}

export default function Checklist(props: ChecklistProps) {
    const requirements = [
        {
            label: "CS Units",
            totalUnits: 7.75,
            completedUnits: 5,
            courses: [
                {
                    title: "CS 135",
                    id: 10,
                    description: "Core Course",
                    units: 1,
                },
                {
                    title: "CS 246",
                    id: 11,
                    description: "Core Course",
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
                    id: 12,
                    description: "Core Course",
                    units: 1,
                },
                {
                    title: "MATH 136",
                    id: 13,
                    description: "Core Course",
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
                    return <CourseDisplay title={course.title}
                                          description={course.description}
                                          onDrop={(x, y) => props.onCourseDrop(x, y, course)}
                                          onDragUpdate={(x, y) => props.onDragUpdate(x, y, course)}
                                          onDragEnd={(x, y) => props.onDragEnd(x, y, course)}
                                          draggable />
                })}
                </CourseColumn>
            </div>)}
        </div>
    </div>
}