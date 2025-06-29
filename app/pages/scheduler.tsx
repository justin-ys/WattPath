import Course from "@/app/widgets/scheduler/course";
import CourseColumn from "@/app/widgets/scheduler/courseColumn";
import ScheduleRow from "@/app/widgets/scheduler/scheduleRow";
import {
    TabsProvider,
    Tabs,
    TabScreen,
} from 'react-native-paper-tabs';
import Checklist from "@/app/widgets/scheduler/checklist";
import Problems from "@/app/widgets/scheduler/problems";

export default function SchedulerPage() {
    return (
        <div className="flex flex-col gap-10">
            <ScheduleRow>
                <CourseColumn term="1A" date="Fall 2022">
                    <Course title="CS 135" description="Core Course" disabled/>
                    <Course title="SPCOM 223" description="Communication" specialDescription="B&D: " />
                    <Course title="MATH 135" description="Core Course" />
                    <Course title="PHYS 121" description="Pure Science" specialDescription="B&D: "/>
                    <Course title="MATH 137" description="Core Course" />
                </CourseColumn>
                <CourseColumn term="1B" date="Winter 2023">
                    <Course title="test7" />
                    <Course title="test8" />
                </CourseColumn>
            </ScheduleRow>
            <TabsProvider defaultIndex={0}>
                <Tabs style={{ marginBottom: 20 }}
                        tabHeaderStyle={{ display: 'flex', alignItems: 'start' }}>
                    <TabScreen label="Checklist">
                        <Checklist />
                    </TabScreen>
                    <TabScreen label="Problems">
                        <Problems />
                    </TabScreen>
                </Tabs>
            </TabsProvider>
        </div>
    )
}