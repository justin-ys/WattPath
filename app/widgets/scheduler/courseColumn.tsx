import { View, Text } from 'react-native';
import { forwardRef } from 'react';
import React from 'react';

import TermWarning from "@/app/widgets/scheduler/courseColumn/term_warning";
import SeasonDropdown from '../../components/season_dropdown';
import { SchedulerStyles } from "@/app/styles/schedulerStyles";
import useInternalStyles from "@/app/hooks/useInternalStyles";
import { useSchedule } from "@/app/hooks/useSchedule";

interface CourseColumnProps {
    term?: string;
    termNum?: number;
    date?: string;
    isDraggingOn?: boolean;
    id: string;
    children?: React.ReactNode;
    onDrop?: (courseData: any) => void;
}

const CourseColumn = forwardRef<View, CourseColumnProps>((props, ref) => {
    const overlayStyle = useInternalStyles(SchedulerStyles).courseColumnOverlay;

    const { unitsInTerm, unitsInFullTerm, startYear, startSeason, terms, setTermDate} = useSchedule();
    const incomplete = (props.termNum != null) ? (unitsInTerm(props.termNum) < unitsInFullTerm) : false;

    const beforeYear = (props.termNum == 0 || props.termNum == null) ? startYear : terms[props.termNum - 1].year;
    const beforeSeason = (props.termNum == 0 || props.termNum == null) ? startSeason : terms[props.termNum - 1].season;
    const nextYear = (props.termNum == terms.length - 1 || props.termNum == null) ? null : terms[props.termNum + 1].year;
    const nextSeason = (props.termNum == terms.length - 1 || props.termNum == null) ? null : terms[props.termNum + 1].season;

    return (
        <View ref={ref} style={useInternalStyles(SchedulerStyles).courseColumn}>
            <View style={{maxHeight: '100%'}} className="flex flex-col flex-grow">
                {props.term || props.date ? <View className="flex flex-row justify-between items-center p-2">
                 {props.term ? 
                    <View className="flex flex-row justify-start align-middle gap-1">
                        <Text className="text-gray-400 text-base"><b>{props.term}</b></Text> 
                        {incomplete ? <TermWarning 
                            popupTitle="Incomplete term"
                            popupDescription={`This term only fulfills ${unitsInTerm(props.termNum!)} units. ${unitsInFullTerm} needed for a full term.`}
                        /> : null}
                    </View>
                : null}
                 {props.date ? 
                 <View className="flex flex-row items-center">
                    <SeasonDropdown
                        firstYear={beforeYear}
                        firstSeason={beforeSeason}
                        lastYear={nextYear}
                        lastSeason={nextSeason}
                        selectedYear={terms[props.termNum].year}
                        selectedSeason={terms[props.termNum].season}
                        includeFirst={props.termNum == 0}
                        onSelect={(year, season) => setTermDate(props.termNum!, year, season)}
                        className="text-gray-400 bg-transparent text-right"
                    />
                 </View>
                 : null}
                </View> : null}
                {/* gap is set to 0 w/ margin set in courseDisplay so animations work, otherwise there will be awkward cuts */}
                <View className="gap-0 p-2 min-h-0 flex-grow" style={useInternalStyles(SchedulerStyles).courseList}>
                    {props.isDraggingOn ? <View className="bg-indigo-200" style={overlayStyle} /> : null}
                    {props.children}
                </View>
            </View>
        </View>
    )
});

CourseColumn.displayName = 'CourseColumn';

export default CourseColumn;