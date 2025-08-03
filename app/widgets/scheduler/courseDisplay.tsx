import * as React from 'react';
import {List, Portal, IconButton} from 'react-native-paper';
import { Text, Button } from 'react-native-paper';
import { SchedulerStyles } from "@/app/styles/schedulerStyles";
import SchedulerPage from "@/app/pages/scheduler";
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    runOnJS,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import { View } from 'react-native';
import useInternalStyles from "@/app/hooks/useInternalStyles";
import { useEffect, useState } from 'react';

import {HEADER_SIZE} from "@/app/constants"

interface CourseDisplayProps {
    title: string;
    description: string;
    specialDescription?: string;
    disabled?: boolean;
    draggable?: boolean;
    closeable?: boolean;
    onDelete?: () => void;
    onDragStart?: () => void;
    onDragEnd?: (x: number, y: number) => void;
    onDrop?: (x: number, y: number) => void;
    onDragUpdate?: (x: number, y: number) => void;
}

export default function CourseDisplay(props: CourseDisplayProps) {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scale = useSharedValue(1);
    const isDragging = useSharedValue(false);
    const originalOpacity = useSharedValue(1);
    const startX = useSharedValue(0);
    const startY = useSharedValue(0);
    const isDeleting = useSharedValue(false);
    
    const originalRef = React.useRef<View>(null);
    const containerRef = React.useRef<any>(null);

    const measureOriginalPosition = () => {
        if (originalRef.current) {
            originalRef.current.measureInWindow((x, y, width, height) => {
                startX.value = y - HEADER_SIZE; // why are they swapped???
                startY.value = x;
            });
        }
    };
    const height = useSharedValue(0);
    const margin = useSharedValue(8);

    const handleDelete = () => {
        if (props.onDelete && !isDeleting.value) {
            height.value = containerRef.current.clientHeight;
            isDeleting.value = true;
            // Animate scaleY to 0 to collapse the height
            margin.value = withTiming(0, { duration: 50 });
            height.value = withTiming(0, { duration: 100 }, (finished) => {
                if (finished) {
                    // Call the delete function after animation completes
                    runOnJS(props.onDelete!)();
                }
            });
        }
    };

    const panGesture = Gesture.Pan()
        .manualActivation(true)
        .onTouchesDown((event, manager) => {
            // Only activate on valid touches
            if (event.allTouches.length === 1) {
                manager.activate();
            }
        })
        .activateAfterLongPress(2000)
        .onStart(() => {
            runOnJS(measureOriginalPosition)();
            isDragging.value = true;
            originalOpacity.value = 0.3;
            scale.value = withSpring(1.05);
            if (props.onDragStart) {
                console.log("drag start");
                runOnJS(props.onDragStart)();
            }
        })
        .onUpdate((event) => {
            translateX.value = event.translationX;
            translateY.value = event.translationY;

            const updateX = startY.value + translateX.value
            const updateY = startX.value + translateY.value

            if (props.onDragUpdate) {
                runOnJS(props.onDragUpdate)(updateX, updateY);
            }
        })
        .onEnd((event) => {
            isDragging.value = false;
            originalOpacity.value = 1;

            translateX.value = withSpring(startY.value);
            translateY.value = withSpring(startX.value);
            scale.value = withSpring(1);

            const finalX = startY.value + translateX.value;
            const finalY = startX.value + translateY.value;

            console.log(finalX, finalY);

            if (props.onDragEnd) {
                runOnJS(props.onDragEnd)(finalX, finalY);
            }
            
            if (props.onDrop) {
                runOnJS(props.onDrop)(finalX, finalY);
            }
        });

    const originalStyle = useAnimatedStyle(() => {
        return {
            opacity: originalOpacity.value,
            zIndex: 2
        };
    });

    const dragCloneStyle = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            top: startX.value,
            left: startY.value,
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
                { scale: scale.value },
            ],
            zIndex: 1,
            elevation: 1,
            opacity: isDragging.value ? 1 : 0,
            pointerEvents: 'none',
        };
    });

    const containerStyle = useAnimatedStyle(() => {
        return {
            height: isDeleting.value ?  height.value : (height.value || '100%'),
            overflow: 'hidden',
            marginBottom: margin.value
        };
    });

    const enabledStyle = useInternalStyles(SchedulerStyles).courseContainerEnabled;
    const disabledStyle = useInternalStyles(SchedulerStyles).courseContainerDisabled;
    const enabledTextStyle = useInternalStyles(SchedulerStyles).courseTitleEnabled;
    const disabledTextStyle = useInternalStyles(SchedulerStyles).courseTitleDisabled;

    const courseItem = (
        <List.Item 
            title={<Text variant="titleLarge" style={props.disabled ? disabledTextStyle : enabledTextStyle}>{props.title}</Text>}
            style={props.disabled ? disabledStyle : enabledStyle}
            contentStyle={useInternalStyles(SchedulerStyles).courseInternalContainer}
            description={
                <View>
                    {props.specialDescription ? <Text style={useInternalStyles(SchedulerStyles).courseSpecialDescription}>{props.specialDescription}</Text> : null}
                    <Text style={useInternalStyles(SchedulerStyles).courseDescription}>{props.description}</Text>
                </View>
            }
            left={props => <List.Icon {...props} icon="star" />}
            right={rightProps => props.closeable ? <IconButton icon="close" size={24} onPress={handleDelete} /> : <></>}
        />
    );

    if (props.draggable) {
        return (
            <Animated.View style={containerStyle} ref={containerRef}>
                <View>
                    <GestureDetector gesture={panGesture}>
                        <Animated.View style={originalStyle} ref={originalRef}>
                            {courseItem}
                        </Animated.View>
                    </GestureDetector>

                    <Portal>
                        <Animated.View style={dragCloneStyle}>
                            {courseItem}
                        </Animated.View>
                    </Portal>
                </View>
            </Animated.View>
        );
    }

    return (
        <Animated.View style={containerStyle} ref={containerRef}>
            {courseItem}
        </Animated.View>
    );
}