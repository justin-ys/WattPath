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
import {useEffect, useRef, useState, useMemo} from "react";
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
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export default function SchedulerPage() {
    const { height: screenHeight, width: screenWidth } = useWindowDimensions();
    const {terms, addCourse} = useSchedule();
    const theme = useTheme();
    const courseRefs: React.RefObject<any>[] = [];
    const [isDraggedOn, setIsDraggedOn] = useState<{[key: number]: boolean}>({});

    // Check if we're on mobile
    const isMobile = useIsMobile();

    // Animation values
    const translateY = useSharedValue(screenHeight);
    const regionTranslateY = useSharedValue(screenHeight*0.3);
    const isExpanded = useSharedValue(false);

    const onCourseDrop = (x: number, y: number, course: Course) => {
        courseRefs.forEach((ref, idx) => {
            const rect = ref.current?.getBoundingClientRect();
            if (ref.current &&
                x >= rect.left &&
                x <= rect.right &&
                y <= rect.bottom - HEADER_SIZE && // something to do with the header idk never change the size of the header
                y >= rect.top - HEADER_SIZE) {
                addCourse(idx, course);
            }
        });
    }

    const onDragUpdate = (x: number, y: number, course: Course) => {
        courseRefs.forEach((ref, idx) => {
            const rect = ref.current?.getBoundingClientRect();
            if (ref.current &&
                x >= rect.left &&
                x <= rect.right &&
                y <= rect.bottom - HEADER_SIZE &&
                y >= rect.top - HEADER_SIZE) {
                    setIsDraggedOn(prevIsDraggedOn => ({
                        ...prevIsDraggedOn,
                        [idx]: true
                    }))
            }
            else setIsDraggedOn(prevIsDraggedOn => ({
                ...prevIsDraggedOn,
                [idx]: false
            }))
        })
    }

    const onDragEnd = (x: number, y: number, course: Course) => {
        setIsDraggedOn({})
    }

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

    // Modify onDragStart to collapse sheet
    const onDragStart = () => {
        if (isExpanded.value) {
            collapseSheet();
        }
    };

    const tapRegion = Gesture.Tap()
    .onFinalize(() => {
        runOnJS(collapseSheet)();
    })

    return (
        <>
        <div className="flex flex-col gap-10 max-h-full">
            <ScheduleRow>
                {terms.map((term, idx) => {
                    const courseRef = useRef(null);
                    courseRefs.push(courseRef);
                    return (
                        <View key={`${term.season}-${term.year}-${term.level}`} style={{ maxHeight: 400, overflow: 'scroll' }}>
                            <CourseColumn
                                term={term.level}
                                date={`${term.season} ${term.year}`}
                                isDraggingOn={isDraggedOn[idx] || false}
                                ref={courseRef}
                            >
                                {term.courses.map((course: Course) => (
                                    <CourseDisplay
                                        key={course.id || course.title}
                                        title={course.title}
                                        description={course.description || ""}
                                    />
                                ))}
                            </CourseColumn>
                        </View>
                    );
                })}
            </ScheduleRow>
        </div>

        {/* Mobile: Collapsible Bottom Sheet */}
        {isMobile && (
            <>
                {/* Floating Action Button */}
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
                                        onCourseDrop={onCourseDrop}
                                        onDragUpdate={onDragUpdate}
                                        onDragEnd={onDragEnd}
                                        onDragStart={onDragStart}
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
        )}

        {/* Desktop: Regular Tabs */}
        {!isMobile && (
            <TabsProvider defaultIndex={0}>
                <Tabs style={{ marginBottom: 20, overflow: 'scroll' }}
                        tabHeaderStyle={{ display: 'flex', alignItems: 'flex-start' }}>
                    <TabScreen label="Checklist">
                        <Checklist 
                            onCourseDrop={onCourseDrop} 
                            onDragUpdate={onDragUpdate} 
                            onDragEnd={onDragEnd} 
                            showProgram={true}
                        />
                    </TabScreen>
                    <TabScreen label="Problems">
                        <Problems />
                    </TabScreen>
                </Tabs>
            </TabsProvider>
        )}
        </>
    );
}