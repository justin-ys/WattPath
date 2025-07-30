import { useTheme } from 'react-native-paper'
import {useWindowDimensions} from "react-native";

export default function useInternalStyles(style) {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  return style(theme, width);
}