import { Text } from "react-native-paper";
import { NavbarStyles } from "@/app/styles/navbarStyles";
import { View } from 'react-native';

export default function Navbar() {
    return <View className="mr-4 h-full">
        <View className="text-left mt-2 mr-8 pr-5 pl-1 h-full">
            <View className="flex flex-col justify-between h-full">
                <View className="flex flex-col gap-4">
                    <Text className="mb-1" style={NavbarStyles.navTitle} variant="displayMedium">WattPath</Text>
                    <Text style={NavbarStyles.navLinks} variant="headlineMedium">My Degree</Text>
                    <Text style={NavbarStyles.navLinks} variant="headlineMedium">Settings</Text>
                    <Text style={NavbarStyles.navLinks} variant="headlineMedium">About</Text>
                </View>
                <View className="flex flex-col gap-2 pb-4">
                 <Text style={NavbarStyles.navTitle} variant="headlineSmall">I am...</Text>
                 <Text style={NavbarStyles.navProgram} variant="headlineSmall">CS/Digital Hardware</Text>
                 <Text style={NavbarStyles.navProgram} variant="headlineSmall">Sequence 1</Text>
                </View>
            </View>
        </View>
    </View>
}