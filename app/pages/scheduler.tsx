import CourseDisplay from "@/app/widgets/scheduler/courseDisplay";
import CourseColumn from "@/app/widgets/scheduler/courseColumn";
import ScheduleRow from "@/app/widgets/scheduler/scheduleRow";
import {
    TabsProvider,
    Tabs,
    TabScreen,
} from 'react-native-paper-tabs';
import Checklist from "@/app/widgets/scheduler/checklist";
import Problems from "@/app/widgets/scheduler/problems";
import {useEffect, useRef, useState, useMemo, useCallback} from "react";
import Term from "@/app/types/term";
import {Course} from "@/app/types/course";
import {useSchedule} from "@/app/hooks/useSchedule";
import {View, useWindowDimensions} from "react-native";
import {HEADER_SIZE} from "@/app/constants";
import { FAB } from 'react-native-paper';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    runOnJS,
} from 'react-native-reanimated';
import { useTheme } from "react-native-paper";
import useIsMobile from "@/app/hooks/useIsMobile";
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

export default function SchedulerPage() {
    const { height: screenHeight, width: screenWidth } = useWindowDimensions();
    const {terms, addCourse, deleteCourse} = useSchedule();
    const theme = useTheme();
    const [isDragging, setIsDragging] = useState(false);
    const [isDraggedOn, setIsDraggedOn] = useState<{[key: number]: boolean}>({});
    //const courseRefs: React.RefObject<View>[] = [];
    const courseRefs = useRef([]);

    const isMobile = useIsMobile(); 

    const translateY = useSharedValue(screenHeight);
    const regionTranslateY = useSharedValue(screenHeight*0.3);
    const isExpanded = useSharedValue(false);

    const expandSheet = () => {
        translateY.value = withSpring(0, {overshootClamping: true})
        regionTranslateY.value = -screenHeight*0.7;
        isExpanded.value = true;
    };

    const collapseSheet = () => {
        translateY.value = withSpring(screenHeight*0.7, {overshootClamping: true});
        regionTranslateY.value = screenHeight*0.3;
        isExpanded.value = false;
    };

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    const clickRegionAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: regionTranslateY.value }],
    }));

    const tapRegion = Gesture.Tap()
    .onFinalize(() => {
        runOnJS(collapseSheet)();
    })

    const onDelete = (termNum: number, course: Course) => () => {
        deleteCourse(course.id);
    }

    const handleDragStart = (course: Course) => {
        setIsDragging(true);
        if (isExpanded.value) {
            collapseSheet();
        }
    };

    const handleDragMove = (x: number, y: number, course: Course) => {
        courseRefs.current.forEach((ref, idx) => {
            if (ref) {
                ref.measure((fx, fy, width, height, px, py) => {
                    if (x >= px &&
                        x <= px + width &&
                        y <= py + height - HEADER_SIZE &&
                        y >= py - HEADER_SIZE) {
                            setIsDraggedOn(prevIsDraggedOn => ({
                                ...prevIsDraggedOn,
                                [idx]: true
                            }))
                    } else {
                        setIsDraggedOn(prevIsDraggedOn => ({
                            ...prevIsDraggedOn,
                            [idx]: false
                        }))
                    }
                });
            }
        })
    };

    const handleDragEnd = (x, y, course: Course) => {
        setIsDragging(false);
        Object.keys(isDraggedOn).forEach(idx => {
            if (isDraggedOn[idx]) addCourse(idx, course);
        }
        )
        setIsDraggedOn({});
    };

    const handleDrop = (termIndex: number, courseData: any) => {
    };

    return (
        <View className="flex flex-col gap-10 h-full">
            <ScheduleRow>
                {terms.map((term, idx) => {
                    return (
                        <View key={`${term.season}-${term.year}-${term.level}`} style={{ maxHeight: 400, overflow: 'scroll' }}>
                            <CourseColumn
                                term={term.level}
                                date={`${term.season} ${term.year}`}
                                isDraggingOn={isDraggedOn[idx] || false}
                                id={idx.toString()}
                                onDrop={(courseData) => handleDrop(idx, courseData)}
                                ref={(el) => courseRefs.current[idx] = el}
                            >
                                {term.courses.map((course: any) => (
                                    <CourseDisplay
                                        key={course.id || course.title}
                                        title={course.title}
                                        description={course.description || ""}
                                        onDelete={onDelete(idx, course)}
                                        closeable={true}
                                    />
                                ))}
                            </CourseColumn>
                        </View>
                    );
                })}
            </ScheduleRow>

            {isMobile ? (
                <>
                    <FAB
                        icon={"format-list-checks"}
                        style={{
                            position: 'absolute',
                            margin: 16,
                            bottom: 16,
                            right: 16,
                        }}
                        onPress={expandSheet}
                    />

                    <GestureDetector gesture={tapRegion}>
                        <Animated.View style={[
                            {
                                height: screenHeight * 0.3,
                                opacity: 0,
                                top: screenHeight * 0.3,
                                left: 0,
                                right: 0
                            },
                            clickRegionAnimatedStyle,
                        ]} />
                    </GestureDetector>

                    <Animated.View
                        style={[
                            {
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: screenHeight * 0.7,
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                                shadowColor: '#000',
                                backgroundColor: theme.colors.background,
                                shadowOffset: { width: 0, height: -2 },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5,
                            },
                            animatedStyle,
                        ]}
                    >
                        <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 4 }}>
                            <TabsProvider defaultIndex={0}>
                                <Tabs style={{ flex: 1 }}>
                                    <TabScreen label="Checklist">
                                        <Checklist
                                            onDragStart={handleDragStart}
                                            onDragUpdate={handleDragMove}
                                            onDragEnd={handleDragEnd}
                                            showProgram={false}
                                        />
                                    </TabScreen>
                                    <TabScreen label="Problems">
                                        <Problems />
                                    </TabScreen>
                                </Tabs>
                            </TabsProvider>
                        </View>
                    </Animated.View>
                </>
            ) : null}

            {!isMobile ? (
                <TabsProvider defaultIndex={0}>
                    <Tabs style={{ marginBottom: 20, overflow: 'scroll' }}
                            tabHeaderStyle={{ display: 'flex', alignItems: 'flex-start' }}>
                        <TabScreen label="Checklist">
                            <Checklist 
                                onDragStart={handleDragStart}
                                onDragUpdate={handleDragMove}
                                onDragEnd={handleDragEnd}
                                showProgram={true}
                            />
                        </TabScreen>
                        <TabScreen label="Problems">
                            <Problems />
                        </TabScreen>
                    </Tabs>
                </TabsProvider>
            ) : null}
        </View>
    );
}