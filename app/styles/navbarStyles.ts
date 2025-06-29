import {StyleSheet} from "react-native";
import { useTheme } from 'react-native-paper';

const theme = useTheme();

export const NavbarStyles = StyleSheet.create({
    navTitle: {
        fontFamily: 'Roboto',
        fontWeight: '300',
        color: theme.dark ? 'white' : 'black'
    },
    navLinks: {
        fontFamily: 'Roboto',
        fontWeight: '300',
        color: theme.dark ? 'white' : 'black'
    },
    navProgram: {
        fontFamily: 'Roboto',
        fontWeight: '900',
        fontStyle: 'italic'
    }
})