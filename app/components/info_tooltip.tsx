import { Portal } from "react-native-paper";
import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

import useInternalStyles from "@/app/hooks/useInternalStyles";
import { ComponentStyles } from "@/app/styles/componentStyles";



interface InfoTooltipProps {
    parentRef: React.RefObject<View | null>;
    title?: string;
    description?: string;
    offsetX: number;
    offsetY: number;
    visible: boolean;
}

export default function InfoTooltip(props: InfoTooltipProps) {
    const [xPos, setXPos] = useState<number>(0);
    const [yPos, setYPos] = useState<number>(0);
    const [mounted, setMounted] = useState<boolean>(props.visible);

    const opacity = useSharedValue(props.visible ? 1 : 0);

    useEffect(() => {
        if (props.parentRef?.current) {
            props.parentRef.current.measure((fx: number, fy: number, width: number, height: number, px: number, py: number) => {
                setXPos(px + props.offsetX);
                setYPos(py + props.offsetY);
            })
        }
    })

    useEffect(() => {
        if (props.visible) {
            setMounted(true);
            opacity.value = withTiming(1, { duration: 200 });
        } else {
            opacity.value = withTiming(0, { duration: 200 }, (finished) => {
                if (finished) {
                    setMounted(false);
                }
            });
        }
    }, [props.visible]);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    const tooltipStyle = useInternalStyles(ComponentStyles).tooltipContainer;

    if (!mounted) {
        return null;
    }

    return <Portal>
        <Animated.View 
            style={[
                {
                    top: yPos,
                    left: xPos,
                },
                tooltipStyle,
                animatedStyle
            ]}
        >
            <View className="flex flex-col gap-2">
                {props.title ? <Text><b>{props.title}</b></Text> : null}
                {props.description ? <Text>{props.description}</Text> : null}
            </View>
        </Animated.View>
    </Portal>
}