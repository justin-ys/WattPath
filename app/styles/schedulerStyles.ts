import {StyleSheet} from "react-native";
import { useTheme } from 'react-native-paper';

const theme = useTheme();

export const SchedulerStyles = StyleSheet.create({
    courseContainerEnabled: {
        display: 'inline-block',
        backgroundColor: theme.colors.background,
        paddingRight: '6em',
        border: '0 0 0 1px solid black'
    },
    courseContainerDisabled: {
        display: 'inline-block',
        backgroundColor: theme.colors.surfaceVariant,
        paddingRight: '6em',
        border: '0 0 0 1px solid black'
    },
    courseInternalContainer: {
        marginRight: "3em",
        marginLeft: "1em",
    },
    courseTitleEnabled: {
        fontFamily: 'Roboto',
        fontSize: '1.5em',
        color: theme.colors.primary,
    },
    courseTitleDisabled: {
        fontFamily: 'Roboto',
        fontSize: '1.5em',
        color: theme.colors.secondary,
    },
    courseDescription: {
        fontFamily: 'Roboto',
        color: theme.colors.tertiary
    },
    courseSpecialDescription: {
        color: theme.colors.primary
    },
    courseList: {
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '27vw',
        overflow: 'scroll',
    },
    courseColumnOverlay: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        top: 0,
        left: 0,
        opacity: 0.4,
        zIndex: 20,
        border: '2px dotted grey',
        borderRadius: '4px',
    },
    scheduleRowContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    checklistUnits: {
        color: theme.colors.tertiary
    },
    checklistProgram: {
        color: theme.colors.secondary
    }
});
