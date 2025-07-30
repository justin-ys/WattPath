import CourseDisplay from "@/app/widgets/scheduler/courseDisplay";
import { View, Text } from 'react-native';
import { SchedulerStyles } from "@/app/styles/schedulerStyles";
import { forwardRef } from 'react';
import useInternalStyles from "@/app/hooks/useInternalStyles";

const CourseColumn = forwardRef<any, any>((props, ref) => {
    const overlayStyle = useInternalStyles(SchedulerStyles).courseColumnOverlay
    return (
        <div style={{maxHeight: '100%' }}>
            {props.isDraggingOn ? <View className="bg-indigo-200" style={overlayStyle} /> : null}
            <div style={{maxHeight: '100%'}} className="flex flex-col" ref={ref}>
                <div className="flex justify-between p-2">
                 {props.term ? <Text className="text-gray-400"><b>{props.term}</b></Text> : null}
                 {props.date ? <Text className="text-gray-400">{props.date}</Text> : null}
                </div>
                <div className="gap-2 p-2 min-h-0" style={useInternalStyles(SchedulerStyles).courseList}>
                    {props.children}
                </div>
            </div>
        </div>
    )
});

CourseColumn.displayName = 'CourseColumn';

export default CourseColumn;