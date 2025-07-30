import CourseDisplay from "@/app/widgets/scheduler/courseDisplay";
import CourseColumn from "@/app/widgets/scheduler/courseColumn";
import ScheduleRow from "@/app/widgets/scheduler/scheduleRow";
import {
    TabsProvider,
    Tabs,
    TabScreen,
} from 'react-native-paper-tabs';
import Checklist from "@/app/widgets/scheduler/checklist";
import Problems from "@/app/widgets/scheduler/problems";
import {useEffect, useRef, useState, useMemo} from "react";
import Term from "@/app/types/term";
import {Course} from "@/app/types/course";
import {useSchedule} from "@/app/hooks/useSchedule";
import {View} from "react-native";
import {HEADER_SIZE} from "@/app/constants";

export default function SchedulerPage() {
    const {terms, addCourse} = useSchedule();

    const courseRefs = [];
    const [isDraggedOn, setIsDraggedOn] = useState({});

    const onCourseDrop = (x: number, y: number, course: Course) => {
        courseRefs.forEach((ref, idx) => {
            const rect = ref.current?.getBoundingClientRect();
            if (ref.current &&
                x >= rect.left &&
                x <= rect.right &&
                y <= rect.bottom - HEADER_SIZE && // something to do with the header idk never change the size of the header
                y >= rect.top - HEADER_SIZE) {
                addCourse(idx, course);
            }
        });
    }

    const onDragUpdate = (x: number, y: number, course: Course) => {
        courseRefs.forEach((ref, idx) => {
            const rect = ref.current?.getBoundingClientRect();
            if (ref.current &&
                x >= rect.left &&
                x <= rect.right &&
                y <= rect.bottom - HEADER_SIZE &&
                y >= rect.top - HEADER_SIZE) {
                    setIsDraggedOn(prevIsDraggedOn => ({
                        ...prevIsDraggedOn,
                        [idx]: true
                    }))
            }
            else setIsDraggedOn(prevIsDraggedOn => ({
                ...prevIsDraggedOn,
                [idx]: false
            }))
        })
    }

    const onDragEnd = (x: number, y: number, course: Course) => {
        setIsDraggedOn({})
    }

    return (
        <>
        <div className="flex flex-col gap-10 max-h-full">
            <ScheduleRow>
                {terms.map((term, idx) => {
                    const courseRef = useRef(null);
                    courseRefs.push(courseRef);
                    return (
                        <View style={{ maxHeight: '50vh', overflow: 'scroll' }}>
                            <CourseColumn
                                key={`${term.season}-${term.year}-${term.level}`}
                                term={term.level}
                                date={`${term.season} ${term.year}`}
                                isDraggingOn={isDraggedOn[idx] || false}
                                ref={courseRef}
                            >
                                {term.courses.map((course: Course) => (
                                    <CourseDisplay
                                        key={course.id || course.title}
                                        title={course.title}
                                        description={course.description}
                                    />
                                ))}
                            </CourseColumn>
                        </View>
                    );
                })}
            </ScheduleRow>
        </div>
        <TabsProvider defaultIndex={0}>
            <Tabs style={{ marginBottom: 20, overflow: 'scroll' }}
                    tabHeaderStyle={{ display: 'flex', alignItems: 'start' }}>
                <TabScreen label="Checklist">
                    <Checklist onCourseDrop={onCourseDrop} onDragUpdate={onDragUpdate} onDragEnd={onDragEnd} />
                </TabScreen>
                <TabScreen label="Problems">
                    <Problems />
                </TabScreen>
            </Tabs>
        </TabsProvider>
        </>
    )
}