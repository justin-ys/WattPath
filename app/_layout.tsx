import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from 'expo-router/drawer';
import { useTheme } from "react-native-paper";
import Navbar from "@/app/widgets/navbar_drawer";
import {useWindowDimensions, View} from "react-native";
import {Navigator, Stack} from "expo-router";
import Slot = Navigator.Slot;
import useIsMobile from "./hooks/useIsMobile";

export default function RootLayout() {
  const theme = useTheme();
  const {width} = useWindowDimensions();
  const isMobile = useIsMobile();

  return isMobile ? (
      <Drawer
        drawerContent={(props) => <Navbar borderEnabled={false} />}
        screenOptions={{
          drawerStyle: {
            paddingLeft: 4,
            backgroundColor: theme.colors.background
          },
          headerStyle: {
            height: 32,
            position: "absolute",
          }
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Schedule',
            title: 'Schedule',
            headerStyle: {
              backgroundColor: theme.colors.background,
              height: 32,
              position: "absolute",
            }
          }}
        />
      </Drawer> )
      : <Stack screenOptions={{ headerShown: false }} />
}