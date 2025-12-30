import CourseDisplay from "@/app/widgets/scheduler/courseDisplay";
import TermWarning from "@/app/widgets/scheduler/courseColumn/term_warning";
import { SchedulerStyles } from "@/app/styles/schedulerStyles";
import useInternalStyles from "@/app/hooks/useInternalStyles";
import { useSchedule } from "@/app/hooks/useSchedule";

import { View, Text } from 'react-native';
import { forwardRef } from 'react';
import React from 'react';

interface CourseColumnProps {
    term?: string;
    termNum?: number;
    date?: string;
    isDraggingOn?: boolean;
    id: string;
    children?: React.ReactNode;
    onDrop?: (courseData: any) => void;
}

const CourseColumn = forwardRef<View, CourseColumnProps>((props, ref) => {
    const overlayStyle = useInternalStyles(SchedulerStyles).courseColumnOverlay;

    const { unitsInTerm, unitsInFullTerm } = useSchedule();
    const incomplete = (props.termNum != null) ? (unitsInTerm(props.termNum) < unitsInFullTerm) : false;

    return (
        <View ref={ref} style={useInternalStyles(SchedulerStyles).courseColumn}>
            <View style={{maxHeight: '100%'}} className="flex flex-col flex-grow">
                {props.term || props.date ? <View className="flex flex-row justify-between items-center p-2">
                 {props.term ? 
                    <View className="flex flex-row justify-start align-middle gap-1">
                        <Text className="text-gray-400 text-base"><b>{props.term}</b></Text> 
                        {incomplete ? <TermWarning 
                            popupTitle="Incomplete term"
                            popupDescription={`This term only fulfills ${unitsInTerm(props.termNum!)} units. ${unitsInFullTerm} needed for a full term.`}
                        /> : null}
                    </View>
                : null}
                 {props.date ? <Text className="text-gray-400">{props.date}</Text> : null}
                </View> : null}
                {/* gap is set to 0 w/ margin set in courseDisplay so animations work, otherwise there will be awkward cuts */}
                <View className="gap-0 p-2 min-h-0 flex-grow" style={useInternalStyles(SchedulerStyles).courseList}>
                    {props.isDraggingOn ? <View className="bg-indigo-200" style={overlayStyle} /> : null}
                    {props.children}
                </View>
            </View>
        </View>
    )
});

CourseColumn.displayName = 'CourseColumn';

export default CourseColumn;