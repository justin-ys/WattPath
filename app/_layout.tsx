import { Drawer } from 'expo-router/drawer';
import { PaperProvider, useTheme } from "react-native-paper";
import {Stack} from "expo-router";

import useIsMobile from "./hooks/useIsMobile";
import { ScheduleProvider } from "./contexts/scheduleContext";
import Navbar from "@/app/widgets/navbar_drawer";

export default function RootLayout() {
  const theme = useTheme();
  const isMobile = useIsMobile();

  return <PaperProvider>
   <ScheduleProvider>
    {isMobile ? (
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
   </ScheduleProvider>
  </PaperProvider>
}