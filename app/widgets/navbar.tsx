import { Text } from "react-native-paper";
import {View} from "react-native";
import { useState } from "react";

import { NavbarStyles } from "@/app/styles/navbarStyles";
import SeasonDropdown from "../components/season_dropdown";
import WarningModal from '@/app/components/warning_modal';
import { Season } from "../types/season";
import { useSchedule } from "../hooks/useSchedule";

export default function Navbar() {
    const { startYear, startSeason, setStartDate } = useSchedule();

    const [selectedYear, setSelectedYear] = useState<number>(startYear);
    const [selectedSeason, setSelectedSeason] = useState<Season>(startSeason);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const openWarningModal = (year: number, season: Season) => {
        setSelectedYear(year);
        setSelectedSeason(season);
        setModalVisible(true);
    }

    const onModalAccept = () => {
        setStartDate(selectedYear, selectedSeason);
        setModalVisible(false);
    }

    const onModalDecline = () => {
        setSelectedYear(startYear);
        setSelectedSeason(startSeason);
        setModalVisible(false);
    }

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
                 <Text style={NavbarStyles.navProgram} variant="titleSmall">CS/Digital Hardware</Text>
                 <Text style={NavbarStyles.navProgram} variant="titleSmall">Sequence 1</Text>
                 <View className="flex flex-row justify-center items-center gap-1.5">
                    <Text style={NavbarStyles.navProgram} variant="titleSmall">Starting in</Text>
                    <SeasonDropdown 
                        firstYear={2021} 
                        firstSeason={Season.Fall} 
                        selectedYear={selectedYear}
                        selectedSeason={selectedSeason}
                        includeFirst={true} 
                        maxDates={20} 
                        onSelect={(year, season) => openWarningModal(year, season)}
                        className="text-black text-left text-sm bg-transparent font-bold"/>
                 </View>
                </View>
            </View>
        </View>
        <WarningModal visible={modalVisible} onConfirm={onModalAccept} onDecline={onModalDecline} 
            body="Are you sure you want to change your start date? This may change the dates of other terms." />
    </View>
}