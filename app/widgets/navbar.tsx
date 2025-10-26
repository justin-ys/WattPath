import { Text } from "react-native-paper";
import { NavbarStyles } from "@/app/styles/navbarStyles";
import {View} from "react-native";

export default function Navbar() {
    return <View className="mr-4 h-full" style={{ borderRight: "2px solid gray" }}>
        <View className="text-left mt-2 mr-8 pr-5 pl-1 h-full">
            <View className="flex flex-col justify-between h-full">
                <View className="flex flex-col gap-2">
                    <Text className="mb-2" style={NavbarStyles.navTitle} variant="displaySmall">WattPath</Text>
                    <Text style={NavbarStyles.navLinks} variant="headlineSmall">My Degree</Text>
                    <Text style={NavbarStyles.navLinks} variant="headlineSmall">Settings</Text>
                    <Text style={NavbarStyles.navLinks} variant="headlineSmall">About</Text>
                </View>
                <View className="flex flex-col gap-2 pb-4">
                 <Text style={NavbarStyles.navTitle} variant="titleLarge">I am...</Text>
                 <Text style={NavbarStyles.navProgam} variant="titleSmall">CS/Digital Hardware</Text>
                 <Text style={NavbarStyles.navProgam} variant="titleSmall">Sequence 1</Text>
                </View>
            </View>
        </View>
    </View>
}