import CourseColumn from "@/app/widgets/scheduler/courseColumn";
import {SchedulerStyles} from "@/app/styles/schedulerStyles";
import { View } from 'react-native';
import useInternalStyles from "@/app/hooks/useInternalStyles";

export default function ScheduleRow(props) {
    return (
        <View style={useInternalStyles(SchedulerStyles).scheduleRowContainer}>
            {props.children}
        </View>
    )
}