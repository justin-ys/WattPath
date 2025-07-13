import CourseDisplay from "@/app/widgets/scheduler/courseDisplay";
import { View, Text } from 'react-native';
import { SchedulerStyles } from "@/app/styles/schedulerStyles";
import { forwardRef } from 'react';

const CourseColumn = forwardRef<any, any>((props, ref) => {
    return (
        <div className="relative">
            {props.isDraggingOn ? <View className="bg-indigo-200" style={SchedulerStyles.courseColumnOverlay} /> : null}
            <View className="flex flex-col" ref={ref}>
                <div className="flex justify-between p-2">
                 {props.term ? <Text className="text-gray-400"><b>{props.term}</b></Text> : null}
                 {props.date ? <Text className="text-gray-400">{props.date}</Text> : null}
                </div>
                <View style={SchedulerStyles.courseList}>
                    {props.children}
                </View>
            </View>
        </div>
    )
});

CourseColumn.displayName = 'CourseColumn';

export default CourseColumn;