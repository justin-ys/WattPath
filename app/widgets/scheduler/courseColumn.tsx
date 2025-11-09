import CourseDisplay from "@/app/widgets/scheduler/courseDisplay";
import { View, Text } from 'react-native';
import { SchedulerStyles } from "@/app/styles/schedulerStyles";
import { forwardRef } from 'react';
import useInternalStyles from "@/app/hooks/useInternalStyles";
import React from 'react';

interface CourseColumnProps {
    term?: string;
    date?: string;
    isDraggingOn?: boolean;
    id: string;
    children?: React.ReactNode;
    onDrop?: (courseData: any) => void;
}

const CourseColumn = forwardRef<View, CourseColumnProps>((props, ref) => {
    const overlayStyle = useInternalStyles(SchedulerStyles).courseColumnOverlay;

    return (
        <View ref={ref} style={useInternalStyles(SchedulerStyles).courseColumn}>
            <View style={{maxHeight: '100%'}} className="flex flex-col flex-grow">
                {props.term || props.date ? <View className="flex flex-row justify-between p-2">
                 {props.term ? <Text className="text-gray-400"><b>{props.term}</b></Text> : null}
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