import Course from "@/app/widgets/scheduler/course";
import { View, Text } from 'react-native';
import { SchedulerStyles } from "@/app/styles/schedulerStyles";

export default function CourseColumn(props) {
    return (
        <View style={SchedulerStyles.courseColumn}>
            <div className="flex justify-between p-2">
             {props.term ? <Text className="text-gray-400"><b>{props.term}</b></Text> : null}
             {props.date ? <Text className="text-gray-400">{props.date}</Text> : null}
            </div>
            {props.children}
        </View>
    )
}