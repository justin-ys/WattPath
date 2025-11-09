import { Text, View } from "react-native";
import "./global.css"
import SchedulerPage from "@/app/pages/scheduler";
import {useTheme} from "react-native-paper";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import Navbar from "@/app/widgets/navbar";
import {useWindowDimensions} from "react-native";
import { ScheduleContext } from "./contexts/scheduleContext";
import { useState } from "react";

export default function App() {
  const theme = useTheme();
  const {width} = useWindowDimensions();

  const [terms, setTerms] = useState([
    {
        level: "1A",
        season: "Fall",
        year: 2024,
        courses: [
            {
                title: "SPCOM 225",
                id: 10,
                description: "Communications",
                units: 0.5,
                allowed_programs: ["CS/Digital Hardware"],
                terms_offered: ["Fall", "Winter"]
            },
        ],
    },
    {
        level: "1B",
        season: "Winter",
        year: 2025,
        courses: [
            {
                title: "ECE 124",
                id: 11,
                description: "Digital Hardware",
                units: 0.5,
                allowed_programs: ["ECE"],
                terms_offered: ["Fall", "Winter"]
            },
        ]
    }
    ]);

  return <GestureHandlerRootView>
        <ScheduleContext.Provider value={{terms, setTerms}}>
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
        </ScheduleContext.Provider>
    </GestureHandlerRootView>

}
