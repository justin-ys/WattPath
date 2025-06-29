import CourseColumn from "@/app/widgets/scheduler/courseColumn";
import {SchedulerStyles} from "@/app/styles/schedulerStyles";
import { View } from 'react-native';

export default function ScheduleRow(props) {
    return (
        <View style={SchedulerStyles.scheduleRowContainer}>
            {props.children}
        </View>
    )
}