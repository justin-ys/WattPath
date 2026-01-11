import CourseColumn from "@/app/widgets/scheduler/courseColumn";
import {SchedulerStyles} from "@/app/styles/schedulerStyles";
import { View } from 'react-native';
import useInternalStyles from "@/app/hooks/useInternalStyles";
import { IconButton } from "react-native-paper";
import { useSchedule } from "@/app/hooks/useSchedule";

export default function ScheduleRow(props) {
    const { newTerm } = useSchedule();
    return (
        <View style={useInternalStyles(SchedulerStyles).scheduleRowContainer}>
            {props.children}
            <View className="flex items-center justify-center ml-2">
                <View className="flex items-center justify-center bg-gray-200 rounded-md h-[70%]">
                    <IconButton mode="contained" icon="plus" onPress={() => newTerm() }/>
                </View>
            </View>
        </View>
    )
}