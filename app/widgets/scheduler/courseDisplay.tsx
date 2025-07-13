import * as React from 'react';
import {List, Portal} from 'react-native-paper';
import { Text } from 'react-native-paper';
import { SchedulerStyles} from "@/app/styles/schedulerStyles";
import star from "@/assets/images/star_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png"
import SchedulerPage from "@/app/pages/scheduler";
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    runOnJS,
    withSpring
} from 'react-native-reanimated';
import { View } from 'react-native';
import {transferableAbortController} from "node:util";

interface CourseDisplayProps {
    title: string;
    description: string;
    specialDescription?: string;
    disabled?: boolean;
    draggable?: boolean;
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
    
    const originalRef = React.useRef<View>(null);

    const measureOriginalPosition = () => {
        if (originalRef.current) {
            originalRef.current.measure((x, y, width, height, pageX, pageY) => {
                startX.value = pageY; // why???
                startY.value = pageX;
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
        .onStart(() => {
            runOnJS(measureOriginalPosition)();
            isDragging.value = true;
            originalOpacity.value = 0.3;
            scale.value = withSpring(1.05);
            if (props.onDragStart) {
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

    const courseItem = (
        <List.Item 
            title={<Text variant="titleLarge" style={props.disabled ? SchedulerStyles.courseTitleDisabled : SchedulerStyles.courseTitleEnabled}>{props.title}</Text>}
            style={props.disabled ? SchedulerStyles.courseContainerDisabled : SchedulerStyles.courseContainerEnabled}
            contentStyle={SchedulerStyles.courseInternalContainer}
            description={
                <View>
                    {props.specialDescription ? <Text style={SchedulerStyles.courseSpecialDescription}>{props.specialDescription}</Text> : null}
                    <Text style={SchedulerStyles.courseDescription}>{props.description}</Text>
                </View>
            }
            left={props => <List.Icon {...props} icon="star" />} 
        />
    );

    if (props.draggable) {
        return (
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
        );
    }

    return courseItem;
}