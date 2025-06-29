import {MD3LightTheme, PaperProvider} from "react-native-paper";
import App from "./app"
import "./global.css"

export default function Index() {
    const theme = MD3LightTheme
    return (
        <PaperProvider theme={theme}>
            <App />
        </PaperProvider>
    )
}