import * as React from 'react';
import { List } from 'react-native-paper';
import { Text } from 'react-native-paper';
import { SchedulerStyles} from "@/app/styles/schedulerStyles";
import star from "@/assets/images/star_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png"
import SchedulerPage from "@/app/pages/scheduler";


export default function Course(props) {
    return (
        <List.Item title={<Text variant="titleLarge" style={props.disabled ? SchedulerStyles.courseTitleDisabled : SchedulerStyles.courseTitleEnabled}>{props.title}</Text>}
                   style={props.disabled ? SchedulerStyles.courseContainerDisabled : SchedulerStyles.courseContainerEnabled}
                   contentStyle={SchedulerStyles.courseInternalContainer}
                   description={
                    <div>
                        {props.specialDescription ? <Text style={SchedulerStyles.courseSpecialDescription}>{props.specialDescription}</Text> : null}
                        <Text style={SchedulerStyles.courseDescription}>{props.description}</Text>
                    </div>
                    }
                       left={props => <List.Icon {...props} icon="star" />} />
    )
}