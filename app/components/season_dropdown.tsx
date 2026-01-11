import {Picker} from '@react-native-picker/picker';

import { Season, dateToOffset, offsetToDate } from "@/app/types/season";
import { useMemo, useState } from 'react';

interface SeasonDropdownProps {
    firstYear: number;
    firstSeason: Season;
    lastYear?: number;
    lastSeason?: Season;
    selectedYear: number;
    selectedSeason: Season;
    includeFirst: boolean;
    maxDates?: number;
    className?: string;
    onSelect: (year: number, season: Season) => void;
}

export default function SeasonDropdown(props: SeasonDropdownProps) {
    const [selectedDate, setSelectedDate] = useState<number>(dateToOffset(props.selectedYear, props.selectedSeason, 
        props.firstYear, props.firstSeason));

    var maxDates = props.maxDates ? props.maxDates : 10;
    if (selectedDate > maxDates) maxDates = selectedDate + 5;
    let endOffset = (props.lastYear && props.lastSeason) ? dateToOffset(props.lastYear, props.lastSeason, props.firstYear, props.firstSeason) : maxDates;
    if ((props.lastYear || props.lastSeason) && !props.includeFirst) endOffset -= 1;
    const range = Array.from({ length: endOffset }, (x, i) => props.includeFirst ? i : i + 1)

    useMemo(() => {
        setSelectedDate(dateToOffset(props.selectedYear, props.selectedSeason, 
            props.firstYear, props.firstSeason))
    }, [props.firstYear, props.firstSeason, props.selectedYear, props.selectedSeason])

    return <Picker className={props.className} selectedValue={selectedDate} onValueChange={(itemValue, itemIndex) => {
        const {year, season} = offsetToDate(itemValue, props.firstYear, props.firstSeason);
        props.onSelect(year, season)
    }}>
        {range.map((offset, _) => {
            const {year, season} = offsetToDate(offset, props.firstYear, props.firstSeason);
            return <Picker.Item label={`${season} ${year}`} value={offset} />
        }
        )}
    </Picker>
}