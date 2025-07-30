import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from 'expo-router/drawer';
import { useTheme } from "react-native-paper";
import Navbar from "@/app/widgets/navbar_drawer";
import {useWindowDimensions, View} from "react-native";
import {Navigator, Stack} from "expo-router";
import Slot = Navigator.Slot;

export default function RootLayout() {
  const theme = useTheme();
  const {width} = useWindowDimensions();

  return width < 1000 ? (
      <Drawer
        drawerContent={(props) => <Navbar borderEnabled={false} />}
        screenOptions={{
          drawerStyle: {
            paddingLeft: 4,
            backgroundColor: theme.colors.background
          },
          headerStyle: {
            height: 50,
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
              backgroundColor: theme.colors.background
            }
          }}
        />
      </Drawer> )
      : <Stack screenOptions={{ headerShown: false }} />
}