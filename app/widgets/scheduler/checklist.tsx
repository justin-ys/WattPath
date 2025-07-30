import CourseColumn from "@/app/widgets/scheduler/courseColumn";
import CourseDisplay from "@/app/widgets/scheduler/courseDisplay";
import { Text } from "react-native-paper";
import { SchedulerStyles} from "@/app/styles/schedulerStyles";
import { Course } from "@/app/types/course";
import useInternalStyles from "@/app/hooks/useInternalStyles";
import {View} from "react-native";

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
                    id: 15,
                    description: "Core Course",
                    units: 1,
                },
                {
                    title: "CS 246",
                    id: 16,
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
                    id: 17,
                    description: "Core Course",
                    units: 1,
                },
                {
                    title: "MATH 136",
                    id: 18,
                    description: "Core Course",
                    units: 1,
                },
                {
                    title: "MATH 137",
                    id: 19,
                    description: "Core Course",
                    units: 1,
                },
                {
                    title: "MATH 138",
                    id: 20,
                    description: "Core Course",
                    units: 1,
                },
                {
                    title: "MATH 139",
                    id: 21,
                    description: "Core Course",
                    units: 1,
                },
                {
                    title: "MATH 140",
                    id: 22,
                    description: "Core Course",
                    units: 1,
                },
                {
                    title: "MATH 141",
                    id: 23,
                    description: "Core Course",
                    units: 1,
                },
                {
                    title: "MATH 142",
                    id: 24,
                    description: "Core Course",
                    units: 1,
                },
                {
                    title: "MATH 143",
                    id: 25,
                    description: "Core Course",
                    units: 1,
                },
                {
                    title: "MATH 144",
                    id: 26,
                    description: "Core Course",
                    units: 1,
                },
            ]
        }
    ]
    const program = "CS/Digital Hardware"
    return <div style={{maxHeight: '80%', display: 'flex', flexDirection: 'column'}}>
        <Text style={useInternalStyles(SchedulerStyles).checklistProgram} variant="titleMedium">Requirements for <i>{program}</i></Text>
        <div style={{overflowX: 'scroll'}} className="flex flex-row gap-2 mt-2 justify-start">
        {requirements.map(requirement =>
            <div className="flex flex-col gap-2 min-h-0">
                <div className="flex flex-row gap-2 items-center flex-shrink-0">
                    <Text variant="headlineSmall">{requirement.label}</Text>
                    <Text variant="titleMedium" style={useInternalStyles(SchedulerStyles).checklistUnits}>({requirement.completedUnits}/{requirement.totalUnits})</Text>
                </div>
                <div style={{
                    flex: 1,
                    minHeight: 0,
                    overflow: 'scroll'
                }}>
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
                </div>
            </div>)}
        </div>
    </div>
}