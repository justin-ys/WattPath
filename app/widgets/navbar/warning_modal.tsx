import React from "react";
import { View } from "react-native";
import { Button, Modal, Portal, Text, useTheme } from "react-native-paper";

import useInternalStyles from "@/app/hooks/useInternalStyles";
import { ComponentStyles } from "@/app/styles/componentStyles";


interface WarningModalProps {
    onConfirm: () => void;
    onDecline: () => void;
    visible: boolean;
}

export default function WarningModal(props: WarningModalProps) {
    const containerStyle = useInternalStyles(ComponentStyles).warningModalContainer;

    return <Portal>
        <Modal visible={props.visible} onDismiss={props.onDecline} contentContainerStyle={containerStyle}>
            <View className="flex flex-col items-center">
                <Text variant="titleMedium" className="p-4">Are you sure you want to change your start date? This may change the dates of other terms.</Text>
                <View className="flex flex-row">
                    <Button onPress={props.onConfirm}>Yes</Button>
                    <Button onPress={props.onDecline}>No</Button>
                </View>
            </View>
        </Modal>
    </Portal>
}