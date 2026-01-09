import {StyleSheet, useWindowDimensions} from "react-native";

export const ComponentStyles = (theme, width) =>  StyleSheet.create({
    tooltipContainer: {
        position: 'absolute',
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.surfaceVariant,
        borderWidth: 1,
        borderRadius: 6,
        padding: 8,
    },
    warningModalContainer: {
        width: 'auto', 
        height: 'auto', 
        alignSelf: 'center', 
        backgroundColor: theme.colors.surfaceVariant, 
        borderRadius: '1em', 
        padding: 8,
    }
})