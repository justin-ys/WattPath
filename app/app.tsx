import { Text, View } from "react-native";
import "./global.css"
import SchedulerPage from "@/app/pages/scheduler";
import {useTheme} from "react-native-paper";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import Navbar from "@/app/widgets/navbar";
import {useWindowDimensions} from "react-native";

export default function App() {
  const theme = useTheme();
  const {width} = useWindowDimensions();

  return <GestureHandlerRootView>
        {width < 1000 ? (
            <View
                className="pl-2"
                style={{
                    backgroundColor: theme.colors.background,
                    display: 'flex',
                    flexGrow: 1,
                    height: 'calc(100vh - 64px)',
                }}
            >
                <SchedulerPage/>
            </View>
        )
          :
          (
              <View
                  className="pl-2"
                  style={{
                      backgroundColor: theme.colors.background,
                      display: 'flex',
                      flexDirection: 'row',
                      flexGrow: 1,
                      height: '100vh',
                  }}
              >
                  <Navbar/>
                  <View style={{
                      display: 'flex',
                      flexDirection: 'column'
                  }}>
                      <SchedulerPage/>
                  </View>
              </View>
          )
        }
    </GestureHandlerRootView>
}
