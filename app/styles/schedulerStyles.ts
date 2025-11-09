import {StyleSheet, useWindowDimensions} from "react-native";
import { useTheme } from 'react-native-paper';

export const SchedulerStyles = (theme, width) =>  StyleSheet.create({
    courseContainerEnabled: {
        display: 'inline-block',
        backgroundColor: theme.colors.background,
        borderRadius: 3,
        boxShadow: '-1px -1px 1px 1px #81858a inset',
        width: width < 1200 ? '40vw' : '20vw'
    },
    courseContainerDisabled: {
        display: 'inline-block',
        backgroundColor: theme.colors.surfaceVariant,
        paddingRight: width < 1000 ? '1em' : '2em',
        border: '0 0 0 1px solid black',
        width: width < 1200 ? '40vw' : '20vw'
    },
    courseInternalContainer: {
        marginRight: width < 1000 ? '0' : "1em",
        marginLeft: "1em",
    },
    courseTitleEnabled: {
        fontFamily: 'Roboto',
        fontSize: 15,
        color: theme.colors.primary,
    },
    courseTitleDisabled: {
        fontFamily: 'Roboto',
        fontSize: 15,
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
        overflow: 'scroll',
    },
    courseColumn: {
        minWidth: width < 1200 ? '41vw' : '21vw',
        minHeight: '20vw',
        maxHeight: '100%',
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
        flexDirection: 'row',
        overflowX: 'scroll',
        width: '95vw'
    },
    checklistUnits: {
        color: theme.colors.tertiary
    },
    checklistProgram: {
        color: theme.colors.secondary
    }
});
