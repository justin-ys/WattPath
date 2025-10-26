import * as React from 'react';
import {List, Portal, IconButton} from 'react-native-paper';
import { Text, Button } from 'react-native-paper';
import { SchedulerStyles } from "@/app/styles/schedulerStyles";
import SchedulerPage from "@/app/pages/scheduler";
import { View, PanResponder, Dimensions } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    runOnJS,
    withTiming,
    Easing,
    measure
} from 'react-native-reanimated';
import useInternalStyles from "@/app/hooks/useInternalStyles";
import { useEffect, useState, useRef } from 'react';
import { Modal } from 'react-native';

import {HEADER_SIZE} from "@/app/constants"

interface CourseDisplayProps {
    title: string;
    description: string;
    specialDescription?: string;
    disabled?: boolean;
    draggable?: boolean;
    closeable?: boolean;
    onDelete?: () => void;
    draggableId?: string;
    dragData?: any;
    onDragStart?: (data: any) => void;
    onDragMove?: (x: number, y: number) => void;
    onDragEnd?: (x: number, y: number) => void;
}

export default function CourseDisplay(props: CourseDisplayProps) {
    const isDeleting = useSharedValue(false);
    const containerRef = React.useRef<any>(null);
    const height = useSharedValue(0);
    const margin = useSharedValue(8);
    
    const isDragging = useSharedValue(false);
    const dragPositionX = useSharedValue(0);
    const dragPositionY = useSharedValue(0);
    const [showDragOverlay, setShowDragOverlay] = useState(false);
    const overlayScale = useSharedValue(0.8);

    const originalRef = React.useRef<View>(null);

    const panResponder = React.useMemo(() => {
        if (!props.draggable) return null;

        return PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: (_, gestureState) => {
                return Math.abs(gestureState.dx) > 10 || Math.abs(gestureState.dy) > 10;
            },
            onPanResponderGrant: (evt) => {
                isDragging.value = true;
                
                const { pageX, pageY } = evt.nativeEvent;
                const pageXOffset = pageX - 120;
                const pageYOffset = pageY - 40
                dragPositionX.value = pageXOffset;
                dragPositionY.value = pageYOffset;
                setShowDragOverlay(true);
                
                overlayScale.value = withTiming(1.05, { duration: 150, easing: Easing.out(Easing.quad) });
                
                if (props.onDragStart && props.dragData) {
                    props.onDragStart(props.dragData);
                }
            },
            onPanResponderMove: (evt, gestureState) => {
                const { pageX, pageY } = evt.nativeEvent;
                dragPositionX.value = pageX - 120;
                dragPositionY.value = pageY - 40;
                
                if (props.onDragMove) {
                    props.onDragMove(pageX, pageY);
                }
            },
            onPanResponderRelease: (_, gestureState) => {
                overlayScale.value = withTiming(0.8, { duration: 150, easing: Easing.in(Easing.quad) }, (finished) => {
                    if (finished) {
                        runOnJS(setShowDragOverlay)(false);
                    }
                });

                originalRef.current?.measure((x, y, width, height, pageX, pageY) => {
                    dragPositionX.value = withTiming(pageX, {duration: 100, easing: Easing.in(Easing.quad) }, (_) => {
                        isDragging.value = false;
                    })
                    dragPositionY.value = withTiming(pageY, {duration: 100, easing: Easing.in(Easing.quad) });
    
                    if (props.onDragEnd) {
                        props.onDragEnd(x, y);
                    }
                })
            }
        });
    }, [props.draggable, props.dragData, props.onDragStart, props.onDragMove, props.onDragEnd]);

    const handleDelete = () => {
        if (props.onDelete && !isDeleting.value) {
            height.value = containerRef.current.clientHeight;
            isDeleting.value = true;
            margin.value = withTiming(0, { duration: 80 });
            height.value = withTiming(0, { duration: 150, easing: Easing.inOut(Easing.cubic) }, (finished) => {
                if (finished) {
                    runOnJS(props.onDelete!)();
                }
            });
        }
    };

    const containerStyle = useAnimatedStyle(() => {
        return {
            height: isDeleting.value ?  height.value : (height.value || '100%'),
            overflow: 'hidden',
            marginBottom: margin.value,
            opacity: isDragging.value ? 0 : 1,
        };
    });

    const enabledStyle = useInternalStyles(SchedulerStyles).courseContainerEnabled;
    const disabledStyle = useInternalStyles(SchedulerStyles).courseContainerDisabled;
    const enabledTextStyle = useInternalStyles(SchedulerStyles).courseTitleEnabled;
    const disabledTextStyle = useInternalStyles(SchedulerStyles).courseTitleDisabled;
    const specialDescriptionStyle = useInternalStyles(SchedulerStyles).courseSpecialDescription
    const courseDescriptionStyle = useInternalStyles(SchedulerStyles).courseDescription

    const courseItem = (
        <List.Item 
            title={<Text variant="titleLarge" style={props.disabled ? disabledTextStyle : enabledTextStyle}>{props.title}</Text>}
            style={props.disabled ? disabledStyle : enabledStyle}
            contentStyle={useInternalStyles(SchedulerStyles).courseInternalContainer}
            description={
                <View>
                    {props.specialDescription ? <Text style={specialDescriptionStyle}>{props.specialDescription}</Text> : null}
                    <Text style={courseDescriptionStyle}>{props.description}</Text>
                </View>
            }
            left={props => <List.Icon {...props} icon="star" />}
            right={rightProps => props.closeable ? <IconButton icon="close" size={24} onPress={handleDelete} /> : <></>}
        />
    );

    if (!props.draggable) {
        return (
            <View>
                <Animated.View style={containerStyle} ref={containerRef}>
                    {courseItem}
                </Animated.View>
            </View>
        );
    }

    const dragStyle = useAnimatedStyle(() => ({
        left: Math.max(10, Math.min(dragPositionX.value, Dimensions.get('window').width - 240)),
        top: Math.max(10, Math.min(dragPositionY.value, Dimensions.get('window').height - 100)),
    }))

    return (
        <>
            <View ref={originalRef} {...(panResponder?.panHandlers || {})}>
                <Animated.View 
                    style={containerStyle} 
                    ref={containerRef}
                >
                    {courseItem}
                </Animated.View>
            </View>
            
            {showDragOverlay ? (
                <Portal>
                    <Modal
                        visible={showDragOverlay}
                        transparent={true}
                        animationType="none"
                        pointerEvents="none"
                        statusBarTranslucent={true}
                    >
                        <Animated.View
                            style={[
                                {
                                    position: 'absolute',
                                    zIndex: 9999,
                                    elevation: 9999,
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 4 },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 8,
                                },
                                dragStyle
                            ]}
                        >
                            <Animated.View
                                style={[
                                    {
                                        opacity: 0.9,
                                    },
                                ]}
                            >
                                {courseItem}
                            </Animated.View>
                        </Animated.View>
                    </Modal>
                </Portal>
            ) : null}
        </>
    );
}